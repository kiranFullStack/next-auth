import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1>Next Auth Starter</h1>
      <h2>Added Github as signin</h2>
      <Link href='/api/auth/signin'>Signin </Link>
    </main>
  )
}
