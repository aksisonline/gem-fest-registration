/* eslint-disable @typescript-eslint/no-unused-vars */


import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  console.log('Received registration request')

  try {
    const formData = await request.formData()
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phoneNumber = formData.get('phoneNumber') as string

    // Validate required fields
    if (!name || !email || !phoneNumber) {
      throw new Error('Missing required fields')
    }

    const isGITAMite = formData.get('isGITAMite') === 'true'
    const gitamID = formData.get('gitamID') as string | null
    const profilePicture = formData.get('profilePicture') as File | null

    console.log('Form data:', { name, email, phoneNumber, isGITAMite, gitamID })

    // Encrypt UID
    const timestamp = new Date().toISOString()
    const encryptionPayload = JSON.stringify({ text: `${email}${name}${phoneNumber}${timestamp}` })
    console.log('Encryption payload:', encryptionPayload)

    const encryptionResponse = await fetch('https://www.aksisonline.com/api/encryptv1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Connection': 'keep-alive'
      },
      body: encryptionPayload,
      cache: 'no-cache'
    })

    if (!encryptionResponse.ok) {
      const errorData = await encryptionResponse.text()
      console.error('Encryption failed:', encryptionResponse.status, errorData)
      throw new Error(`Encryption failed: ${encryptionResponse.status} ${errorData}`)
    }

    const { uid } = await encryptionResponse.json() as { uid: string }
    console.log('Encryption successful, UID:', uid)

    // // Save registration data to database
    // // This is a placeholder for the actual database operation
    // const dbSaveResponse = await fetch('https://your-database-api.com/save-registration', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ name, email, phoneNumber, isGITAMite, gitamID, uid })
    // })

    // if (!dbSaveResponse.ok) {
    //   const errorData = await dbSaveResponse.text()
    //   console.error('Database save failed:', dbSaveResponse.status, errorData)
    //   throw new Error(`Database save failed: ${dbSaveResponse.status} ${errorData}`)
    // }

    // console.log('Registration data saved to database')

    // // Handle profile picture upload
    // if (profilePicture) {
    //   const formData = new FormData()
    //   formData.append('file', profilePicture)
    //   formData.append('uid', uid)

    //   const uploadResponse = await fetch('https://your-upload-api.com/upload-profile-picture', {
    //     method: 'POST',
    //     body: formData
    //   })

    //   if (!uploadResponse.ok) {
    //     console.error('Profile picture upload failed:', uploadResponse.status)
    //     // We don't throw here to allow registration to continue even if picture upload fails
    //   } else {
    //     console.log('Profile picture uploaded successfully')
    //   }
    // }

    // Payment verification
    const origin = request.headers.get('origin')
    if (!origin) {
      throw new Error('Origin header is missing')
    }

    const paymentVerificationResponse = await fetch(`${origin}/api/payment-verification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        uid, 
        email: email.trim(), 
        name: name.trim() 
      }),
    })

    if (!paymentVerificationResponse.ok) {
      const errorData = await paymentVerificationResponse.text()
      console.error('Payment verification failed:', paymentVerificationResponse.status, errorData)
      throw new Error(`Payment verification failed: ${paymentVerificationResponse.status} ${errorData}`)
    }

    console.log('Payment verification successful')

    return NextResponse.json({
      success: true,
      uid,
      redirectUrl: `${origin}/confirmation?name=${encodeURIComponent(name)}&uid=${encodeURIComponent(uid)}`
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Registration failed'
    }, { status: 500 })
  }
}

