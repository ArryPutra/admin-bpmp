"use client"

import { updateDataStatistikAction } from "@/actions/data-statistik-action"
import BackButton from "@/components/shared/back-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldDescription, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useProgress } from "@bprogress/next"
import { useActionState, useEffect } from "react"

export default function DataStatistik_EditView({
  dataStatistik
}: {
  dataStatistik: any
}) {

  const [state, formAction, pending] =
    useActionState(updateDataStatistikAction.bind(null, dataStatistik.id), null)

  const progress = useProgress()

  useEffect(() => {
    if (pending) {
      progress.start()
    } else {
      progress.stop()
    }
  }, [pending])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Edit Data Statistik</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <form action={formAction}>
          <FieldSet>
            <Field>
              <FieldLabel>Key</FieldLabel>
              <Input defaultValue={dataStatistik.key} disabled />
              <FieldDescription>Key tidak dapat diubah untuk menjaga konsistensi data</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Label</FieldLabel>
              <Input name="label" defaultValue={state?.values?.label || dataStatistik.label} placeholder="Masukkan label" />
              {
                state?.errors?.label && (
                  <FieldDescription className="text-red-500">{state.errors.label}</FieldDescription>
                )
              }
            </Field>
            <Field>
              <FieldLabel>Value</FieldLabel>
              <Input name="value" defaultValue={state?.values?.value || dataStatistik.value} placeholder="Masukkan value" />
            </Field>
            <Button className="w-fit">Simpan</Button>
          </FieldSet>
        </form>
      </CardContent>
      <Separator />
      <CardFooter>
        <BackButton url="/admin/data-statistik" />
      </CardFooter>
    </Card>
  )
}
