import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function Protected() {
  const session = await getServerSession()

  if (!session) {
    redirect('/api/auth/signin')
  }

  // Fetch the todo list for the current user
  const todos = await prisma.todos.findMany({
    where: {
      email: session?.user.email,
    },
  })

  return (
    <div>
      <pre>{JSON.stringify(todos, null, 2)}</pre>
      Protected
    </div>
  )
}
