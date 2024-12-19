/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function PaymentComponent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')

  useEffect(() => {
    if (!orderId) {
      router.push('/')
      return
    }

    // Handle payment processing
    const processPayment = async () => {
      try {
        const response = await fetch(`/api/payment-verification?orderId=${orderId}`, {
          method: 'POST',
        })
        const data = await response.json()
        
        if (data.success && data.redirectUrl) {
          window.location.href = data.redirectUrl
        } else {
          router.push('/')
        }
      } catch (error) {
        console.error('Payment processing error:', error)
        router.push('/')
      }
    }

    processPayment()
  }, [orderId, router])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Processing Payment</h1>
      <p>Please wait while we process your registration...</p>
    </div>
  )
}

export default function Payment() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentComponent />
    </Suspense>
  )
}

