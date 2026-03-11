"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { BiSearch, BiX } from "react-icons/bi";
import { Button } from "../ui/button";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
} from "../ui/input-group";
import { useProgress } from "@bprogress/next";

type SearchProps = {
    name?: string;
};

export default function Search({
    name = "search",
}: SearchProps) {
    const formRef = useRef<HTMLFormElement>(null);

    const handleClear = () => {
        setValue("");

        // trigger submit setelah value dikosongkan
        requestAnimationFrame(() => {
            formRef.current?.requestSubmit();
        });
    };

    const router = useRouter();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());

    const [value, setValue] = useState<string>(params.get(name) ?? "");
    const [isPending, startTransition] = useTransition();

    const progress = useProgress()

    useEffect(() => {
        if (isPending) {
            progress.start();
        } else {
            progress.stop();
        }
    }, [isPending])

    function onSearch(formData: FormData) {
        startTransition(() => {
            const search = formData.get(name)?.toString() ?? "";

            if (search) {
                params.set(name, search);
            } else {
                params.delete(name);
            }

            router.push(`?${params.toString()}`);

            setValue(search)
        })
    }

    return (
        <>

            <form
                ref={formRef}
                className="flex gap-3"
                action={onSearch}>
                <InputGroup>
                    <InputGroupInput
                        name={name}
                        defaultValue={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Cari" />

                    <InputGroupAddon>
                        <InputGroupText>
                            <BiSearch />
                        </InputGroupText>
                    </InputGroupAddon>

                    {value && (
                        <InputGroupAddon align="inline-end">
                            <InputGroupButton
                                type="button"
                                onClick={handleClear}>
                                <BiX />
                            </InputGroupButton>
                        </InputGroupAddon>
                    )}
                </InputGroup>

                <Button size="icon" type="submit">
                    <BiSearch />
                </Button>
            </form>
        </>
    );
}
