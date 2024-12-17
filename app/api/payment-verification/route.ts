import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { render } from '@react-email/render'
import EventTicket from '@/emails/EventTicket'

export async function POST(request: NextRequest) {
  try {
    const { uid, email, name } = await request.json()

    // Send email ticket
    const emailHtml = await render(EventTicket({ ticketHolder: name, ticketId: uid }))

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT!, 10),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    transporter.sendMail({
      from: 'aseelama@gitam.in',
      to: email,
      subject: 'Your GEM Fest Ticket',
      html: emailHtml,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json({ success: false, error: 'Payment verification failed' }, { status: 500 })
  }
}

