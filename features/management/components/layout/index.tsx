import React from 'react'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'
import { SignOutButton } from '@/features/auth/components/sign-out-btn'

export const MGLayout = async ({ children }: React.PropsWithChildren) => {
  const session = await auth()

  if (!session?.user) {
    redirect('api/auth/signin') // 固定路由
  }

  return (
    <div>
      <SignOutButton />
      {children}
    </div>
  )
}
