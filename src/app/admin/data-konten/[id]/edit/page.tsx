"use server"

import { getDataKontenById } from "@/actions/data-konten-action"
import DataKontenEdit_View from "./view"

export default async function DataKontenEdit_Page({
    params
}: {
    params: Promise<{ id: string }>
}) {

    const _params = await params

    const dataKonten =
        await getDataKontenById(Number(_params.id))

    return (
        <DataKontenEdit_View
        dataKonten={dataKonten}
        />
    )
}
