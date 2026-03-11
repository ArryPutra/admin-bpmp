"use client"

import { createKategoriBeritaAction } from "@/actions/kategori-berita-action"
import Search from "@/components/shared/search"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useActionState } from "react"
import TableKategoriBerita from "./components/table-kategori-berita"
import TambahKategoriBerita from "./components/tambah-kategori-berita"

export default function KategoriBerita_View({
    daftarKategori
}: {
    daftarKategori: any[]
}) {
    const [createState, createFormAction, createPending] =
        useActionState(createKategoriBeritaAction, null)

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between mb-4">
                    <TambahKategoriBerita state={createState} formAction={createFormAction} />
                    <Search />
                </div>
                {createState?.message && createState?.success &&
                        <Alert className="mt-4">
                            <AlertTitle>Pesan:</AlertTitle>
                            <AlertDescription>{createState.message}</AlertDescription>
                        </Alert>
                    }
            </CardHeader>
            <CardContent>
                <TableKategoriBerita daftarKategori={daftarKategori} />
            </CardContent>
        </Card>
    )
}
