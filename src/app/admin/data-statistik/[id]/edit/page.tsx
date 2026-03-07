"use server"

import { getDataStatistikById } from "@/actions/data-statistik-action"
import DataStatistik_EditView from "./view"

export default async function DataStatistik_EditPage({
    params
}: {
    params: Promise<{ id: string }>
}
) {

    const _params = await params

    const dataStatistik =
        await getDataStatistikById(Number(_params.id))

    return (
        <DataStatistik_EditView
            dataStatistik={dataStatistik} />
    )
}
