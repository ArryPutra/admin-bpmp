"use client"

import { createDataStatistikAction } from '@/actions/data-statistik-action'
import FormDialog from '@/components/shared/dialog/form-dialog'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Field, FieldError, FieldLabel, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatTanggalWaktuIndonesia } from '@/utils/formatTanggalWaktuIndonesia'
import { useRouter } from '@bprogress/next'
import { useActionState } from 'react'
import { BiEdit, BiPlus } from 'react-icons/bi'

export default function DataStatistikView({
    daftarDataStatistik
}: {
    daftarDataStatistik: any[]
}) {
    const [createDataStatistikState, createDataStatistikFormAction, createDataStatistikPending] =
        useActionState(createDataStatistikAction, null)

    const router = useRouter()

    return (
        <Card>
            <CardHeader>
                <FormDialog
                    actionButtonLabel="Tambah Statistik"
                    description='Tambah Data Statistik'
                    formAction={createDataStatistikFormAction}
                    formContent={
                        <FieldSet>
                            <Field>
                                <FieldLabel>Key</FieldLabel>
                                <Input name='key' placeholder='Masukkan key' />
                                {
                                    createDataStatistikState?.errors?.key &&
                                    <FieldError>{createDataStatistikState.errors.key}</FieldError>
                                }
                            </Field>
                            <Field>
                                <FieldLabel>Label</FieldLabel>
                                <Input name='label' placeholder='Masukkan label' />
                                {
                                    createDataStatistikState?.errors?.label &&
                                    <FieldError>{createDataStatistikState.errors.label}</FieldError>
                                }
                            </Field>
                            <Field>
                                <FieldLabel>Value</FieldLabel>
                                <Input name='value' placeholder='Masukkan value' />
                                {
                                    createDataStatistikState?.errors?.value &&
                                    <FieldError>{createDataStatistikState.errors.value}</FieldError>
                                }
                            </Field>
                        </FieldSet>
                    }
                    isSuccess={createDataStatistikState?.success}
                    title='Tambah Data Statistik'
                    triggerButton={
                        <Button className='w-fit'>
                            Tambah Statistik
                            <BiPlus />
                        </Button>
                    }
                    message={createDataStatistikState?.message || ''} />

                {
                    (createDataStatistikState?.message && createDataStatistikState?.success) &&
                    <Alert className='mt-4'>
                        <AlertTitle>Pesan:</AlertTitle>
                        <AlertDescription>{createDataStatistikState?.message || ''}</AlertDescription>
                    </Alert>
                }
            </CardHeader>
            <CardContent>
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
            </CardContent>
        </Card>
    )
}
