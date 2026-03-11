"use client"

import { uploadImageAction } from "@/actions/cloudinary-action"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"
import Image from "@tiptap/extension-image"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
    Bold,
    Heading2,
    Heading3,
    ImagePlus,
    Italic,
    List,
    ListOrdered,
    Quote,
    Redo2,
    RotateCcw,
    Strikethrough,
    Trash2,
    Undo2,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface RichTextEditorProps {
    name: string
    defaultValue?: string
    placeholder?: string
}

function ToolbarButton({
    label,
    active,
    disabled,
    onClick,
    children,
}: {
    label: string
    active?: boolean
    disabled?: boolean
    onClick: () => void
    children: React.ReactNode
}) {
    return (
        <button
            type="button"
            title={label}
            aria-label={label}
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "inline-flex h-8 w-8 items-center justify-center rounded-md border text-muted-foreground transition",
                "hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-40",
                active && "bg-primary text-primary-foreground border-primary"
            )}
        >
            {children}
        </button>
    )
}

export default function RichTextEditor({
    name,
    defaultValue = "",
    placeholder = "Tulis isi berita di sini...",
}: RichTextEditorProps) {
    const [html, setHtml] = useState(defaultValue)
    const [isUploading, setIsUploading] = useState(false)
    const [uploadError, setUploadError] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)

    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({
                HTMLAttributes: {
                    class: "my-4 h-auto max-w-full rounded-md",
                },
            }),
        ],
        content: defaultValue,
        immediatelyRender: false,
        shouldRerenderOnTransaction: true,
        editorProps: {
            attributes: {
                class:
                    "min-h-[220px] p-4 focus:outline-none [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:text-lg [&_h3]:font-semibold [&_blockquote]:border-l-4 [&_blockquote]:pl-4 [&_blockquote]:italic [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_img.ProseMirror-selectednode]:ring-2 [&_img.ProseMirror-selectednode]:ring-primary [&_img.ProseMirror-selectednode]:ring-offset-2 [&_img.ProseMirror-selectednode]:ring-offset-background",
            },
        },
        onUpdate: ({ editor: tiptapEditor }) => {
            setHtml(tiptapEditor.isEmpty ? "" : tiptapEditor.getHTML())
        },
    })

    useEffect(() => {
        if (!editor) return

        const current = editor.getHTML()
        const incoming = defaultValue || ""

        if (current !== incoming) {
            editor.commands.setContent(incoming)
            setHtml(editor.isEmpty ? "" : editor.getHTML())
        }
    }, [defaultValue, editor])

    const isReady = Boolean(editor)
    const isEmpty = html.trim() === ""

    const handleClearFormatting = () => {
        if (!editor) return

        editor.chain().focus().unsetAllMarks().clearNodes().setParagraph().run()
    }

    const handleChooseImage = () => {
        if (isUploading) return
        inputRef.current?.click()
    }

    const handleUploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        event.target.value = ""

        if (!file || !editor) return

        setUploadError("")
        setIsUploading(true)

        const result = await uploadImageAction(file, "bpmp-berita/rich-text")

        if (!result.success || !result.data?.url) {
            setUploadError(result.error ?? "Gagal upload gambar. Coba lagi.")
            setIsUploading(false)
            return
        }

        editor.chain().focus().setImage({ src: result.data.url, alt: file.name }).run()
        setIsUploading(false)
    }

    const handleDeleteSelectedImage = () => {
        if (!editor || !editor.isActive("image")) return

        editor.chain().focus().deleteSelection().run()
    }

    return (
        <div className="overflow-hidden rounded-lg border bg-card">
            <input type="hidden" name={name} value={html} />
            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={handleUploadImage}
            />

            <div className="flex flex-wrap items-center gap-2 border-b bg-muted/40 p-2">
                <ToolbarButton
                    label="Bold"
                    active={editor?.isActive("bold")}
                    disabled={!editor?.can().chain().focus().toggleBold().run()}
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                >
                    <Bold className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Italic"
                    active={editor?.isActive("italic")}
                    disabled={!editor?.can().chain().focus().toggleItalic().run()}
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                >
                    <Italic className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Strikethrough"
                    active={editor?.isActive("strike")}
                    disabled={!editor?.can().chain().focus().toggleStrike().run()}
                    onClick={() => editor?.chain().focus().toggleStrike().run()}
                >
                    <Strikethrough className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Heading 2"
                    active={editor?.isActive("heading", { level: 2 })}
                    disabled={!editor?.can().chain().focus().toggleHeading({ level: 2 }).run()}
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                >
                    <Heading2 className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Heading 3"
                    active={editor?.isActive("heading", { level: 3 })}
                    disabled={!editor?.can().chain().focus().toggleHeading({ level: 3 }).run()}
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                >
                    <Heading3 className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Bullet List"
                    active={editor?.isActive("bulletList")}
                    disabled={!editor?.can().chain().focus().toggleBulletList().run()}
                    onClick={() => editor?.chain().focus().toggleBulletList().run()}
                >
                    <List className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Ordered List"
                    active={editor?.isActive("orderedList")}
                    disabled={!editor?.can().chain().focus().toggleOrderedList().run()}
                    onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                >
                    <ListOrdered className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Blockquote"
                    active={editor?.isActive("blockquote")}
                    disabled={!editor?.can().chain().focus().toggleBlockquote().run()}
                    onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                >
                    <Quote className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    label={isUploading ? "Uploading..." : "Upload Image"}
                    disabled={!editor || isUploading}
                    onClick={handleChooseImage}
                >
                    {isUploading ? <Spinner className="h-4 w-4" /> : <ImagePlus className="h-4 w-4" />}
                </ToolbarButton>
                <ToolbarButton
                    label="Delete Selected Image"
                    disabled={!editor?.isActive("image")}
                    onClick={handleDeleteSelectedImage}
                >
                    <Trash2 className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Undo"
                    disabled={!editor?.can().chain().focus().undo().run()}
                    onClick={() => editor?.chain().focus().undo().run()}
                >
                    <Undo2 className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Redo"
                    disabled={!editor?.can().chain().focus().redo().run()}
                    onClick={() => editor?.chain().focus().redo().run()}
                >
                    <Redo2 className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Clear Format"
                    disabled={!editor}
                    onClick={handleClearFormatting}
                >
                    <RotateCcw className="h-4 w-4" />
                </ToolbarButton>
            </div>

            <div className="relative">
                <EditorContent editor={editor} />

                {isUploading && (
                    <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-center border-b bg-background/95 py-2 text-xs text-muted-foreground">
                        <Spinner className="mr-2 h-4 w-4" />
                        Sedang mengunggah gambar...
                    </div>
                )}

                {isReady && isEmpty && (
                    <div className="pointer-events-none absolute left-4 top-4 text-sm text-muted-foreground">
                        {placeholder}
                    </div>
                )}
            </div>

            {!isReady && (
                <div className="border-t p-3 text-sm text-muted-foreground">{placeholder}</div>
            )}

            {uploadError && <div className="border-t p-3 text-sm text-destructive">{uploadError}</div>}
        </div>
    )
}