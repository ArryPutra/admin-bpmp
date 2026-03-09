"use server"

import DaftarKartuRingkasan from './components/daftar-kartu-ringkasan';
import prisma from '@/lib/prisma';

export default async function Dashboard_Page() {
  return (
    <DaftarKartuRingkasan
      dataTotalRingkasan={{
        totalBerita: await prisma.berita.count()
      }} />
  );
}
