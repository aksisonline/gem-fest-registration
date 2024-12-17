/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Script from 'next/script'

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function Payment() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')

  useEffect(() => {
    if (!orderId) {
      router.push('/')
      return
    }

    const initializeRazorpay = async () => {
      const res = await fetch('/api/razorpay', {
        method: 'POST',
        body: JSON.stringify({ orderId }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: 'GEM Fest',
        description: 'GEM Fest Registration',
        order_id: data.id,
        handler: async (response: any) => {
          const res = await fetch('/api/payment-verification', {
            method: 'POST',
            body: JSON.stringify(response),
            headers: {
              'Content-Type': 'application/json',
            },
          })
          const data = await res.json()
          if (data.success) {
            router.push('/confirmation')
          } else {
            alert('Payment failed. Please try again.')
          }
        },
        prefill: {
          name: data.name,
          email: data.email,
          contact: data.phoneNumber,
        },
        theme: {
          color: '#F37254',
        },
      }

      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
    }

    initializeRazorpay()
  }, [orderId, router])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Processing Payment</h1>
      <p>Please wait while we redirect you to the payment gateway...</p>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </div>
  )
}

