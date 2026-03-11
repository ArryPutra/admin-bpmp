import { errorResponse, successResponse } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const groups = searchParams.getAll("group").map((v) => v.trim()).filter(Boolean);
        const keys = searchParams.getAll("key").map((v) => v.trim()).filter(Boolean);
        const q = searchParams.get("q")?.trim();

        const filters = [] as any[];

        if (groups.length > 0) {
            filters.push({ group: { in: groups } });
        }

        if (keys.length > 0) {
            filters.push({ key: { in: keys } });
        }

        if (q) {
            filters.push({
                OR: [
                    { group: { contains: q, mode: "insensitive" as const } },
                    { key: { contains: q, mode: "insensitive" as const } },
                    { label: { contains: q, mode: "insensitive" as const } },
                    { value: { contains: q, mode: "insensitive" as const } },
                ],
            });
        }

        const where = filters.length > 0 ? { AND: filters } : undefined;

        const dataStatistik = await prisma.dataStatistik.findMany({
            where,
            orderBy: { createdAt: "asc" },
            select: {
                group: true,
                key: true,
                label: true,
                value: true,
            },
        });

        const total = await prisma.dataStatistik.count({ where });

        return successResponse(dataStatistik, { meta: { total } });
    } catch (error) {
        console.error("[GET /api/data-statistik] Error:", error);

        return errorResponse("INTERNAL_ERROR", "Gagal mengambil data statistik", {
            status: 500,
        });
    }
}