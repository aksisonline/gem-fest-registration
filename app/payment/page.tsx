/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function Payment() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')

  useEffect(() => {
    if (!orderId) {
      router.push('/')
      return
    }

    // Simulate payment processing
    setTimeout(() => {
      router.push('/confirmation')
    }, 2000)
  }, [orderId, router])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Processing Payment</h1>
      <p>Please wait while we process your registration...</p>
    </div>
  )
}

