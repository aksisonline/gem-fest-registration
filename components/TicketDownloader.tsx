'use client'

import { useEffect, useState } from 'react'
import { render } from '@react-email/render'
import EventTicket from '@/emails/EventTicket'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

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
      <Card className="shadow-lg">
        <CardContent>
          <div dangerouslySetInnerHTML={{ __html: ticketHtml }} />
        </CardContent>
        <CardFooter className="flex justify-end">
            <Button onClick={downloadPdf} aria-label="Download ticket as PDF" className="mx-auto">
            Download as PDF
            </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

