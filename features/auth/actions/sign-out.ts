'use server'

import { signOut } from '@/lib/auth'

export const signOutAndRedirect = async () => {
  await signOut({
    redirectTo: '/auth/sign-in',
  })
}
