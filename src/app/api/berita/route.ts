import { errorResponse, successResponse } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

function parsePositiveInt(value: string | null, fallback: number) {
    if (!value) return fallback;

    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return fallback;

    const intValue = Math.trunc(parsed);
    return intValue > 0 ? intValue : fallback;
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const page = parsePositiveInt(searchParams.get("page"), DEFAULT_PAGE);
        const rawLimit = parsePositiveInt(searchParams.get("limit"), DEFAULT_LIMIT);
        const limit = Math.min(rawLimit, MAX_LIMIT);
        const q = searchParams.get("q")?.trim();
        const slug = searchParams.get("slug")?.trim();

        const where = slug
            ? {
                slug,
            }
            : q
                ? {
                    OR: [
                        {
                            slug: {
                                contains: q,
                                mode: "insensitive" as const,
                            },
                        },
                        {
                            judul: {
                                contains: q,
                                mode: "insensitive" as const,
                            },
                        },
                        {
                            isi: {
                                contains: q,
                                mode: "insensitive" as const,
                            },
                        },
                    ],
                }
                : undefined;

        const total = await prisma.berita.count({ where });

        const totalPages = Math.max(1, Math.ceil(total / limit));
        const safePage = Math.min(page, totalPages);
        const skip = (safePage - 1) * limit;

        const berita = await prisma.berita.findMany({
            where,
            orderBy: {
                createdAt: "desc",
            },
            skip,
            take: limit,
            select: {
                id: true,
                slug: true,
                judul: true,
                isi: true,
                gambar: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        return successResponse(berita, {
            meta: {
                page: safePage,
                limit,
                total,
            },
        });
    } catch (error) {
        console.error("[GET /api/berita] Error:", error);

        return errorResponse("INTERNAL_ERROR", "Gagal mengambil data berita", {
            status: 500,
        });
    }
}
