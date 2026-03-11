"use server"

import { getAllDataStatistik } from '@/actions/data-statistik-action'
import prisma from '@/lib/prisma'
import DataStatistikView from './view'

export default async function DataStatistikPage({
  searchParams
}: {
  searchParams: Promise<{
    search?: string
  }>
}) {

  const _searchParams = await searchParams

  const daftarDataStatistik = await getAllDataStatistik({
    search: _searchParams.search
  })

  const daftarGroup = (await prisma.dataStatistik.findMany({
    select: {
      group: true
    },
    distinct: ["group"]
  })).map(item => item.group)

  return (
    <DataStatistikView
      daftarDataStatistik={daftarDataStatistik}
      daftarGroup={daftarGroup}
    />
  )
}
