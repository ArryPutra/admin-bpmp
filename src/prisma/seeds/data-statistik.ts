import prisma from "@/lib/prisma";

export async function seedDataStatistik() {
    await prisma.dataStatistik.createMany({
        data: [
            { key: "total-sekolah", label: "Sekolah", value: "8.331" },
            { key: "total-peserta-didik", label: "Peserta Didik", value: "427.601" },
            { key: "total-guru", label: "Guru", value: "58.361" },
            { key: "total-tenaga-kependidikan", label: "Tenaga Kependidikan", value: "27.942" },
        ]
    })
}