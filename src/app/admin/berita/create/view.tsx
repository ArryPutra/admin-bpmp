"use client"

import { createBeritaAction } from '@/actions/berita-action'
import BackButton from '@/components/shared/back-button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useActionState } from 'react'
import FormBerita from '../components/form-berita'

export default function BeritaCreate_View({
    daftarKategori
}: {
    daftarKategori: { id: number; nama: string }[]
}) {

    const [state, formAction, pending] =
        useActionState(createBeritaAction, null)

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Tambah Berita</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent>
                <FormBerita
                    actionState={{
                        state,
                        formAction,
                        pending
                    }}
                    daftarKategori={daftarKategori}
                />
            </CardContent>
            <Separator />
            <CardFooter>
                <BackButton url="/admin/berita" />
            </CardFooter>
        </Card>
    )
}
