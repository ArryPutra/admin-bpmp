"use server"

import prisma from "@/lib/prisma";
import { CreateDataStatistikSchema, UpdateDataStatistikSchema } from "@/schemas/DataStatistik";
import ActionState from "@/types/ActionState";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getAllDataStatistik() {
    return await prisma.dataStatistik.findMany({
        orderBy: {
            createdAt: "asc"
        }
    })
}

export async function getDataStatistikById(id: number) {
    try {
        return await prisma.dataStatistik.findUnique({
            where: { id: id }
        })
    } catch (error) {
        console.error(error)

        return {
            success: false
        }
    }
}

export async function createDataStatistikAction(
    prevState: ActionState | null,
    formData: FormData,
) {
    const validatedFields =
        CreateDataStatistikSchema.safeParse(Object.fromEntries(formData.entries()))

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            values: validatedFields.data,
        }
    }

    try {
        await prisma.dataStatistik.create({
            data: {
                key: validatedFields.data.key,
                label: validatedFields.data.label,
                value: validatedFields.data.value,
            }
        })
    } catch (error) {
        console.error(error)

        return {
            success: false,
            message: "Terjadi kesalahan saat membuat data statistik."
        }
    }

    revalidatePath("/admin/data-statistik")

    return {
        success: true,
        message: "Data statistik berhasil ditambahkan."
    }
}

export async function updateDataStatistikAction(
    id: number,
    prevSatate: ActionState | null,
    formData: FormData,
) {
    const validatedFields =
        UpdateDataStatistikSchema.safeParse(Object.fromEntries(formData.entries()))

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            values: validatedFields.data,
        }
    }

    try {
        await prisma.dataStatistik.update({
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
            message: "Terjadi kesalahan saat mengupdate data statistik."
        }
    }

    redirect("/admin/data-statistik")

    return {
        success: true,
        message: "Data statistik berhasil diupdate."
    }
}