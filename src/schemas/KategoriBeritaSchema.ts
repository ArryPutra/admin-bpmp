import z from "zod"

export const CreateKategoriBeritaSchema = z.object({
    nama: z.string().min(1, "Nama kategori wajib diisi"),
})

export const UpdateKategoriBeritaSchema = z.object({
    nama: z.string().min(1, "Nama kategori wajib diisi"),
})
