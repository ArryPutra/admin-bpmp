"use server"

import prisma from '@/lib/prisma'
import DataStatistikView from './view'
import { getAllDataStatistik } from '@/actions/data-statistik-action'

export default async function DataStatistikPage() {

  const daftarDataStatistik = await getAllDataStatistik()
  
  return (
    <DataStatistikView 
    daftarDataStatistik={daftarDataStatistik}
    />
  )
}
