"use server"

import { getAllBeritaAction } from '@/actions/berita-action'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import { BiPlus } from 'react-icons/bi'
import TableBerita from './components/table-berita'

export default async function Berita_Page() {
  const daftarBerita = await getAllBeritaAction()

  return (
    <Card>
      <CardHeader>
        <Link href='/admin/berita/create'>
          <Button>
            Tambah Berita <BiPlus />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <TableBerita
          daftarBerita={daftarBerita} />
      </CardContent>
    </Card>
  )
}
