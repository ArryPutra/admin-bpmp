"use server"

import { getAllBeritaAction } from '@/actions/berita-action'
import Berita_View from './view'
import { getAllKategoriBerita } from '@/actions/kategori-berita-action'

export default async function Berita_Page({
  searchParams
}: {
  searchParams: Promise<{
    search?: string
    page?: string
    kategoriId?: string
  }>
}) {

  const _searchParams = await searchParams

  const { daftarBerita, total } = await getAllBeritaAction({
    search: _searchParams.search,
    page: _searchParams.page ? parseInt(_searchParams.page) : 1,
    kategoriId: Number(_searchParams.kategoriId) ?? undefined
  })

  const daftarKategori = await getAllKategoriBerita()

  return (
    <Berita_View
      daftarBerita={daftarBerita}
      totalDaftarBerita={total}
      daftarKategori={daftarKategori}
    />
  )
}
