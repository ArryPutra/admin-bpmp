"use client"

import RichTextEditor from "@/components/shared/rich-text-editor"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldError, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useProgress } from "@bprogress/next"
import { useEffect } from "react"

export default function FormDataKonten({
  actionState,
  dataKonten
}: {
  actionState: {
    state: any
    formAction: any
    pending: boolean
  }
  dataKonten?: any
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
      <FieldSet>
        <Field>
          <FieldLabel>Group {!dataKonten && '(opsional)'}</FieldLabel>
          <Input
            name='group'
            placeholder='Masukkan group'
            defaultValue={dataKonten?.group ?? actionState.state?.values?.group}
            disabled={dataKonten}
          />
          {
            actionState.state?.errors?.group &&
            <FieldError>{actionState.state.errors.group}</FieldError>
          }
        </Field>
        <Field>
          <FieldLabel>Key</FieldLabel>
          <Input
            name='key'
            placeholder='Masukkan key'
            defaultValue={dataKonten?.key}
            disabled={dataKonten}
          />
          {
            actionState.state?.errors?.key &&
            <FieldError>{actionState.state.errors.key}</FieldError>
          }
        </Field>
        <Field>
          <FieldLabel>Label</FieldLabel>
          <Input
            name='label'
            placeholder='Masukkan label'
            defaultValue={dataKonten?.label ?? actionState.state?.values?.label}
          />
          {
            actionState.state?.errors?.label &&
            <FieldError>{actionState.state.errors.label}</FieldError>
          }
        </Field>
        <Field>
          <FieldLabel>Value</FieldLabel>
          <Textarea 
            name='value' 
            placeholder="Masukkan value"
            defaultValue={dataKonten?.value ?? actionState.state?.values?.value}
          />
          {
            actionState.state?.errors?.value &&
            <FieldError>{actionState.state.errors.value}</FieldError>
          }
        </Field>
        <Button className="w-fit" type="submit">
          {dataKonten ? "Perbarui" : "Tambah"}
        </Button>
      </FieldSet>
    </form>
  )
}
