"use client"

import { updateBeritaAction } from '@/actions/berita-action'
import BackButton from '@/components/shared/back-button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useActionState } from 'react'
import FormBerita from '../../components/form-berita'

export default function BeritaEdit_View({
    berita
}: {
    berita: any
}) {
    const [state, formAction, pending] =
        useActionState(updateBeritaAction, null)

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Edit Berita</CardTitle>
                <CardDescription>{berita?.slug}</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent>
                <FormBerita
                    actionState={{
                        state, formAction, pending
                    }}
                    berita={berita}
                />
            </CardContent>
            <Separator />
            <CardFooter>
                <BackButton url="/admin/berita" />
            </CardFooter>
        </Card>
    )
}
