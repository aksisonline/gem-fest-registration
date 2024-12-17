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

    // Handle registration response
    const checkRegistration = async () => {
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          body: new FormData() // Add your form data here
        })
        const data = await response.json()
        
        if (data.success && data.redirectUrl) {
          window.location.href = data.redirectUrl
        } else {
          router.push('/')
        }
      } catch (error) {
        console.error('Registration error:', error)
        router.push('/')
      }
    }

    checkRegistration()
  }, [orderId, router])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Processing Payment</h1>
      <p>Please wait while we process your registration...</p>
    </div>
  )
}

