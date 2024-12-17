/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

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

    return NextResponse.json({ success: true, uid })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ success: false, error: 'Registration failed' }, { status: 500 })
  }
}

