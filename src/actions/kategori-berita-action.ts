"use server"

import prisma from "@/lib/prisma"
import { CreateKategoriBeritaSchema, UpdateKategoriBeritaSchema } from "@/schemas/KategoriBeritaSchema"
import ActionState from "@/types/ActionState"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function getAllKategoriBerita({ search = "" }: { search?: string } = {}) {
    const _search = search.trim()
    return await prisma.kategoriBerita.findMany({
        where: _search
            ? { nama: { contains: _search, mode: "insensitive" } }
            : undefined,
        orderBy: { nama: "asc" },
        include: { _count: { select: { berita: true } } },
    })
}

export async function getKategoriBeritaById(id: number) {
    return await prisma.kategoriBerita.findUnique({ where: { id } })
}

export async function getAllKategoriBeritaOptions() {
    return await prisma.kategoriBerita.findMany({
        orderBy: { nama: "asc" },
        select: { id: true, nama: true },
    })
}

export async function createKategoriBeritaAction(prevState: ActionState | null, formData: FormData) {
    const values = Object.fromEntries(formData.entries())
    const validatedFields = CreateKategoriBeritaSchema.safeParse(values)

    if (!validatedFields.success) {
        return { success: false, errors: validatedFields.error.flatten().fieldErrors, values }
    }

    try {
        await prisma.kategoriBerita.create({
            data: { nama: validatedFields.data.nama },
        })
    } catch (error) {
        console.error(error)
        return { success: false, message: "Terjadi kesalahan saat membuat kategori berita." }
    }

    revalidatePath("/admin/kategori-berita")
    return { success: true, message: `Kategori "${validatedFields.data.nama}" berhasil ditambahkan.` }
}

export async function updateKategoriBeritaAction(id: number, prevState: ActionState | null, formData: FormData) {
    const values = Object.fromEntries(formData.entries())
    const validatedFields = UpdateKategoriBeritaSchema.safeParse(values)

    if (!validatedFields.success) {
        return { success: false, errors: validatedFields.error.flatten().fieldErrors, values }
    }

    try {
        await prisma.kategoriBerita.update({
            where: { id },
            data: { nama: validatedFields.data.nama },
        })
    } catch (error) {
        console.error(error)
        return { success: false, message: "Terjadi kesalahan saat memperbarui kategori berita.", values }
    }

    redirect("/admin/kategori-berita")
}

export async function deleteKategoriBeritaAction(prevState: ActionState | null, formData: FormData) {
    const kategoriId = formData.get("kategoriId") as string
    let kategori

    try {
        kategori = await prisma.kategoriBerita.delete({ where: { id: Number(kategoriId) } })
    } catch (error) {
        console.error(error)
        return { success: false, message: "Terjadi kesalahan saat menghapus kategori berita." }
    }

    revalidatePath("/admin/kategori-berita")
    return { success: true, message: `Kategori "${kategori.nama}" berhasil dihapus.` }
}
