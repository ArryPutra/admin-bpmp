import prisma from "@/lib/prisma";

export async function seedDataKonten() {
    await prisma.dataKonten.createMany({
        data: [
            {
                group: "tentang-bpmp",
                key: "apa-itu-bpmp",
                label: "Apa Itu BPMP",
                value:
                    `Balai Penjaminan Mutu Pendidikan (BPMP) Provinsi Kalimantan Selatan adalah Unit Pelaksana Teknis (UPT) Kementerian Pendidikan Dasar dan Menengah yang berada di bawah dan bertanggung jawab kepada Direktur Jenderal Pendidikan Anak Usia Dini, Pendidikan Dasar, dan Pendidikan Menengah.

                BPMP dipimpin oleh Kepala Balai yang mempunyai tugas melaksanakan penjaminan mutu pendidikan anak usia dini, pendidikan dasar, dan pendidikan menengah di wilayah kerjanya berdasarkan kebijakan teknis yang ditetapkan oleh Direktur Jenderal.

                Dalam melaksanakan tugas, BPMP menyelenggarakan fungsi:

                1. Pelaksanaan fasilitasi peningkatan mutu pendidikan anak usia dini, pendidikan dasar, dan pendidikan menengah
                2. Pelaksanaan pemetaan mutu pendidikan anak usia dini, pendidikan dasar, dan pendidikan menengah
                3. Pengembangan dan pengelolaan sistem informasi mutu pendidikan anak usia dini, pendidikan dasar, dan pendidikan menengah
                4. Pelaksanaan supervisi satuan pendidikan anak usia dini, pendidikan dasar, dan pendidikan menengah dalam pencapaian standar nasional pendidikan
                5. Pelaksanaan kerja sama di bidang penjaminan mutu pendidikan
                6. Pelaksanaan urusan administrasi BPMP`
            },
            {
                group: "beranda",
                key: "tentang-kami",
                label: "Balai Penjaminan Mutu Pendidikan Provinsi Kalimantan Selatan",
                value:
                    `BPMP Provinsi Kalimantan Selatan merupakan Unit Pelaksana Teknis (UPT) Kementerian Pendidikan Dasar dan Menengah yang mempunyai tugas melaksanakan penjaminan dan peningkatan mutu pendidikan dasar dan menengah di wilayah kerjanya.
                
                Dengan komitmen untuk meningkatkan kualitas pendidikan di Kalimantan Selatan, kami bekerja sama dengan berbagai pemangku kepentingan termasuk Dinas Pendidikan, Satuan Pendidikan, dan masyarakat untuk mewujudkan pendidikan yang bermutu, merata, dan berkeadilan.`
            },
            {
                group: "beranda",
                key: "visi",
                label: "Visi",
                value: 'Terwujudnya layanan pendidikan dasar dan menengah yang bermutu di Provinsi Kalimantan Selatan'
            }
        ]
    })
}