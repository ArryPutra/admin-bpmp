import { BiData, BiNews, BiPieChart } from "react-icons/bi";

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
        name: 'Pengaturan',
        menus: [
            {
                name: 'Data Statistik',
                icon: BiData,
                url: '/admin/data-statistik'
            }
        ]
    }
]

export default adminListMenu