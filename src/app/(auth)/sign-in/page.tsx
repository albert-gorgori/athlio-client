import AuthForm from '@/components/AuthForm'
import { SIGN_IN_ROUTE } from '@/lib/constants'
import React from 'react'

const page = () => {
  
  return (
    <section className="flex-center size-full max-sm:px-6">
        <AuthForm type={SIGN_IN_ROUTE} />
    </section>
  )
}

export default page