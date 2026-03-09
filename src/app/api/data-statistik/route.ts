import { errorResponse, successResponse } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const keys = searchParams.getAll("key")

        const dataStatistik = await prisma.dataStatistik.findMany({
            orderBy: {
                createdAt: "asc"
            },
            where: keys.length > 0 ? {
                key: { in: keys }
            } : undefined,
            select: {
                key: true,
                label: true,
                value: true,
            }
        })
        const total = await prisma.dataStatistik.count({
            where: keys.length > 0 ? { key: { in: keys } } : undefined,
        })

        return successResponse(dataStatistik, {
            meta: {
                total
            }
        })
    } catch (error) {
        console.error("[GET /api/data-statistik] Error:", error)

        return errorResponse("INTERNAL_ERROR", "Gagal mengambil data statistik", {
            status: 500,
        });
    }
}