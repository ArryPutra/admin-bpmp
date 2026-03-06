import prisma from "@/lib/prisma";

export async function seedDataStatistik() {
    await prisma.dataStatistik.createMany({
        data: [
            { label: "Sekolah", value: "500" },
        ]
    })
}