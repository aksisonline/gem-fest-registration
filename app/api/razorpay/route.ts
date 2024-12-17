import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json()

    // TODO: Fetch order details from database using orderId

    const options = {
      amount: 30000, // Amount in paise (300 INR)
      currency: 'INR',
      receipt: orderId,
      payment_capture: 1,
    }

    const order = await razorpay.orders.create(options)

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      // TODO: Add name, email, and phoneNumber from the database
    })
  } catch (error) {
    console.error('Razorpay order creation error:', error)
    return NextResponse.json({ error: 'Failed to create Razorpay order' }, { status: 500 })
  }
}

