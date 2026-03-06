"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useRouter } from '@bprogress/next';
import { BiNews, BiUser } from 'react-icons/bi';

export default function DashboardPage() {
  const metrics = [
    {
      label: 'Total Pengunjung',
      value: '50',
      icon: BiUser,
    },
    {
      label: 'Total Berita',
      value: '148',
      icon: BiNews,
    },
  ];

  const kontenPublikasi = [
    {
      modul: 'Berita',
      jumlahData: 48,
      terakhirDiupdate: '06 Mar 2026, 10:12',
      status: 'Aktif',
    },
  ];

  const router = useRouter()

  return (
    <>
      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <Card key={metric.label} className='gap-3'>
              <CardHeader className='flex-row items-center justify-between space-y-0 pb-0'>
                <Icon className='text-muted-foreground size-6' />
                <CardTitle className='text-sm font-medium'>{metric.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-semibold tracking-tight'>{metric.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className='mt-8'>
        <CardHeader>
          <CardTitle>Konten Publikasi</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className='min-w-190'>
            <TableHeader>
              <TableRow>
                <TableHead>Modul</TableHead>
                <TableHead>Jumlah Data</TableHead>
                <TableHead>Terakhir Diupdate</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kontenPublikasi.map((item) => (
                <TableRow key={item.modul}>
                  <TableCell className='font-medium'>{item.modul}</TableCell>
                  <TableCell className='text-muted-foreground'>{item.jumlahData}</TableCell>
                  <TableCell className='text-muted-foreground'>{item.terakhirDiupdate}</TableCell>
                  <TableCell>
                    <Button size='sm' className='text-xs'
                    onClick={() => {
                      router.push('/admin/publikasi/berita');
                    }}>Kelola</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
