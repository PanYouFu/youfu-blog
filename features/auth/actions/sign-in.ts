'use server'
import { signIn } from '@/lib/auth'

export const signInWithGithub = async () => {
  await signIn('github', {
    redirectTo: '/management',
  })
}
