'use client'

import React from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const StripeProvider = ({children}) => {
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  return (
    <Elements stripe={stripePromise}>
    {children}
    </Elements>
  )
}

export default StripeProvider