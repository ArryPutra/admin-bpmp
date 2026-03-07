import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {
    const dataStatistik = await prisma.dataStatistik.findMany({
        select: {
            key: true,
            label: true,
            value: true
        }
    });

    return NextResponse.json({
        success: true,
        data: dataStatistik
    })
}