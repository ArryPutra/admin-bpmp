"use server"

import BackButton from '@/components/shared/back-button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import prisma from '@/lib/prisma'
import FormBerita from '../../components/form-berita'
import BeritaEdit_View from './view'

export default async function BeritaEdit_Page({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const _params = await params

    const berita = await prisma.berita.findUnique({
        where: {
            id: Number(_params.id)
        }
    })

    return (
        <BeritaEdit_View
        berita={berita}
        />
    )
}
