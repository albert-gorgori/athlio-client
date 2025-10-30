import AuthForm from '@/components/web/auth-form'
import { SIGN_UP_ROUTE } from '@/lib/constants'
import React from 'react'

const page = () => {
  return (
    <section className="flex-center size-full max-sm:px-6">
        <AuthForm type={SIGN_UP_ROUTE} />
    </section>
  )
}

export default page