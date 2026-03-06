import { BiNews, BiPieChart, BiSolidGraduation } from "react-icons/bi";

export const adminListMenu = [
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
        name: 'Konten Publikasi',
        menus: [
            {
                name: 'Berita',
                icon: BiNews,
                url: '/admin/publikasi/berita'
            }
        ]
    },
    {
        name: 'Data Statistik',
        menus: [
            {
                name: 'Sekolah',
                icon: BiSolidGraduation,
                url: '/admin/statistik/sekolah'
            }
        ]
    }
]

export default adminListMenu