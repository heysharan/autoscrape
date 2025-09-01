import prisma from "@/lib/prisma"

export default async function HomePage() {
    const userId = await prisma.workflow.findFirst()
    return(
        <div>
            {JSON.stringify(userId)}
        </div>
    )
}
