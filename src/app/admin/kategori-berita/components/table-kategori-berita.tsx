"use client"

import { deleteKategoriBeritaAction } from "@/actions/kategori-berita-action"
import ActionDialog from "@/components/shared/dialog/action-dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertDialogAction } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatTanggalWaktuIndonesia } from "@/utils/formatTanggalWaktuIndonesia"
import { useProgress } from "@bprogress/next"
import Link from "next/link"
import { useActionState, useEffect } from "react"
import { BiEdit, BiTrash } from "react-icons/bi"

export default function TableKategoriBerita({ daftarKategori }: { daftarKategori: any[] }) {
    const [deleteState, deleteFormAction, deletePending] =
        useActionState(deleteKategoriBeritaAction, null)
    const progress = useProgress()

    useEffect(() => {
        if (deletePending) { progress.start() }
        progress.stop()
    }, [deletePending])

    return (
        <>
            {deleteState?.message &&
                <Alert className="mb-6">
                    <AlertTitle>Pesan:</AlertTitle>
                    <AlertDescription>{deleteState.message}</AlertDescription>
                </Alert>
            }
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>No.</TableHead>
                        <TableHead>Nama Kategori</TableHead>
                        <TableHead>Jumlah Berita</TableHead>
                        <TableHead>Tanggal Dibuat</TableHead>
                        <TableHead>Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {daftarKategori.length > 0
                        ? daftarKategori.map((kategori, index) => (
                            <TableRow key={kategori.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell className="font-medium">{kategori.nama}</TableCell>
                                <TableCell>{kategori._count.berita}</TableCell>
                                <TableCell>{formatTanggalWaktuIndonesia(kategori.createdAt)}</TableCell>
                                <TableCell className="space-x-3">
                                    <Link href={`/admin/kategori-berita/${kategori.id}/edit`}>
                                        <Button variant="outline" size="sm"><BiEdit /> Edit</Button>
                                    </Link>
                                    <DeleteKategoriAction kategori={kategori} formAction={deleteFormAction} />
                                </TableCell>
                            </TableRow>
                        ))
                        : <TableRow>
                            <TableCell colSpan={99} className="text-center py-6">
                                Belum ada kategori berita.
                            </TableCell>
                        </TableRow>
                    }
                </TableBody>
            </Table>
        </>
    )
}

function DeleteKategoriAction({
    kategori,
    formAction
}: {
    kategori: any
    formAction: (formData: FormData) => void
}) {
    return (
        <ActionDialog
            triggerButton={<Button variant="destructive" size="sm"><BiTrash /> Hapus</Button>}
            title="Hapus Kategori Berita"
            description="Hapus kategori berita"
            sections={[{
                title: "Informasi Kategori",
                fields: [
                    { label: "Nama", value: kategori.nama },
                    { label: "Jumlah Berita", value: String(kategori._count.berita) },
                ]
            }]}
            actionButton={
                <form action={formAction}>
                    <input type="hidden" name="kategoriId" value={kategori.id} />
                    <AlertDialogAction variant="destructive" type="submit">
                        Hapus Kategori
                    </AlertDialogAction>
                </form>
            }
        />
    )
}
