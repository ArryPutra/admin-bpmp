"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from '@bprogress/next';
import { BiNews } from 'react-icons/bi';

export default function DaftarKartuRingkasan({
    dataTotalRingkasan
}: {
    dataTotalRingkasan: {
        totalBerita: number
    }
}) {
    return (
    <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>

        <Card className='gap-3'>
            <CardHeader className='flex-row items-center justify-between space-y-0 pb-0'>
                <BiNews />
                <CardTitle className='text-sm font-medium'>Total Berita</CardTitle>
            </CardHeader>
            <CardContent>
                <div className='text-2xl font-semibold tracking-tight'>{dataTotalRingkasan.totalBerita}</div>
            </CardContent>
        </Card>
        </div>
    )
}
