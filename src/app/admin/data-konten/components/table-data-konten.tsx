"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatTanggalWaktuIndonesia } from "@/utils/formatTanggalWaktuIndonesia"
import { useRouter } from "@bprogress/next"
import { BiEdit } from "react-icons/bi"

export default function TableDataKonten({
    daftarDataKonten
}: {
    daftarDataKonten: any[]
}) {

    const router = useRouter()

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>No.</TableHead>
                    <TableHead>Group</TableHead>
                    <TableHead>Key</TableHead>
                    <TableHead>Label</TableHead>
                    <TableHead>Waktu Dibuat</TableHead>
                    <TableHead>Waktu Diperbarui</TableHead>
                    <TableHead>Aksi</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    daftarDataKonten.length > 0 ?
                    daftarDataKonten.map((dataKonten, index) => (
                        <TableRow key={dataKonten.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{dataKonten.group}</TableCell>
                            <TableCell>{dataKonten.key}</TableCell>
                            <TableCell className="font-medium">{dataKonten.label}</TableCell>
                            <TableCell>{formatTanggalWaktuIndonesia(dataKonten.createdAt)}</TableCell>
                            <TableCell>{formatTanggalWaktuIndonesia(dataKonten.updatedAt)}</TableCell>
                            <TableCell className='space-x-3'>
                                <Button variant='outline' size='sm'
                                    onClick={() => {
                                        router.push(`/admin/data-konten/${dataKonten.id}/edit`)
                                    }}>
                                    <BiEdit />
                                    Edit
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                    :
                    <TableRow>
                        <TableCell colSpan={99} className='text-center py-6'>
                            Tidak ada data konten.
                        </TableCell>
                    </TableRow>
                }
            </TableBody>
            <TableCaption>
                Total Data Konten: {daftarDataKonten.length}
            </TableCaption>
        </Table>
    )
}
