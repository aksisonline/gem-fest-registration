/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { sendTicketEmail } from '@/utils/email'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phoneNumber = formData.get('phoneNumber') as string
    const isGITAMite = formData.get('isGITAMite') === 'true'
    const gitamID = formData.get('gitamID') as string | null
    const profilePicture = formData.get('profilePicture') as File | null

    // Generate UID
    const uid = uuidv4()

    // TODO: Save registration data to database

    // Redirect to payment verification
    const origin = request.headers.get('origin')
    const paymentVerificationResponse = await fetch(`${origin}/api/payment-verification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid, email, name }),
    })

    if (!paymentVerificationResponse.ok) {
      throw new Error('Payment verification failed')
    }

    // Send ticket email directly
    await sendTicketEmail(email, name, uid)
    return NextResponse.json({
      success: true,
      redirectUrl: `${origin}/confirmation`
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ success: false, error: 'Registration failed' }, { status: 500 })
  }
}

