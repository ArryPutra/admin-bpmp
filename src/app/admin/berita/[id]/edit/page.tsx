"use server"

import { getAllKategoriBeritaOptions } from '@/actions/kategori-berita-action'
import prisma from '@/lib/prisma'
import BeritaEdit_View from './view'

export default async function BeritaEdit_Page({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const _params = await params

    const [berita, daftarKategori] = await Promise.all([
        prisma.berita.findUnique({
            where: { id: Number(_params.id) }
        }),
        getAllKategoriBeritaOptions()
    ])

    return (
        <BeritaEdit_View
            berita={berita}
            daftarKategori={daftarKategori}
        />
    )
}
