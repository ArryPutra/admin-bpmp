"use client"

import {
    ChevronDownIcon
} from 'lucide-react'
import React, { useActionState, useEffect, useState, useTransition } from 'react'

import { logoutAction } from '@/actions/auth-action'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage
} from '@/components/ui/breadcrumb'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
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
import adminListMenu from '@/constants/admin-menu'
import { useProgress, useRouter } from '@bprogress/next'
import { usePathname } from 'next/navigation'
import { BiGlobe, BiLogOut } from 'react-icons/bi'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const [today, setToday] = useState('')

    const pathname = usePathname()
    const isMenuPathActive = (menuUrl: string, currentPath: string) => {
        return currentPath === menuUrl || currentPath.startsWith(`${menuUrl}/`)
    }

    const activeSubmenu = adminListMenu
        .flatMap(group => group.menus)
        .find(menu => isMenuPathActive(menu.url, pathname))
        ?.name || ''

    const [logoutState, logoutFormAction, logoutPending] = useActionState(logoutAction, null)

    const progressBar = useProgress()
    const router = useRouter()

    function onClickMenu(menu: { name: string, url: string }) {
        router.push(menu.url)
    }

    const [pending, startTransition] = useTransition()

    function handleLogout() {
        startTransition(() => {
            logoutFormAction()
        })
    }

    useEffect(() => {
        setToday(
            new Date().toLocaleDateString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })
        )
    }, [])

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
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button
                                    id='admin-quick-menu-trigger'
                                    type='button'
                                    className='hover:bg-muted/60 flex w-full items-center justify-between gap-3 rounded-md p-1 text-left transition-colors'
                                >
                                    <div className='flex items-center gap-3'>
                                        <div className='bg-linear-to-br from-primary to-purple-500 text-primary-foreground grid size-8 place-items-center rounded-md'>
                                            <span>A</span>
                                        </div>
                                        <div>
                                            <p className='text-sm font-semibold'>Admin BPMP</p>
                                            <p className='text-muted-foreground text-xs'>Panel Admin</p>
                                        </div>
                                    </div>
                                    <ChevronDownIcon className='text-muted-foreground size-4' />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent id='admin-quick-menu-content' align='start' className='w-56'>
                                <DropdownMenuLabel>Menu Cepat</DropdownMenuLabel>
                                <DropdownMenuItem onSelect={() => window.open('https://www.bpmpkalsel.web.id', '_blank')}>
                                    <BiGlobe className='size-4' />
                                    Web Profil
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    variant='destructive'
                                    onSelect={handleLogout}
                                >
                                    <BiLogOut className='size-4' />
                                    Keluar
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarHeader>

                    <SidebarContent className='p-2'>
                        {
                            adminListMenu.map((group) => (
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
                        <span className='text-muted-foreground text-xs text-center'>Admin BPMP Dashboard v1.0</span>
                    </SidebarFooter>
                </Sidebar>
                <div className='flex min-w-0 flex-1 flex-col w-full'>
                    <header className='bg-card sticky top-0 z-50 border-b'>
                        <div className='mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 sm:px-6'>
                            <div className='flex items-center gap-4'>
                                <SidebarTrigger className='[&_svg]:size-5!' />
                                <Separator orientation='vertical' className='hidden h-4! sm:block' />
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
                    <main className='mx-auto size-full max-w-7xl flex-1 px-4 py-6 sm:px-6 w-full'>
                        {children}
                    </main>
                    <footer className='bg-card h-12 border-t'>
                        <div className='mx-auto size-full max-w-7xl px-4 sm:px-6'>
                            <div className='text-muted-foreground flex h-full items-center justify-end text-xs'>

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
