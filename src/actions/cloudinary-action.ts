"use server"

import cloudinary from "@/lib/cloudinary";

export async function uploadImageAction(
    file: File | null,
    folder = "bpmp-berita"
) {

    if (!file || file.size === 0) {
        return { success: false, message: "No file provided" };
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
        return { success: false, error: "File type not allowed. Use JPG, PNG, WEBP, or GIF" };
    }

    if (file.size > 5 * 1024 * 1024) {
        return { success: false, error: "File size exceeds 5MB" };
    }

    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const result = await new Promise<{ secure_url: string; public_id: string }>(
            (resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder,
                        resource_type: "image",
                        transformation: [{ quality: "auto" }, { fetch_format: "auto" }],
                    },
                    (error, result) => {
                        if (error || !result) return reject(error);
                        resolve(result);
                    }
                );
                stream.end(buffer);
            }
        );

        return {
            success: true,
            data: {
                url: result.secure_url,
                public_id: result.public_id,
            },
        };
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        return { success: false, error: "Upload failed. Please try again." };
    }
}

export async function deleteImageAction(
    publicId: string
) {
    try {
        await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
        return { success: true };
    } catch (error) {
        console.error("Cloudinary delete error:", error);
        return { success: false, error: "Failed to delete image. Please try again." };
    }
}