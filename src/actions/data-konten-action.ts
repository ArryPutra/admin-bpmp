"use server"

import prisma from "@/lib/prisma"
import { CreateDataKontenSchema, UpdateDataKontenSchema } from "@/schemas/DataKontenSchema"
import ActionState from "@/types/ActionState"
import { redirect } from "next/navigation"

export async function getAllDataKontenAction({
    search,
    group
}: {
    search?: string
    group?: string
} = {}) {

    const _search = search?.trim() || ""

    return await prisma.dataKonten.findMany({
        where: {
            group: {
                contains: group,
                mode: "insensitive"
            },
            OR: [
                {
                    key: {
                        contains: _search,
                        mode: "insensitive"
                    }
                },
                {
                    label: {
                        contains: _search,
                        mode: "insensitive"
                    }
                },
                {
                    value: {
                        contains: _search,
                        mode: "insensitive"
                    }
                }
            ]
        },
        orderBy: {
            createdAt: "asc"
        }
    })
}

export async function getDataKontenById(id: number) {
    try {
        return await prisma.dataKonten.findUnique({
            where: { id: id }
        })
    }
    catch (error) {
        console.error(error)

        return {
            success: false
        }
    }
}

export async function createDataKontenAction(
    prevState: ActionState | null,
    formData: FormData
) {
    const values = Object.fromEntries(formData.entries())
    const validatedFields = CreateDataKontenSchema.safeParse(values)

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            values: values
        }
    }

    let dataKonten = await prisma.dataKonten.findUnique({
        where: {
            group_key: {
                group: validatedFields.data.group,
                key: validatedFields.data.key
            }
        }
    })

    try {
        dataKonten = await prisma.dataKonten.create({
            data: {
                group: validatedFields.data.group,
                key: validatedFields.data.key,
                label: validatedFields.data.label,
                value: validatedFields.data.value,
            }
        })
    } catch (error) {
        console.error(error)

        return {
            success: false,
            message: "Terjadi kesalahan saat membuat data konten."
        }
    }

    redirect("/admin/data-konten")
}

export async function updateDataKontenAction(
    id: number,
    prevSatate: ActionState | null,
    formData: FormData,
) {
    const values = Object.fromEntries(formData.entries())
    const validatedFields =
        UpdateDataKontenSchema.safeParse(values)

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            values: values
        }
    }

    try {
        await prisma.dataKonten.update({
            where: { id: id },
            data: {
                label: validatedFields.data.label,
                value: validatedFields.data.value,
            }
        })
    } catch (error) {
        console.error(error)

        return {
            success: false,
            message: "Terjadi kesalahan saat memperbarui data konten.",
            values: values
        }
    }

    redirect("/admin/data-konten")
}