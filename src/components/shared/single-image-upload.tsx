"use client";

import { cn } from "@/lib/utils";
import { ImagePlus, Info, UploadCloud, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SingleImageUploadProps {
    name: string;
    id?: string;
    label?: string;
    description?: string;
    error?: string;
    className?: string;
    defaultImageUrl?: string;
    accept?: string;
    maxSizeInMB?: number;
    disabled?: boolean;
    onFileChange?: (file: File | null) => void;
}

function formatFileSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function SingleImageUpload({
    name,
    id,
    label = "Upload Gambar",
    description = "Format: JPG, PNG, WebP. Maksimal 1 file.",
    error,
    className,
    defaultImageUrl,
    accept = "image/jpeg,image/png,image/webp",
    maxSizeInMB = 5,
    disabled,
    onFileChange,
}: SingleImageUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [localError, setLocalError] = useState<string>("");

    const previewUrl = useMemo(() => {
        if (!selectedFile) return defaultImageUrl ?? "";
        return URL.createObjectURL(selectedFile);
    }, [selectedFile, defaultImageUrl]);

    useEffect(() => {
        if (!selectedFile || !previewUrl.startsWith("blob:")) return;

        return () => {
            URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl, selectedFile]);

    const validateFile = (file: File) => {
        const acceptedTypes = accept.split(",").map((item) => item.trim());
        const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

        if (!acceptedTypes.includes(file.type)) {
            return "Format gambar tidak valid. Gunakan JPG, PNG, atau WebP.";
        }

        if (file.size > maxSizeInBytes) {
            return `Ukuran gambar maksimal ${maxSizeInMB} MB.`;
        }

        return "";
    };

    const updateInputFile = (file: File | null) => {
        if (!inputRef.current) return;

        if (!file) {
            inputRef.current.value = "";
            return;
        }

        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        inputRef.current.files = dataTransfer.files;
    };

    useEffect(() => {
        // Browser dapat mengosongkan file input setelah submit gagal,
        // jadi sinkronkan ulang dari state lokal saat masih ada file terpilih.
        if (selectedFile) {
            updateInputFile(selectedFile);
        }
    }, [selectedFile]);

    useEffect(() => {
        const inputEl = inputRef.current;
        const formEl = inputEl?.form;

        if (!formEl) return;

        const handleFormSubmit = () => {
            if (selectedFile) {
                updateInputFile(selectedFile);
            }
        };

        formEl.addEventListener("submit", handleFormSubmit);

        return () => {
            formEl.removeEventListener("submit", handleFormSubmit);
        };
    }, [selectedFile]);

    const handlePickFile = (file: File | null) => {
        setLocalError("");

        if (!file) {
            setSelectedFile(null);
            updateInputFile(null);
            onFileChange?.(null);
            return;
        }

        const message = validateFile(file);

        if (message) {
            setLocalError(message);
            setSelectedFile(null);
            updateInputFile(null);
            onFileChange?.(null);
            return;
        }

        setSelectedFile(file);
        updateInputFile(file);
        onFileChange?.(file);
    };

    const clearFile = () => {
        setLocalError("");
        setSelectedFile(null);
        updateInputFile(null);
        onFileChange?.(null);
    };

    const activeError = localError || (!selectedFile ? error : "");

    return (
        <Card className={cn("overflow-hidden border-dashed", className)}>
            <CardHeader className="gap-1">
                <CardTitle className="text-base">{label}</CardTitle>
                <p className="text-sm text-muted-foreground">{description}</p>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]">
                    <div
                        className={cn(
                            "group relative rounded-xl border-2 border-dashed p-6 transition",
                            disabled
                                ? "cursor-not-allowed opacity-60"
                                : "hover:border-primary/60 hover:bg-primary/5",
                            activeError ? "border-destructive/70" : "border-border"
                        )}
                    >
                        <input
                            ref={inputRef}
                            id={id ?? name}
                            name={name}
                            type="file"
                            className="absolute inset-0 z-10 cursor-pointer opacity-0"
                            accept={accept}
                            multiple={false}
                            disabled={disabled}
                            onChange={(event) => {
                                const file = event.target.files?.[0] ?? null;
                                handlePickFile(file);
                            }}
                        />

                        <div className="pointer-events-none flex flex-col items-center justify-center gap-2 text-center h-full">
                            <UploadCloud className="h-8 w-8 text-muted-foreground transition group-hover:text-primary" />
                            <p className="font-medium">Klik untuk pilih gambar</p>
                            <p className="text-xs text-muted-foreground">Maksimal 1 file • Maks {maxSizeInMB} MB</p>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-xl border bg-muted/20">
                        {previewUrl ? (
                            <img
                                src={previewUrl}
                                alt="Preview gambar"
                                className="h-44 w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-44 w-full items-center justify-center bg-muted/40">
                                <ImagePlus className="h-10 w-10 text-muted-foreground" />
                            </div>
                        )}

                        <div className="space-y-1 border-t px-3 py-2 text-xs text-muted-foreground">
                            <p className="truncate font-medium text-foreground">
                                {selectedFile?.name ?? "Belum ada file dipilih"}
                            </p>
                            <p>{selectedFile ? formatFileSize(selectedFile.size) : "-"}</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                    <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Info className="h-3.5 w-3.5" />
                        Upload baru akan menggantikan gambar sebelumnya.
                    </p>

                    {selectedFile && (
                        <Button type="button" variant="outline" size="sm" onClick={clearFile}>
                            <X className="mr-1 h-4 w-4" />
                            Hapus File
                        </Button>
                    )}
                </div>

                {activeError && (
                    <p className="text-sm font-medium text-destructive">{activeError}</p>
                )}
            </CardContent>
        </Card>
    );
}
