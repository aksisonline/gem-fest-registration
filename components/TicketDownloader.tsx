'use client'

import { useEffect, useState } from 'react'
import { render } from '@react-email/render'
import EventTicket from '@/emails/EventTicket'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

interface TicketDownloaderProps {
  name: string
  uid: string
}

export default function TicketDownloader({ name, uid }: TicketDownloaderProps) {
  const [ticketHtml, setTicketHtml] = useState<string | null>(null)

  useEffect(() => {
    const fetchTicketHtml = async () => {
      try {
        const ticketHolder: string = name || 'Guest'
        const ticketId: string = uid || '0000'

        // Ensure `EventTicket` props are type-checked
        const html: string = await render(
          <EventTicket ticketHolder={ticketHolder} ticketId={ticketId} />
        )
        setTicketHtml(html)
      } catch (error) {
        console.error('Error rendering ticket:', error)
      }
    }
    fetchTicketHtml()
  }, [name, uid])

  const downloadPdf = async () => {
    if (!ticketHtml) return

    const element: HTMLDivElement = document.createElement('div')
    element.style.position = 'absolute'
    element.style.left = '-9999px'
    element.innerHTML = ticketHtml
    document.body.appendChild(element)

    try {
      const canvas = await html2canvas(element)
      const imgData: string = canvas.toDataURL('image/png')
      const doc = new jsPDF()
      const margin: number = 10
      const imgWidth: number = 190
      const imgHeight: number = (canvas.height * imgWidth) / canvas.width

      doc.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight)
      doc.save('GEM_Fest_Ticket.pdf')
    } catch (error) {
      console.error('Error generating PDF:', error)
    } finally {
      document.body.removeChild(element)
    }
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
