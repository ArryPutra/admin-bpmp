"use client"

import { deleteBeritaAction } from '@/actions/berita-action'
import ActionDialog from '@/components/shared/dialog/action-dialog'
import TextLink from '@/components/shared/text-link'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertDialogAction } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatTanggalWaktuIndonesia } from '@/utils/formatTanggalWaktuIndonesia'
import { getRowNumber } from '@/utils/getRowNumber'
import { useProgress } from '@bprogress/next'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi'

export default function TableBerita({
    daftarBerita
}: {
    daftarBerita: any[]
}) {

    const [deleteBeritaState, deleteBeritaFormAction, deleteBeritaPending] =
        useActionState(deleteBeritaAction, null)

    const progress = useProgress()
    const searchParams = useSearchParams()
    const currentPage = parseInt(searchParams.get('page') as string) || 1

    useEffect(() => {
        if (deleteBeritaPending) {
            progress.start()
        }

        progress.stop()
    }, [deleteBeritaPending])

    return (
        <>
            {
                deleteBeritaState?.message &&
                <Alert className='mb-6'>
                    <AlertTitle>Pesan:</AlertTitle>
                    <AlertDescription>
                        {deleteBeritaState?.message}
                    </AlertDescription>
                </Alert>
            }

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>No.</TableHead>
                        <TableHead className='max-w-xs'>Judul</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Gambar</TableHead>
                        <TableHead>Tanggal Dibuat</TableHead>
                        <TableHead>Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        daftarBerita.length > 0 ?
                            daftarBerita.map((berita, index) => (
                                <TableRow key={berita.id}>
                                    <TableCell>{getRowNumber(index, currentPage)}</TableCell>
                                    <TableCell className='truncate max-w-xs'>
                                        <TextLink
                                            url={`https://www.bpmpkalsel.web.id/berita/${berita.slug}`}
                                            children={berita.judul}
                                            targetBlank={true} />
                                    </TableCell>
                                    <TableCell>
                                        {berita.kategori?.nama ?? <span className='text-muted-foreground text-xs'>-</span>}
                                    </TableCell>
                                    <TableCell>
                                        <Image
                                            alt='Gambar Berita'
                                            src={berita.gambar}
                                            width={1920}
                                            height={1080}
                                            className='rounded-md aspect-video min-w-40 max-w-40 object-cover'
                                        />
                                    </TableCell>
                                    <TableCell>{formatTanggalWaktuIndonesia(berita.createdAt)}</TableCell>
                                    <TableCell className='space-x-3'>
                                        <Link href={`/admin/berita/${berita.id}/edit`}>
                                            <Button variant="outline" size="sm">
                                                <BiEdit /> Edit
                                            </Button>
                                        </Link>
                                        <DeleteBeritaAction
                                            berita={berita}
                                            formAction={deleteBeritaFormAction}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                            :
                            <TableRow>
                                <TableCell colSpan={99} className='text-center py-6'>
                                    Belum ada berita yang dibuat.
                                </TableCell>
                            </TableRow>
                    }
                </TableBody>
            </Table>
        </>
    )
}

function DeleteBeritaAction({
    berita,
    formAction
}: {
    berita: any
    formAction: (formData: FormData) => void
}) {
    return (
        <ActionDialog
            triggerButton={<Button variant="destructive" size='sm'><BiTrash /> Hapus</Button>}
            title="Hapus Berita"
            description="Hapus berita"
            sections={
                [
                    {
                        title: "Informasi Berita",
                        fields: [
                            {
                                label: "Judul",
                                value: berita.judul
                            }
                        ]
                    }
                ]
            }
            actionButton={
                <form action={formAction}>
                    <input type="hidden" name="beritaId" value={berita.id} />
                    <AlertDialogAction variant='destructive' type="submit">
                        Hapus Berita
                    </AlertDialogAction>
                </form>
            } />
    )
}
