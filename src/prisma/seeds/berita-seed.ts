import prisma from "@/lib/prisma"

async function beritaSeed() {
    const beritaData = [
        {
            slug: 'peningkatan-kualitas-guru-kalsel-2024',
            judul: 'Peningkatan Kualitas Guru di Kalimantan Selatan Tahun 2024',
            isi: '<h2><strong>Program Peningkatan Kompetensi Guru</strong></h2><p>BPMP Kalimantan Selatan terus berupaya meningkatkan kualitas guru melalui berbagai program pelatihan dan pendampingan profesional.</p><p>Program ini melibatkan lebih dari 500 guru dari berbagai jenjang pendidikan di seluruh Kalimantan Selatan.</p>',
            gambar: null,
            gambarPublicId: null,
        },
        {
            slug: 'bimtek-kurikulum-merdeka-banjarmasin',
            judul: 'Bimtek Kurikulum Merdeka Digelar di Banjarmasin',
            isi: '<h2><strong>Bimbingan Teknis Kurikulum Merdeka</strong></h2><p>BPMP Kalsel mengadakan bimbingan teknis implementasi Kurikulum Merdeka bagi kepala sekolah dan pengawas di wilayah Banjarmasin.</p><p>Kegiatan ini bertujuan mempercepat adopsi Kurikulum Merdeka di seluruh satuan pendidikan.</p>',
            gambar: null,
            gambarPublicId: null,
        },
        {
            slug: 'akreditasi-sekolah-kalsel-meningkat',
            judul: 'Jumlah Sekolah Terakreditasi A di Kalsel Meningkat Signifikan',
            isi: '<h2><strong>Capaian Akreditasi Sekolah</strong></h2><p>Berdasarkan data terbaru, jumlah sekolah dengan akreditasi A di Kalimantan Selatan mengalami peningkatan sebesar 15% dibandingkan tahun sebelumnya.</p><ul><li><p>SD: 120 sekolah terakreditasi A</p></li><li><p>SMP: 85 sekolah terakreditasi A</p></li><li><p>SMA: 60 sekolah terakreditasi A</p></li></ul>',
            gambar: null,
            gambarPublicId: null,
        },
        {
            slug: 'program-guru-penggerak-angkatan-10',
            judul: 'Program Guru Penggerak Angkatan 10 Resmi Dimulai',
            isi: '<h2><strong>Guru Penggerak Angkatan 10</strong></h2><p>BPMP Kalimantan Selatan resmi membuka Program Guru Penggerak Angkatan 10 dengan total 200 peserta dari berbagai kabupaten dan kota di Kalimantan Selatan.</p><p>Program ini berlangsung selama 6 bulan dengan metode kombinasi daring dan luring.</p>',
            gambar: null,
            gambarPublicId: null,
        },
        {
            slug: 'supervisi-akademik-sekolah-terpencil',
            judul: 'BPMP Kalsel Gelar Supervisi Akademik ke Sekolah Terpencil',
            isi: '<h2><strong>Supervisi Akademik Daerah Terpencil</strong></h2><p>Tim pengawas BPMP Kalimantan Selatan melakukan supervisi akademik ke sejumlah sekolah di daerah terpencil dan kepulauan untuk memastikan kualitas pendidikan yang merata.</p>',
            gambar: null,
            gambarPublicId: null,
        },
        {
            slug: 'pelatihan-literasi-digital-guru-sd',
            judul: 'Pelatihan Literasi Digital untuk Guru SD se-Kalimantan Selatan',
            isi: '<h2><strong>Literasi Digital Guru SD</strong></h2><p>Sebanyak 300 guru Sekolah Dasar mengikuti pelatihan literasi digital yang diselenggarakan oleh BPMP Kalimantan Selatan.</p><p>Pelatihan mencakup penggunaan platform pembelajaran digital, pembuatan konten edukatif, dan keamanan internet.</p>',
            gambar: null,
            gambarPublicId: null,
        },
        {
            slug: 'rapor-pendidikan-2024-diluncurkan',
            judul: 'Rapor Pendidikan 2024 Resmi Diluncurkan oleh Kemendikbud',
            isi: '<h2><strong>Peluncuran Rapor Pendidikan 2024</strong></h2><p>Kementerian Pendidikan dan Kebudayaan resmi meluncurkan Rapor Pendidikan 2024. BPMP Kalimantan Selatan siap mendampingi satuan pendidikan dalam membaca dan menindaklanjuti hasil rapor tersebut.</p>',
            gambar: null,
            gambarPublicId: null,
        },
        {
            slug: 'workshop-penyusunan-modul-ajar',
            judul: 'Workshop Penyusunan Modul Ajar Berbasis Kurikulum Merdeka',
            isi: '<h2><strong>Workshop Modul Ajar</strong></h2><p>BPMP Kalsel mengadakan workshop penyusunan modul ajar berbasis Kurikulum Merdeka yang diikuti oleh 150 guru dari jenjang SD, SMP, dan SMA.</p><p>Peserta dilatih menyusun modul ajar yang kontekstual dan sesuai kebutuhan peserta didik.</p>',
            gambar: null,
            gambarPublicId: null,
        },
        {
            slug: 'penghargaan-sekolah-adiwiyata-kalsel',
            judul: 'Sepuluh Sekolah di Kalsel Raih Penghargaan Adiwiyata Nasional',
            isi: '<h2><strong>Penghargaan Adiwiyata</strong></h2><p>Sepuluh sekolah di Kalimantan Selatan berhasil meraih penghargaan Adiwiyata Nasional tahun ini. Pencapaian ini merupakan hasil dari program pembinaan lingkungan hidup yang konsisten.</p>',
            gambar: null,
            gambarPublicId: null,
        },
        {
            slug: 'koordinasi-dinas-pendidikan-kabupaten-kota',
            judul: 'Rapat Koordinasi BPMP dengan Dinas Pendidikan Kabupaten/Kota',
            isi: '<h2><strong>Rapat Koordinasi Pendidikan</strong></h2><p>BPMP Kalimantan Selatan menggelar rapat koordinasi bersama 13 dinas pendidikan kabupaten dan kota se-Kalimantan Selatan.</p><p>Agenda utama meliputi evaluasi program tahun berjalan dan perencanaan program prioritas tahun berikutnya.</p>',
            gambar: null,
            gambarPublicId: null,
        },
        {
            slug: 'beasiswa-guru-s2-kalsel-2024',
            judul: 'BPMP Kalsel Buka Pendaftaran Beasiswa S2 untuk Guru',
            isi: '<h2><strong>Beasiswa S2 Guru</strong></h2><p>BPMP Kalimantan Selatan membuka pendaftaran beasiswa program magister (S2) bagi guru-guru berprestasi di Kalimantan Selatan.</p><ul><li><p>Kuota: 50 guru</p></li><li><p>Periode: 2024–2026</p></li><li><p>Bidang: Pendidikan, MIPA, Teknologi</p></li></ul>',
            gambar: null,
            gambarPublicId: null,
        },
        {
            slug: 'implementasi-pbl-sekolah-menengah',
            judul: 'Implementasi Project Based Learning di Sekolah Menengah Kalsel',
            isi: '<h2><strong>Project Based Learning</strong></h2><p>BPMP Kalimantan Selatan mendorong implementasi metode Project Based Learning (PBL) di sekolah menengah sebagai bagian dari transformasi pembelajaran Kurikulum Merdeka.</p>',
            gambar: null,
            gambarPublicId: null,
        },
        {
            slug: 'asesmen-nasional-2024-persiapan',
            judul: 'Persiapan Asesmen Nasional 2024 di Kalimantan Selatan',
            isi: '<h2><strong>Persiapan Asesmen Nasional</strong></h2><p>BPMP Kalimantan Selatan melakukan serangkaian kegiatan persiapan pelaksanaan Asesmen Nasional 2024, termasuk simulasi dan sosialisasi kepada seluruh satuan pendidikan.</p>',
            gambar: null,
            gambarPublicId: null,
        },
        {
            slug: 'komunitas-belajar-guru-aktif',
            judul: 'Komunitas Belajar Guru Aktif Berkembang di Seluruh Kalsel',
            isi: '<h2><strong>Komunitas Belajar Guru</strong></h2><p>Sebanyak 45 komunitas belajar guru telah terbentuk dan aktif di seluruh Kalimantan Selatan sebagai wadah berbagi praktik baik pembelajaran.</p><p>BPMP Kalsel berperan sebagai fasilitator dan pembina komunitas-komunitas tersebut.</p>',
            gambar: null,
            gambarPublicId: null,
        },
        {
            slug: 'digitalisasi-administrasi-sekolah',
            judul: 'Digitalisasi Administrasi Sekolah Didorong BPMP Kalsel',
            isi: '<h2><strong>Digitalisasi Administrasi</strong></h2><p>BPMP Kalimantan Selatan mendorong percepatan digitalisasi administrasi sekolah melalui penggunaan platform Dapodik dan aplikasi pendukung lainnya.</p><p>Pelatihan operator sekolah dilakukan secara berkelanjutan untuk memastikan data pendidikan yang akurat.</p>',
            gambar: null,
            gambarPublicId: null,
        },
        {
            slug: 'penguatan-pendidikan-karakter-siswa',
            judul: 'Program Penguatan Pendidikan Karakter Siswa Dilaksanakan',
            isi: '<h2><strong>Pendidikan Karakter</strong></h2><p>BPMP Kalsel melaksanakan program Penguatan Pendidikan Karakter (PPK) melalui kegiatan ekstrakurikuler, pembiasaan, dan integrasi nilai-nilai karakter dalam pembelajaran sehari-hari.</p>',
            gambar: null,
            gambarPublicId: null,
        },
        {
            slug: 'pelatihan-kepala-sekolah-transformasional',
            judul: 'Pelatihan Kepemimpinan Transformasional bagi Kepala Sekolah',
            isi: '<h2><strong>Kepemimpinan Transformasional</strong></h2><p>BPMP Kalimantan Selatan menyelenggarakan pelatihan kepemimpinan transformasional bagi 80 kepala sekolah dari berbagai jenjang pendidikan.</p><p>Materi pelatihan mencakup manajemen perubahan, pengembangan budaya sekolah, dan strategi peningkatan mutu.</p>',
            gambar: null,
            gambarPublicId: null,
        },
        {
            slug: 'monitoring-dana-bos-semester-1',
            judul: 'BPMP Kalsel Lakukan Monitoring Penggunaan Dana BOS Semester 1',
            isi: '<h2><strong>Monitoring Dana BOS</strong></h2><p>Tim BPMP Kalimantan Selatan melaksanakan monitoring dan evaluasi penggunaan Dana Bantuan Operasional Sekolah (BOS) semester pertama di sejumlah sekolah sampel.</p>',
            gambar: null,
            gambarPublicId: null,
        },
        {
            slug: 'forum-komunikasi-pengawas-sekolah',
            judul: 'Forum Komunikasi Pengawas Sekolah se-Kalimantan Selatan',
            isi: '<h2><strong>Forum Pengawas Sekolah</strong></h2><p>BPMP Kalsel memfasilitasi Forum Komunikasi Pengawas Sekolah yang dihadiri oleh 120 pengawas dari seluruh kabupaten dan kota di Kalimantan Selatan.</p><p>Forum ini membahas strategi supervisi akademik dan peningkatan kompetensi pengawas.</p>',
            gambar: null,
            gambarPublicId: null,
        },
        {
            slug: 'kolaborasi-bpmp-lptk-kalsel',
            judul: 'BPMP Kalsel Jalin Kolaborasi dengan LPTK untuk Pendidikan Guru',
            isi: '<h2><strong>Kolaborasi BPMP dan LPTK</strong></h2><p>BPMP Kalimantan Selatan menandatangani perjanjian kerja sama dengan Lembaga Pendidikan Tenaga Kependidikan (LPTK) di Kalimantan Selatan untuk memperkuat program pendidikan dan pelatihan guru.</p>',
            gambar: null,
            gambarPublicId: null,
        },
    ]

    for (const berita of beritaData) {
        const gambarUrl = `https://picsum.photos/seed/${berita.slug}/1200/675`

        await prisma.berita.upsert({
            where: { slug: berita.slug },
            update: {
                judul: berita.judul,
                isi: berita.isi,
                gambar: gambarUrl,
                gambarPublicId: null,
            },
            create: {
                ...berita,
                gambar: gambarUrl,
                gambarPublicId: null,
            },
        })
    }
}

export default beritaSeed