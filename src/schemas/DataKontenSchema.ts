import z from "zod";

export const CreateDataKontenSchema = z.object({
    group: z
        .string()
        .optional()
        .default("umum"),

    key: z
        .string()
        .min(1, "Key wajib diisi"),

    label: z
        .string()
        .min(1, "Label wajib diisi"),

    value: z
        .string()
        .min(1, "Value wajib diisi"),
})

export const UpdateDataKontenSchema = z.object({
    label: z
        .string()
        .min(1, "Label wajib diisi"),

    value: z
        .string()
        .min(1, "Value wajib diisi"),
})