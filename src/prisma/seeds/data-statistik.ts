import prisma from "@/lib/prisma";

export async function seedDataStatistik() {
    await prisma.dataStatistik.createMany({
        data: [
            { group: "data-sekolah-kalsel", key: "total-sekolah", label: "Sekolah", value: "8.331" },
            { group: "data-sekolah-kalsel", key: "total-peserta-didik", label: "Peserta Didik", value: "427.601" },
            { group: "data-sekolah-kalsel", key: "total-guru", label: "Guru", value: "58.361" },
            { group: "data-sekolah-kalsel", key: "total-tenaga-kependidikan", label: "Tenaga Kependidikan", value: "27.942" },
        ]
    })
}