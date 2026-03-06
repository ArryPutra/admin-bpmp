"use client"

import {
    ShieldCheckIcon
} from 'lucide-react'
import React, { useActionState, useEffect, useState } from 'react'

import { logoutAction } from '@/actions/auth-action'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger
} from '@/components/ui/sidebar'
import { Spinner } from '@/components/ui/spinner'
import { useProgress, useRouter } from '@bprogress/next'
import { BiLogOut, BiNews, BiPieChart } from 'react-icons/bi'
import { usePathname } from 'next/navigation'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const today = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })

    const listMenu = [
        {
            name: 'Utama',
            menus: [
                {
                    name: 'Dashboard',
                    icon: BiPieChart,
                    url: '/admin/utama/dashboard'
                }
            ]
        },
        {
            name: 'Publikasi',
            menus: [
                {
                    name: 'Berita',
                    icon: BiNews,
                    url: '/admin/publikasi/berita'
                }
            ]
        }
    ]

    const pathname = usePathname()
    console.log(pathname)
    const activeSubmenu = listMenu.find(group => group.menus.some(menu => menu.url === pathname))?.menus.find(menu => menu.url === pathname)?.name || ''

    const [logoutState, logoutFormAction, logoutPending] = useActionState(logoutAction, null)

    const progressBar = useProgress()
    const router = useRouter()

    function onClickMenu(menu: { name: string, url: string }) {
        router.push(menu.url)
    }

    useEffect(() => {
        if (logoutPending) {
            progressBar.start()
        }

        progressBar.stop()
    }, [logoutPending])

    return (
        <div className='flex min-h-dvh w-full'>
            <SidebarProvider>
                <Sidebar>
                    <SidebarHeader className='border-b p-4'>
                        <div className='flex items-center gap-2'>
                            <div className='bg-primary text-primary-foreground grid size-8 place-items-center rounded-md'>
                                <ShieldCheckIcon className='size-4' />
                            </div>
                            <div>
                                <p className='text-sm font-semibold'>Admin BPMP</p>
                                <p className='text-muted-foreground text-xs'>Control Center</p>
                            </div>
                        </div>
                    </SidebarHeader>

                    <SidebarContent className='p-2'>
                        {
                            listMenu.map((group) => (
                                <SidebarGroup key={group.name}>
                                    <SidebarGroupLabel>{group.name}</SidebarGroupLabel>
                                    <SidebarGroupContent>
                                        <SidebarMenu>
                                            {
                                                group.menus.map((menu) => (
                                                    <SidebarMenuItem key={menu.name}>
                                                        <SidebarMenuButton
                                                            isActive={activeSubmenu === menu.name}
                                                            onClick={() => onClickMenu(menu)}
                                                        >
                                                            <menu.icon className='size-5' />
                                                            <span>{menu.name}</span>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                ))
                                            }
                                        </SidebarMenu>
                                    </SidebarGroupContent>
                                </SidebarGroup>
                            ))
                        }
                    </SidebarContent>

                    <SidebarFooter className='border-t p-4'>
                        <form action={logoutFormAction} className='flex'>
                            <Button variant='destructive' className='w-full'>
                                <BiLogOut /> Keluar {logoutPending && <Spinner />}
                            </Button>
                        </form>
                    </SidebarFooter>
                </Sidebar>
                <div className='flex flex-1 flex-col'>
                    <header className='bg-card sticky top-0 z-50 border-b'>
                        <div className='mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 sm:px-6'>
                            <div className='flex items-center gap-4'>
                                <SidebarTrigger className='[&_svg]:!size-5' />
                                <Separator orientation='vertical' className='hidden !h-4 sm:block' />
                                <Breadcrumb className='hidden sm:block'>
                                    <BreadcrumbList>
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>{activeSubmenu}</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </div>
                        </div>
                    </header>
                    <main className='mx-auto size-full max-w-7xl flex-1 px-4 py-6 sm:px-6'>
                        {children}
                    </main>
                    <footer className='bg-card h-12 border-t'>
                        <div className='mx-auto size-full max-w-7xl px-4 sm:px-6'>
                            <div className='text-muted-foreground flex h-full items-center justify-between text-xs'>
                                <span>Admin BPMP Dashboard v1.0</span>
                                <span>Tanggal hari ini: <span className='font-semibold'>{today}</span></span>
                            </div>
                        </div>
                    </footer>
                </div>
            </SidebarProvider>
        </div>
    )
}

export default AuthLayout
