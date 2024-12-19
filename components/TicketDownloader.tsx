'use client'

import { useEffect, useState } from 'react'
import { render } from '@react-email/render'
import EventTicket from '@/emails/EventTicket'

interface TicketDownloaderProps {
  name: string
  uid: string
}

export default function TicketDownloader({ name, uid }: TicketDownloaderProps) {
  const [ticketHtml, setTicketHtml] = useState<string | null>(null)

  useEffect(() => {
    const fetchTicketHtml = async () => {
      const ticketHolder = name || 'Guest'
      const ticketId = uid || '0000'
      const ticketHtml = await render(EventTicket({ ticketHolder, ticketId }))
      setTicketHtml(ticketHtml)
    }
    fetchTicketHtml()
  }, [name, uid])

  const downloadPdf = () => {
    if (!ticketHtml) return

    const element = document.createElement('a')
    const file = new Blob([ticketHtml], { type: 'application/pdf' })
    element.href = URL.createObjectURL(file)
    element.download = 'GEM_Fest_Ticket.pdf'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  if (!ticketHtml) {
    return null
  }

  return (
    <div className="mb-8">
      <div dangerouslySetInnerHTML={{ __html: ticketHtml }} />
      <button 
        onClick={downloadPdf} 
        className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
        aria-label="Download ticket as PDF"
      >
        Download as PDF
      </button>
    </div>
  )
}

