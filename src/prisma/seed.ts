import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { seedDataStatistik } from "./seeds/data-statistik"

async function main() {
    await auth.api.signUpEmail({
        body: {
            name: "Admin",
            email: "admin@gmail.com",
            password: "password123"
        }
    })

    await seedDataStatistik()
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })