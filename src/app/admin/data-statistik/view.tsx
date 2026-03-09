"use client"

import { createDataStatistikAction } from '@/actions/data-statistik-action'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useActionState } from 'react'
import TableDataStatistik from './components/table-data-statistik'
import TambahDataStatistik from './components/tambah-data-statistik'

export default function DataStatistikView({
    daftarDataStatistik
}: {
    daftarDataStatistik: any[]
}) {

    const [createDataStatistikState, createDataStatistikFormAction, createDataStatistikPending] =
        useActionState(createDataStatistikAction, null)

    return (
        <Card>
            <CardHeader>
                <TambahDataStatistik
                    state={createDataStatistikState}
                    formAction={createDataStatistikFormAction} />
                {
                    (createDataStatistikState?.message && createDataStatistikState?.success) &&
                    <Alert className='mt-4'>
                        <AlertTitle>Pesan:</AlertTitle>
                        <AlertDescription>{createDataStatistikState?.message || ''}</AlertDescription>
                    </Alert>
                }
            </CardHeader>
            <CardContent>
                <TableDataStatistik
                    daftarDataStatistik={daftarDataStatistik} />
            </CardContent>
        </Card>
    )
}
