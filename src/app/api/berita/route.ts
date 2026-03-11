import { errorResponse, successResponse } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

const beritaSelect = {
    id: true,
    slug: true,
    judul: true,
    isi: true,
    gambar: true,
    kategoriId: true,
    kategori: {
        select: {
            id: true,
            nama: true,
        },
    },
    createdAt: true,
    updatedAt: true,
};

function parsePositiveInt(value: string | null, fallback: number) {
    if (!value) return fallback;
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return fallback;
    const intValue = Math.trunc(parsed);
    return intValue > 0 ? intValue : fallback;
}

function parsePositiveIntList(values: string[]) {
    return values
        .map((value) => Number(value))
        .filter((value) => Number.isInteger(value) && value > 0);
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const q = searchParams.get("q")?.trim();
        const slug = searchParams.get("slug")?.trim();
        const kategoriIds = parsePositiveIntList(searchParams.getAll("kategoriId"));

        // --- Pencarian by slug: return single object ---
        if (slug) {
            const berita = await prisma.berita.findUnique({
                where: { slug },
                select: beritaSelect,
            });

            if (!berita) {
                return errorResponse("NOT_FOUND", "Berita tidak ditemukan", {
                    status: 404,
                });
            }

            return successResponse(berita);
        }

        // --- Pencarian by q / list semua ---
        const page = parsePositiveInt(searchParams.get("page"), DEFAULT_PAGE);
        const rawLimit = parsePositiveInt(searchParams.get("limit"), DEFAULT_LIMIT);
        const limit = Math.min(rawLimit, MAX_LIMIT);

        const filters = [] as any[];

        if (q) {
            filters.push({
                OR: [
                    { slug: { contains: q, mode: "insensitive" as const } },
                    { judul: { contains: q, mode: "insensitive" as const } },
                    { isi: { contains: q, mode: "insensitive" as const } },
                    { kategori: { nama: { contains: q, mode: "insensitive" as const } } },
                ],
            });
        }

        if (kategoriIds.length > 0) {
            filters.push({
                kategoriId: {
                    in: kategoriIds,
                },
            });
        }

        const where = filters.length > 0 ? { AND: filters } : undefined;

        const total = await prisma.berita.count({ where });
        const totalPages = Math.max(1, Math.ceil(total / limit));
        const safePage = Math.min(page, totalPages);
        const skip = (safePage - 1) * limit;

        const berita = await prisma.berita.findMany({
            where,
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
            select: beritaSelect,
        });

        return successResponse(berita, {
            meta: { page: safePage, limit, total },
        });
    } catch (error) {
        console.error("[GET /api/berita] Error:", error);
        return errorResponse("INTERNAL_ERROR", "Gagal mengambil data berita", {
            status: 500,
        });
    }
}