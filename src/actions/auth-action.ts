"use server"

import { auth } from "@/lib/auth";
import LoginSchema from "@/schemas/LoginSchema";
import ActionState from "@/types/ActionState";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(
    prevState: ActionState | null,
    formData: FormData
) {
    const validatedFields =
        LoginSchema.safeParse(Object.fromEntries(formData.entries()))

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Gagal login. Periksa kembali inputan Anda.",
            success: false,
        }
    }

    try {
        const login = await auth.api.signInEmail({
            body: {
                email: validatedFields.data.email,
                password: validatedFields.data.password,
            }
        })

        if (!login.user) {
            return {
                success: false,
                message: "Email atau password salah"
            }
        }
    } catch (error) {
        console.error(error)

        return {
            success: false,
            message: "Terjadi kesalahan saat login."
        }
    }

    return redirect("/admin/dashboard")
}

export async function logoutAction() {
    try {
        await auth.api.signOut({
            headers: await headers()
        })
    } catch (error) {
        console.error(error)

        return {
            success: false,
            message: "Terjadi kesalahan saat logout."
        }
    }

    return redirect("/login")
}