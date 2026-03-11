"use client"

import { updateKategoriBeritaAction } from "@/actions/kategori-berita-action"
import BackButton from "@/components/shared/back-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useProgress } from "@bprogress/next"
import { useActionState, useEffect } from "react"

export default function KategoriBeritaEdit_View({ kategori }: { kategori: any }) {
    const [state, formAction, pending] =
        useActionState(updateKategoriBeritaAction.bind(null, kategori.id), null)
    const progress = useProgress()

    useEffect(() => {
        if (pending) { progress.start() } else { progress.stop() }
    }, [pending])

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Edit Kategori Berita</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent>
                <form action={formAction}>
                    <FieldSet>
                        <Field>
                            <FieldLabel>Nama Kategori</FieldLabel>
                            <Input
                                name="nama"
                                defaultValue={state?.values?.nama || kategori.nama}
                                placeholder="Masukkan nama kategori"
                            />
                            {state?.errors?.nama && <FieldError>{state.errors.nama[0]}</FieldError>}
                        </Field>
                        <Button className="w-fit">Simpan</Button>
                    </FieldSet>
                </form>
            </CardContent>
            <Separator />
            <CardFooter>
                <BackButton url="/admin/kategori-berita" />
            </CardFooter>
        </Card>
    )
}
