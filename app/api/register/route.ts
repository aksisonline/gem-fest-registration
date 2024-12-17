import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

async function generateUID(text: string): Promise<string> {
  // Call to a separate, secure service
  const response = await fetch('https://your-secure-service.com/generate-uid', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.SECURE_SERVICE_API_KEY}`
    },
    body: JSON.stringify({ text })
  })
  
  if (!response.ok) {
    throw new Error('Failed to generate UID')
  }

  return await response.text()
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phoneNumber = formData.get('phoneNumber') as string
    const isGITAMite = formData.get('isGITAMite') === 'true'
    const gitamID = formData.get('gitamID') as string | null
    const profilePicture = formData.get('profilePicture') as File | null

    // Generate UID using the secure service
    const uid = await generateUID(name + email + phoneNumber)

    // TODO: Save registration data to database

    // TODO: Upload profile picture to storage (e.g., AWS S3)

    // Create Razorpay order
    const orderId = uuidv4() // Replace with actual Razorpay order creation

    return NextResponse.json({ success: true, orderId })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ success: false, error: 'Registration failed' }, { status: 500 })
  }
}

