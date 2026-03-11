"use client"

import { createBeritaAction } from '@/actions/berita-action'
import BackButton from '@/components/shared/back-button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useActionState } from 'react'
import { createDataKontenAction } from '@/actions/data-konten-action'
import FormDataKonten from '../components/form-data-konten'

export default function DataKontenCreate_View() {

  const [state, formAction, pending] =
        useActionState(createDataKontenAction, null)

  return (
    <Card>
            <CardHeader>
                <CardTitle className="text-xl">Tambah Data Konten</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent>
                <FormDataKonten
                    actionState={{
                        state,
                        formAction,
                        pending
                    }}
                />
            </CardContent>
            <Separator />
            <CardFooter>
                <BackButton url="/admin/data-konten" />
            </CardFooter>
        </Card>
  )
}
