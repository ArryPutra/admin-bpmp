import { errorResponse, successResponse } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

function parsePositiveInt(value: string | null) {
    if (!value) return null;

    const parsed = Number(value);

    if (!Number.isInteger(parsed) || parsed <= 0) {
        return null;
    }

    return parsed;
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const id = parsePositiveInt(searchParams.get("id"));
        const q = searchParams.get("q")?.trim();

        if (id) {
            const kategoriBerita = await prisma.kategoriBerita.findUnique({
                where: { id },
                select: {
                    id: true,
                    nama: true,
                    createdAt: true,
                    updatedAt: true,
                    _count: {
                        select: {
                            berita: true,
                        },
                    },
                },
            });

            if (!kategoriBerita) {
                return errorResponse("NOT_FOUND", "Kategori berita tidak ditemukan", {
                    status: 404,
                });
            }

            return successResponse(kategoriBerita);
        }

        const where = q
            ? {
                nama: {
                    contains: q,
                    mode: "insensitive" as const,
                },
            }
            : undefined;

        const kategoriBerita = await prisma.kategoriBerita.findMany({
            where,
            orderBy: { nama: "asc" },
            select: {
                id: true,
                nama: true,
                createdAt: true,
                updatedAt: true,
                _count: {
                    select: {
                        berita: true,
                    },
                },
            },
        });

        return successResponse(kategoriBerita, {
            meta: {
                total: kategoriBerita.length,
            },
        });
    } catch (error) {
        console.error("[GET /api/kategori-berita] Error:", error);

        return errorResponse("INTERNAL_ERROR", "Gagal mengambil data kategori berita", {
            status: 500,
        });
    }
}