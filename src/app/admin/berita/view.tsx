"use client"

import { PaginationWithLinks } from '@/components/shared/pagination-with-links'
import Search from '@/components/shared/search'
import SelectDropdown from '@/components/shared/select-dropdown'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import { BiPlus } from 'react-icons/bi'
import TableBerita from './components/table-berita'

export default function Berita_View({
    daftarBerita,
    totalDaftarBerita,
    daftarKategori = [],
}: {
    daftarBerita: any[]
    totalDaftarBerita: number
    daftarKategori?: { id: number; nama: string }[]
}) {
    return (
        <Card>
            <CardHeader className='flex justify-between'>
                <Link href='/admin/berita/create'>
                    <Button>
                        Tambah Berita <BiPlus />
                    </Button>
                </Link>
                <Search />
            </CardHeader>
            <CardHeader className='pt-0'>
                <SelectDropdown
                    label='Kategori'
                    query={{
                        name: 'kategoriId',
                        values: [
                            { label: 'Semua Kategori', value: '__reset__' },
                            ...daftarKategori.map(k => ({ label: k.nama, value: String(k.id) })),
                        ],
                        defaultValue: '__reset__',
                        deleteValue: '__reset__',
                    }}
                />
            </CardHeader>
            <CardContent>
                <TableBerita
                    daftarBerita={daftarBerita} />

            </CardContent>
            <CardFooter>
                <PaginationWithLinks
                    pageSize={10}
                    totalCount={totalDaftarBerita} />
            </CardFooter>
        </Card>
    )
}
