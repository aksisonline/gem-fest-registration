import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { render } from '@react-email/render'
import EventTicket from '@/emails/EventTicket'
import { useEffect, useState } from 'react'

export default function Confirmation() {
  const searchParams = useSearchParams()
  const [ticketHtml, setTicketHtml] = useState<string | null>(null)
  const name = searchParams.get('name')
  const uid = searchParams.get('uid')

  useEffect(() => {
    const fetchTicketHtml = async () => {
      if (name && uid) {
        const ticketHolder = name || 'Guest'
        const ticketId = uid || '0000'
        const ticketHtml = await render(EventTicket({ ticketHolder, ticketId }))
        setTicketHtml(ticketHtml)
      }
    }
    fetchTicketHtml()
  }, [name, uid])

  const downloadPdf = () => {
    const element = document.createElement('a')
    const file = new Blob([ticketHtml!], { type: 'application/pdf' })
    element.href = URL.createObjectURL(file)
    element.download = 'GEM_Fest_Ticket.pdf'
    document.body.appendChild(element)
    element.click()
  }

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <Image src="/images/success.png" alt="Success" width={150} height={150} className="mx-auto mb-6" />
      <h1 className="text-4xl font-bold mb-4 text-green-600">Registration Successful!</h1>
      <p className="text-lg mb-4">Thank you for registering for GEM Fest 2024.</p>
      <p className="text-lg mb-4">Your ticket has been emailed to you. Please check your inbox (and spam folder) for the ticket.</p>
      <p className="text-lg mb-8">We look forward to seeing you at the event!</p>
      {ticketHtml && (
        <div className="mb-8">
          <div dangerouslySetInnerHTML={{ __html: ticketHtml }} />
          <button onClick={downloadPdf} className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300">
            Download as PDF
          </button>
        </div>
      )}
      <Link href="/" legacyBehavior>
        <a className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-300">Go to Homepage</a>
      </Link>
    </div>
  )
}
