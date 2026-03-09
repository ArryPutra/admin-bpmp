"use client"

import { createDataStatistikAction } from '@/actions/data-statistik-action'
import FormDialog from '@/components/shared/dialog/form-dialog'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import ActionState from '@/types/ActionState'
import { useActionState } from 'react'
import { BiPlus } from 'react-icons/bi'
export default function TambahDataStatistik({
    state,
    formAction
}: {
    state: any
    formAction: any
}) {

    return (
        <FormDialog
            actionButtonLabel="Tambah Statistik"
            description='Tambah Data Statistik'
            formAction={formAction}
            formContent={
                <FieldSet>
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
                        <Input name='value' placeholder='Masukkan value' />
                        {
                            state?.errors?.value &&
                            <FieldError>{state.errors.value}</FieldError>
                        }
                    </Field>
                </FieldSet>
            }
            isSuccess={state?.success}
            title='Tambah Data Statistik'
            triggerButton={
                <Button className='w-fit'>
                    Tambah Statistik
                    <BiPlus />
                </Button>
            }
            message={state?.message || ''} />
    )
}
