import { errorResponse, successResponse } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const groups = searchParams.getAll("group").map((value) => value.trim()).filter(Boolean);
        const keys = searchParams.getAll("key").map((value) => value.trim()).filter(Boolean);
        const isSingleKeyQuery = keys.length === 1;
        const q = searchParams.get("q")?.trim();

        if (groups.length === 0) {
            return errorResponse(
                "BAD_REQUEST",
                "Parameter group wajib diisi untuk mengambil data konten",
                {
                    status: 400,
                    details: {
                        required: ["group"],
                    },
                }
            );
        }

        const filters = [] as any[];

        filters.push({
            group: {
                in: groups,
            },
        });

        if (keys.length > 0) {
            filters.push({
                key: {
                    in: keys,
                },
            });
        }

        if (q) {
            filters.push({
                OR: [
                    {
                        group: {
                            contains: q,
                            mode: "insensitive" as const,
                        },
                    },
                    {
                        key: {
                            contains: q,
                            mode: "insensitive" as const,
                        },
                    },
                    {
                        label: {
                            contains: q,
                            mode: "insensitive" as const,
                        },
                    },
                    {
                        value: {
                            contains: q,
                            mode: "insensitive" as const,
                        },
                    },
                ],
            });
        }

        const where = { AND: filters };

        const dataKonten = await prisma.dataKonten.findMany({
            where,
            orderBy: {
                createdAt: "asc",
            },
            select: {
                group: true,
                key: true,
                label: true,
                value: true,
            },
        });

        const total = await prisma.dataKonten.count({ where });

        const payload = isSingleKeyQuery && dataKonten.length <= 1
            ? (dataKonten[0] ?? null)
            : dataKonten;

        return successResponse(payload, {
            meta: {
                total,
            },
        });
    } catch (error) {
        console.error("[GET /api/data-konten] Error:", error);

        return errorResponse("INTERNAL_ERROR", "Gagal mengambil data konten", {
            status: 500,
        });
    }
}
