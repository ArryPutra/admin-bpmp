import z from "zod";

export const CreateDataStatistikSchema = z.object({
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

export const UpdateDataStatistikSchema = z.object({
    label: z
        .string()
        .min(1, "Label wajib diisi"),

    value: z
        .string()
        .min(1, "Value wajib diisi"),
})