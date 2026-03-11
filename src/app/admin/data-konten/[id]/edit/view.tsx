"use client"

import { updateDataKontenAction } from '@/actions/data-konten-action'
import BackButton from '@/components/shared/back-button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useProgress } from '@bprogress/next'
import { useActionState, useEffect } from 'react'
import FormDataKonten from '../../components/form-data-konten'

export default function DataKontenEdit_View({
  dataKonten
}: {
  dataKonten: any
}) {

  const [state, formAction, pending] =
    useActionState(updateDataKontenAction.bind(null, dataKonten.id), null)

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
        <CardTitle className="text-xl">Edit Data Konten</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <FormDataKonten
          actionState={{
            state, formAction, pending
          }}
          dataKonten={dataKonten} />
      </CardContent>
      <Separator />
      <CardFooter>
        <BackButton url="/admin/data-konten" />
      </CardFooter>
    </Card>
  )
}
