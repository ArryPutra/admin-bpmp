import z from "zod";

export const CreateDataStatistikSchema = z.object({
    group: z
        .string()
        .min(1, "Group wajib diisi"),

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
    group: z
        .string()
        .min(1, "Group wajib diisi"),

    label: z
        .string()
        .min(1, "Label wajib diisi"),

    value: z
        .string()
        .min(1, "Value wajib diisi"),
})