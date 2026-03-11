import z from "zod"

export const CreateBeritaSchema = z.object({
    judul: z.string().min(1, "Judul wajib diisi"),
    isi: z.string().min(1, "Isi berita wajib diisi"),
    gambar: z.instanceof(File, { message: "Gambar wajib diunggah" })
        .refine(
            file => file.size > 0,
            "Gambar wajib diunggah"
        )
        .refine(
            file => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
            "Format gambar harus JPEG, PNG, atau WebP"
        ),
    kategoriId: z.coerce.number().int().positive("Pilih kategori yang valid").optional(),
})

export const UpdateBeritaSchema = z.object({
    id: z.coerce.number().int().positive(),
    judul: z.string().min(1, "Judul wajib diisi"),
    isi: z.string().min(1, "Isi berita wajib diisi"),
    gambar: z.preprocess(
        value => {
            // File kosong dari input file browser dianggap tidak ada upload baru.
            if (value instanceof File && value.size === 0) return undefined

            return value
        },
        z.instanceof(File)
            .refine(
                file => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
                "Format gambar harus JPEG, PNG, atau WebP"
            )
            .optional()
    ),
    kategoriId: z.coerce.number().int().positive("Pilih kategori yang valid").optional(),
})