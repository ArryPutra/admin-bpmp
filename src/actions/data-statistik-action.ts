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
    const values = Object.fromEntries(formData.entries())
    const validatedFields =
        CreateDataStatistikSchema.safeParse(values)

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            values: values,
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
    const values = Object.fromEntries(formData.entries())
    const validatedFields =
        UpdateDataStatistikSchema.safeParse(values)

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            values: values
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
            message: "Terjadi kesalahan saat mengupdate data statistik.",
            values: values
        }
    }

    redirect("/admin/data-statistik")
}