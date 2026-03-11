import { getAllKategoriBeritaOptions } from '@/actions/kategori-berita-action'
import BeritaCreate_View from './view'

export default async function BeritaCreate_Page() {
  const daftarKategori = await getAllKategoriBeritaOptions()
  return <BeritaCreate_View daftarKategori={daftarKategori} />
}
