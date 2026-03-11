"use client"

import Search from "@/components/shared/search"
import SelectDropdown from "@/components/shared/select-dropdown"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useRouter } from "@bprogress/next"
import { BiPlus } from "react-icons/bi"
import TableDataKonten from "./components/table-data-konten"

export default function DataKonten_View({
    daftarDataKonten,
    daftarGroup
}: {
    daftarDataKonten: any[]
    daftarGroup: string[]
}) {

    const router = useRouter()

    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between mb-4'>
                    <Button onClick={() => {
                        router.push('/admin/data-konten/create')
                    }}>
                        Tambah Konten <BiPlus />
                    </Button>
                    <Search />
                </div>
                <SelectDropdown
                    label="Group"
                    query={{
                        name: "group",
                        values: [
                            {label: "Semua", value: "__reset__"},
                            ...daftarGroup.map(group => ({ label: group, value: group })),
                        ],
                        defaultValue: "__reset__",
                        deleteValue: "__reset__"
                    }} />
            </CardHeader>
            <CardContent>
                <TableDataKonten
                    daftarDataKonten={daftarDataKonten} />
            </CardContent>
        </Card>
    )
}
