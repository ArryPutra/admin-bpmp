"use client"

import { loginAction } from "@/actions/auth-action";
import { PasswordInput } from "@/components/shared/password-input";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useProgress } from "@bprogress/next";
import Image from "next/image";
import Link from "next/link";
import { useActionState, useEffect } from "react";

export default function LoginPage() {
  return (
    <div className="flex 
    max-md:flex-col-reverse">
      <LeftSection />

      <RightSection />
    </div>
  )
}

function LeftSection() {
  const [state, formAction, pending] = useActionState(loginAction, null);
  const progressBar = useProgress();

  useEffect(() => {
    if (pending) {
      progressBar.start();
      return;
    }

    progressBar.stop();
  }, [pending]);

  return (
    <div className="w-[60%] h-dvh flex items-center justify-center flex-col
    max-md:w-full max-md:h-fit max-md:p-6">
      <div className="w-96
      max-md:w-full">
        <Image
          alt="Logo BPMP Kalsel"
          src='/kemendikdasmen-bpmp.png'
          width={5265}
          height={799}
          className="w-72 max-md:w-60"
        />

        <h1 className="font-bold text-2xl text-blue-600 mt-8">Masuk</h1>
        <h2>Selamat datang, silahkan login</h2>

        <form action={formAction}>
          <FieldSet className="mt-10">
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                name="email"
                type="email"
                placeholder="Masukkan email" />
              {
                state?.errors?.email &&
                <FieldError>{state.errors.email[0]}</FieldError>
              }
            </Field>
            <Field>
              <FieldLabel>Password</FieldLabel>
              <PasswordInput
                name="password"
                placeholder="Masukkan password" />
              {
                state?.errors?.password &&
                <FieldError>{state.errors.password[0]}</FieldError>
              }
            </Field>

            <Button className="mt-2">
              Masuk {pending && <Spinner />}
            </Button>
          </FieldSet>
        </form>

        <div className="flex justify-center mt-4">
          <Link href="https://www.bpmpkalsel.web.id/" target="_blank">
            <p className="text-sm text-gray-500 hover:underline hover:text-primary">Panel Admin Web BPMP Kalsel</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

function RightSection() {
  return (
    <div className="w-[40%] h-dvh
    max-md:w-full max-md:h-36">
      <Image
        alt="Gedung BPMP Kalsel"
        src='/gedung-bpmp.jpg'
        width={2048}
        height={1836}
        className="h-full object-cover object-center w-full" />
    </div>
  )
}