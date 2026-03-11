"use server"

import { getKategoriBeritaById } from "@/actions/kategori-berita-action"
import KategoriBeritaEdit_View from "./view"

export default async function KategoriBeritaEdit_Page({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const _params = await params
    const kategori = await getKategoriBeritaById(Number(_params.id))

    return <KategoriBeritaEdit_View kategori={kategori} />
}
