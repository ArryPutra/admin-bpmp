"use server"

import { getAllDataKontenAction } from '@/actions/data-konten-action'
import DataKonten_View from './view'
import prisma from '@/lib/prisma'

export default async function DataKonten_Page({
    searchParams
}: {
    searchParams: Promise<{
        search?: string,
        group?: string
    }>
}) {

    const _searchParams = await searchParams

    const daftarDataKonten = await getAllDataKontenAction({
        search: _searchParams.search,
        group: _searchParams.group
    })

    const daftarGroup = (await prisma.dataKonten.findMany({
        select: {
            group: true
        },
        distinct: ["group"]
    })).map(item => item.group)

    return (
        <DataKonten_View
            daftarDataKonten={daftarDataKonten}
            daftarGroup={daftarGroup} />
    )
}
