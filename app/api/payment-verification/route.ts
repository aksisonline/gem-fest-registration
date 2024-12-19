import { NextRequest, NextResponse } from 'next/server'
import { sendTicketEmail } from '@/utils/email'

export async function POST(request: NextRequest) {
  try {
    const { uid, email, name } = await request.json()

    if (!email || !name || !uid) {
      throw new Error('Missing required fields')
    }

    // Send email ticket
    await sendTicketEmail(email, name, uid)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Payment verification failed' 
    }, { status: 500 })
  }
}

