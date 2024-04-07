'use client'

import { signOutAndRedirect } from '../actions/sign-out'

export const SignOutButton = () => {
  const handleLogout = async () => {
    await signOutAndRedirect()
  }

  return (
    <div>
      <button onClick={handleLogout}>退出登录</button>
    </div>
  )
}
