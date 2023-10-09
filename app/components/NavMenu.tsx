'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

function AuthButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <>
        <h1 className='text-6xl'>Welcome, {session.user?.email}</h1>

        <Image
          src={session?.user?.image ?? ''}
          width={100}
          height={100}
          alt='fdf'
        />
        <button onClick={() => signOut()}>|Sign Out|</button>
      </>
    )
  }

  return (
    <>
      Not signed in
      <button onClick={() => signIn()}>signin</button>
    </>
  )
}

export default function NavMenu() {
  return (
    <div>
      <AuthButton />
    </div>
  )
}
