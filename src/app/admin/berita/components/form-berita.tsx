"use client"

import RichTextEditor from '@/components/shared/rich-text-editor'
import SingleImageUpload from '@/components/shared/single-image-upload'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useProgress } from '@bprogress/next'
import { useEffect } from 'react'

export default function FormBerita({
    actionState,
    berita,
    daftarKategori = [],
}: {
    actionState: {
        state: any
        formAction: any
        pending: boolean
    }
    berita?: any
    daftarKategori?: { id: number; nama: string }[]
}) {

    const progress = useProgress()

    useEffect(() => {
        if (actionState.pending) {
            progress.start()
        } else {
            progress.stop()
        }
    }, [actionState.pending])

    return (
        <form action={actionState.formAction}>
            {
                berita &&
                <Input type='hidden' name="id" defaultValue={berita?.id} />
            }
            <FieldSet>
                <Field>
                    <FieldLabel>Judul</FieldLabel>
                    <Input
                        name="judul"
                        defaultValue={berita?.judul ?? actionState.state?.values?.judul as string}
                        placeholder="Masukkan judul"
                    />
                    {
                        actionState.state?.errors?.judul &&
                        <FieldError>{actionState.state.errors.judul[0]}</FieldError>
                    }
                </Field>
                <Field>
                    <FieldLabel>Kategori</FieldLabel>
                    <Select
                        name="kategoriId"
                        defaultValue={
                            String(berita?.kategoriId ?? actionState.state?.values?.kategoriId ?? "")
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih kategori (opsional)" />
                        </SelectTrigger>
                        <SelectContent>
                            {daftarKategori.map(k => (
                                <SelectItem key={k.id} value={String(k.id)}>{k.nama}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {
                        actionState.state?.errors?.kategoriId &&
                        <FieldError>{actionState.state.errors.kategoriId[0]}</FieldError>
                    }
                </Field>
                <Field>
                    <FieldLabel>Isi</FieldLabel>
                    <RichTextEditor
                        name='isi'
                        defaultValue={berita?.isi ?? actionState.state?.values?.isi as string}
                    />
                    {
                        actionState.state?.errors?.isi &&
                        <FieldError>{actionState.state.errors.isi[0]}</FieldError>
                    }
                </Field>
                <Field>
                    <SingleImageUpload
                        name="gambar"
                        label="Gambar"
                        defaultImageUrl={berita?.gambar}
                        error={actionState.state?.errors?.gambar?.[0]}
                        maxSizeInMB={5}
                    />
                    {
                        actionState.state?.errors?.gambar &&
                        <FieldError>{actionState.state.errors.gambar[0]}</FieldError>
                    }
                </Field>
                <Button className="w-fit" type="submit">
                    {berita ? "Perbarui" : "Tambah"}
                </Button>
            </FieldSet>
        </form>
    )
}
