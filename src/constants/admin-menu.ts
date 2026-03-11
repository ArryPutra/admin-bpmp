import { BiCategory, BiData, BiNews, BiPieChart, BiText } from "react-icons/bi";

type Menu = {
    name: string,
    menus: {
        name: string,
        icon: React.ComponentType,
        url: string
    }[]
}[]

export const adminListMenu: Menu = [
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
        name: "Kelola Berita",
        menus: [
            {
                name: 'Berita',
                icon: BiNews,
                url: '/admin/berita'
            },
            {
                name: 'Kategori Berita',
                icon: BiCategory,
                url: '/admin/kategori-berita'
            },
        ]
    },
    {
        name: 'Kelola Konten',
        menus: [
            {
                name: 'Data Konten',
                icon: BiText,
                url: '/admin/data-konten'
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