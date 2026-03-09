"use client"

import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatTanggalWaktuIndonesia } from '@/utils/formatTanggalWaktuIndonesia'
import { useRouter } from '@bprogress/next'
import { BiEdit } from 'react-icons/bi'

export default function TableDataStatistik({
    daftarDataStatistik
}: {
    daftarDataStatistik: any[]
}) {

    const router = useRouter()

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>No.</TableHead>
                    <TableHead>Key</TableHead>
                    <TableHead>Label</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Waktu Dibuat</TableHead>
                    <TableHead>Waktu Diperbarui</TableHead>
                    <TableHead>Aksi</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    daftarDataStatistik.map((dataStatistik, index) => (
                        <TableRow key={dataStatistik.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{dataStatistik.key}</TableCell>
                            <TableCell>{dataStatistik.label}</TableCell>
                            <TableCell>{dataStatistik.value}</TableCell>
                            <TableCell>{formatTanggalWaktuIndonesia(dataStatistik.createdAt)}</TableCell>
                            <TableCell>{formatTanggalWaktuIndonesia(dataStatistik.updatedAt)}</TableCell>
                            <TableCell className='space-x-3'>
                                <Button variant='outline' size='sm'
                                    onClick={() => {
                                        router.push(`/admin/data-statistik/${dataStatistik.id}/edit`)
                                    }}>
                                    <BiEdit />
                                    Edit
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
            <TableCaption>
                Total Data Statistik: {daftarDataStatistik.length}
            </TableCaption>
        </Table>
    )
}
