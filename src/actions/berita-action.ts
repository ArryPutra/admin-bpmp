"use server"

import prisma from "@/lib/prisma";
import { CreateBeritaSchema, UpdateBeritaSchema } from "@/schemas/BeritaSchema";
import ActionState from "@/types/ActionState";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteImageAction, uploadImageAction } from "./cloudinary-action";

export async function getAllBeritaAction({
    search,
    page = 1,
    kategoriId,
}: {
    search?: string
    page?: number
    kategoriId?: number
}) {
    const _search = search?.trim()

    const where: any = {}

    if (_search) {
        where.OR = [
            { judul: { contains: _search, mode: "insensitive" as const } },
            { isi: { contains: _search, mode: "insensitive" as const } },
        ]
    }

    if (kategoriId) {
        where.kategoriId = kategoriId
    }

    const [daftarBerita, total] = await Promise.all([
        prisma.berita.findMany({
            where,
            orderBy: {
                createdAt: "desc"
            },
            skip: (page - 1) * 10,
            take: 10,
            include: { kategori: true },
        }),
        prisma.berita.count({ where })
    ])

    return {
        daftarBerita,
        total
    }
}

export async function createBeritaAction(
    prevState: ActionState | null,
    formData: FormData,
) {
    const values = Object.fromEntries(formData.entries())
    const { gambar: _gambar, ...safeValues } = values

    const validatedFields =
        CreateBeritaSchema.safeParse(values)

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            values: safeValues,
        }
    }

    const uploadImage = await uploadImageAction(validatedFields.data.gambar)

    if (!uploadImage.success) {
        return {
            success: false,
            message: uploadImage.error || "Gagal mengunggah gambar."
        }
    }

    const baseSlug = validatedFields.data.judul
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")

    let uniqueSlug = baseSlug
    let counter = 2

    while (await prisma.berita.findUnique({ where: { slug: uniqueSlug } })) {
        uniqueSlug = `${baseSlug}-${counter}`
        counter++
    }

    try {
        await prisma.berita.create({
            data: {
                slug: uniqueSlug,
                judul: validatedFields.data.judul,
                isi: validatedFields.data.isi,
                gambar: uploadImage.data?.url,
                gambarPublicId: uploadImage.data?.public_id,
                kategoriId: validatedFields.data.kategoriId ?? null,
            }
        })
    } catch (error) {
        console.error(error)

        return {
            success: false,
            message: "Terjadi kesalahan saat membuat berita."
        }
    }

    redirect("/admin/berita")
}

export async function updateBeritaAction(
    _prevState: ActionState | null,
    formData: FormData
) {
    const values = Object.fromEntries(formData.entries())
    const { gambar: _gambar, ...safeValues } = values
    const validatedFields =
        UpdateBeritaSchema.safeParse(values)

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            values: safeValues,
        }
    }

    let uploadImage
    if (validatedFields.data.gambar instanceof File) {
        uploadImage = await uploadImageAction(validatedFields.data.gambar)

        if (!uploadImage.success) {
            return {
                success: false,
                message: uploadImage.error || "Gagal mengunggah gambar."
            }
        }
    }

    try {
        const oldGambarPublicIdBerita = await prisma.berita.findUnique({
            where: {
                id: validatedFields.data.id
            },
            select: {
                gambarPublicId: true
            }
        })

        await prisma.berita.update({
            where: {
                id: validatedFields.data.id
            },
            data: {
                judul: validatedFields.data.judul,
                isi: validatedFields.data.isi,
                gambar: uploadImage?.data?.url,
                gambarPublicId: uploadImage?.data?.public_id,
                kategoriId: validatedFields.data.kategoriId ?? null,
            }
        })

        if (uploadImage?.success) {
            await deleteImageAction(oldGambarPublicIdBerita?.gambarPublicId as string)
        }
    } catch (error) {
        console.error(error)

        return {
            success: false,
            message: "Terjadi kesalahan saat memperbarui berita."
        }
    }

    redirect("/admin/berita")
}

export async function deleteBeritaAction(
    prevState: ActionState | null,
    formData: FormData
) {
    const beritaId = formData.get("beritaId") as string

    let berita

    try {
        berita = await prisma.berita.delete({
            where: {
                id: Number(beritaId)
            }
        })

        if (berita.gambarPublicId) {
            await deleteImageAction(berita.gambarPublicId)
        }
    } catch (error) {
        console.error(error)

        return {
            success: false,
            message: "Terjadi kesalahan saat menghapus berita."
        }
    }

    revalidatePath("/admin/berita")

    return {
        success: true,
        message: `Berita dengan judul "${berita.judul}" berhasil dihapus.`
    }
}