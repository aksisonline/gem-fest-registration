import Link from 'next/link'
import { Suspense } from 'react'
import TicketDownloader from '@/components/TicketDownloader'
import { Button } from '@/components/ui/button'

type SearchParams = {
  name?: string
  uid?: string
}

type PageProps = {
  params: { slug: string }
  searchParams: Promise<SearchParams>
}

export default async function Confirmation({ searchParams }: PageProps) {
  const params = await searchParams
  const name = params.name ?? ''
  const uid = params.uid ?? ''

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-4xl font-bold mb-4 text-black">Registration Successful!</h1>
      <p className="text-lg mb-4">Thank you for registering for GEM Fest 2024.</p>
      <p className="text-lg mb-4">Your ticket has been emailed to you. Please check your inbox (and spam folder) for the ticket.</p>
      <p className="text-lg mb-8">We look forward to seeing you at the event!</p>
      <Suspense fallback={<p>Loading ticket...</p>}>
        <TicketDownloader name={name} uid={uid} />
      </Suspense>
      <Link href="/" passHref>
        <Button className="mt-4">
          Go to Homepage
        </Button>
      </Link>
    </div>
  )
}

