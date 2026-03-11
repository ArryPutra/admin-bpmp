"use client"

import FormDialog from '@/components/shared/dialog/form-dialog'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
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
                        <FieldLabel>Group</FieldLabel>
                        <Input name='group' placeholder='Masukkan group' defaultValue={state?.values?.group || ''} />
                        {
                            state?.errors?.group &&
                            <FieldError>{state.errors.group}</FieldError>
                        }
                    </Field>
                    <Field>
                        <FieldLabel>Key</FieldLabel>
                        <Input name='key' placeholder='Masukkan key' defaultValue={state?.values?.key || ''} />
                        {
                            state?.errors?.key &&
                            <FieldError>{state.errors.key}</FieldError>
                        }
                    </Field>
                    <Field>
                        <FieldLabel>Label</FieldLabel>
                        <Input name='label' placeholder='Masukkan label' defaultValue={state?.values?.label || ''} />
                        {
                            state?.errors?.label &&
                            <FieldError>{state.errors.label}</FieldError>
                        }
                    </Field>
                    <Field>
                        <FieldLabel>Value</FieldLabel>
                        <Input name='value' placeholder='Masukkan value' defaultValue={state?.values?.value || ''} />
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
