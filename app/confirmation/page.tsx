import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import TicketDownloader from '@/components/TicketDownloader'

interface PageProps {
  searchParams: {
    name?: string
    uid?: string
  }
}

export default function Confirmation({ searchParams }: PageProps) {
  const name = searchParams.name || ''
  const uid = searchParams.uid || ''

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <Image src="/images/success.png" alt="Success" width={150} height={150} className="mx-auto mb-6" priority />
      <h1 className="text-4xl font-bold mb-4 text-green-600">Registration Successful!</h1>
      <p className="text-lg mb-4">Thank you for registering for GEM Fest 2024.</p>
      <p className="text-lg mb-4">Your ticket has been emailed to you. Please check your inbox (and spam folder) for the ticket.</p>
      <p className="text-lg mb-8">We look forward to seeing you at the event!</p>
      <Suspense fallback={<p>Loading ticket...</p>}>
        <TicketDownloader name={name} uid={uid} />
      </Suspense>
      <Link href="/" className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-300">
        Go to Homepage
      </Link>
    </div>
  )
}

