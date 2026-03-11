"use client"

import FormDialog from "@/components/shared/dialog/form-dialog"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { BiPlus } from "react-icons/bi"

export default function TambahKategoriBerita({
    state,
    formAction
}: {
    state: any
    formAction: any
}) {
    return (
        <FormDialog
            actionButtonLabel="Tambah Kategori"
            description="Tambah Kategori Berita"
            formAction={formAction}
            formContent={
                <FieldSet>
                    <Field>
                        <FieldLabel>Nama Kategori</FieldLabel>
                        <Input
                            name="nama"
                            placeholder="Masukkan nama kategori"
                            defaultValue={state?.values?.nama || ""}
                        />
                        {state?.errors?.nama && <FieldError>{state.errors.nama}</FieldError>}
                    </Field>
                </FieldSet>
            }
            isSuccess={state?.success}
            title="Tambah Kategori Berita"
            triggerButton={<Button className="w-fit">Tambah Kategori <BiPlus /></Button>}
            message={state?.message || ""}
        />
    )
}
