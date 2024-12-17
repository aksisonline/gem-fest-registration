import nodemailer from 'nodemailer'
import { render } from '@react-email/render'
import EventTicket from '@/emails/EventTicket'

export async function sendTicketEmail(email: string, name: string, uid: string) {
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

  await transporter.sendMail({
    from: 'aseelama@gitam.in',
    to: email,
    subject: 'Your GEM Fest Ticket',
    html: emailHtml,
  })
}
