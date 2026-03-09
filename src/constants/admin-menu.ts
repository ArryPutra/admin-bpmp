import { BiData, BiNews, BiPieChart } from "react-icons/bi";

export const adminListMenu = [
    {
        name: 'Utama',
        menus: [
            {
                name: 'Dashboard',
                icon: BiPieChart,
                url: '/admin/dashboard'
            }
        ]
    },
    {
        name: 'Kelola Konten',
        menus: [
            {
                name: 'Berita',
                icon: BiNews,
                url: '/admin/berita'
            },
            {
                name: 'Data Statistik',
                icon: BiData,
                url: '/admin/data-statistik'
            }
        ]
    }
]

export default adminListMenu