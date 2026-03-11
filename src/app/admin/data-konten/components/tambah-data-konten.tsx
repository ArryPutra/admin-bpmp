"use client"

import FormDialog from '@/components/shared/dialog/form-dialog'
import RichTextEditor from '@/components/shared/rich-text-editor'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { BiPlus } from 'react-icons/bi'

export default function TambahDataKonten({
    state,
    formAction
}: {
    state: any
    formAction: any
}) {

    return (
        <FormDialog
            actionButtonLabel="Tambah Konten"
            description='Tambah Data Konten'
            formAction={formAction}
            formContent={
                <FieldSet>
                    <Field>
                        <FieldLabel>Group (opsional)</FieldLabel>
                        <Input name='group' placeholder='Masukkan group' />
                        {
                            state?.errors?.group &&
                            <FieldError>{state.errors.group}</FieldError>
                        }
                    </Field>
                    <Field>
                        <FieldLabel>Key</FieldLabel>
                        <Input name='key' placeholder='Masukkan key' />
                        {
                            state?.errors?.key &&
                            <FieldError>{state.errors.key}</FieldError>
                        }
                    </Field>
                    <Field>
                        <FieldLabel>Label</FieldLabel>
                        <Input name='label' placeholder='Masukkan label' />
                        {
                            state?.errors?.label &&
                            <FieldError>{state.errors.label}</FieldError>
                        }
                    </Field>
                    <Field>
                        <FieldLabel>Value</FieldLabel>
                        <RichTextEditor name='value'/>
                        {
                            state?.errors?.value &&
                            <FieldError>{state.errors.value}</FieldError>
                        }
                    </Field>
                </FieldSet>
            }
            isSuccess={state?.success}
            title='Tambah Data Konten'
            triggerButton={
                <Button className='w-fit'>
                    Tambah Konten
                    <BiPlus />
                </Button>
            }
            message={state?.message || ''} />
    )
}
