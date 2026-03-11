"use client"

import { createDataStatistikAction } from '@/actions/data-statistik-action'
import Search from '@/components/shared/search'
import SelectDropdown from '@/components/shared/select-dropdown'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useActionState } from 'react'
import TableDataStatistik from './components/table-data-statistik'
import TambahDataStatistik from './components/tambah-data-statistik'

export default function DataStatistikView({
    daftarDataStatistik,
    daftarGroup
}: {
    daftarDataStatistik: any[]
    daftarGroup: string[]
}) {

    const [createDataStatistikState, createDataStatistikFormAction, createDataStatistikPending] =
        useActionState(createDataStatistikAction, null)

    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between mb-4'>
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

                    <Search />
                </div>
                <SelectDropdown
                    label="Group"
                    query={{
                        name: "group",
                        values: [
                            { label: "Semua", value: "__reset__" },
                            ...daftarGroup.map(group => ({ label: group, value: group })),
                        ],
                        defaultValue: "__reset__",
                        deleteValue: "__reset__"
                    }} />
            </CardHeader>
            <CardContent>
                <TableDataStatistik
                    daftarDataStatistik={daftarDataStatistik} />
            </CardContent>
        </Card>
    )
}
