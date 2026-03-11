"use server"

import { getAllKategoriBerita } from "@/actions/kategori-berita-action"
import KategoriBerita_View from "./view"

export default async function KategoriBerita_Page({
    searchParams
}: {
    searchParams: Promise<{ search?: string }>
}) {
    const _searchParams = await searchParams
    const daftarKategori = await getAllKategoriBerita({ search: _searchParams.search })

    return <KategoriBerita_View daftarKategori={daftarKategori} />
}
