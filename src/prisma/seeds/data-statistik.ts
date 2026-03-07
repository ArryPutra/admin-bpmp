import prisma from "@/lib/prisma";

export async function seedDataStatistik() {
    await prisma.dataStatistik.createMany({
        data: [
            { key: "total-sekolah", label: "Sekolah", value: "8.331" },
        ]
    })
}