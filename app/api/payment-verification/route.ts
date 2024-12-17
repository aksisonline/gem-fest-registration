import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'
import { render } from '@react-email/render'
import EventTicket from '@/emails/EventTicket'

const sesClient = new SESClient({ region: process.env.AWS_REGION })

export async function POST(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json()

    const body = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest('hex')

    if (expectedSignature === razorpay_signature) {
      // Payment is verified
      // TODO: Update order status in database

      // Send email ticket
      const { name, email, uid } = await fetchUserDetails(razorpay_order_id)
      const emailHtml = await render(EventTicket({ ticketHolder: name, ticketId: uid }))

      const sendEmailCommand = new SendEmailCommand({
        Destination: {
          ToAddresses: [email],
        },
        Message: {
          Body: {
            Html: { Data: emailHtml },
          },
          Subject: { Data: 'Your GEM Fest Ticket' },
        },
        Source: 'noreply@gemfest.com',
      })

      await sesClient.send(sendEmailCommand)

      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false, error: 'Invalid signature' }, { status: 400 })
    }
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json({ success: false, error: 'Payment verification failed' }, { status: 500 })
  }
}

async function fetchUserDetails(orderId: string) {
  // TODO: Implement fetching user details from database
  return {
    name: 'John Doe',
    email: 'john@example.com',
    uid: 'GEM2024001',
  }
}

