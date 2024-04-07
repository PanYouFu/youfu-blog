'use client'

import Link from 'next/link'

import { signInWithGithub } from '../actions/sign-in'

export const SignIn = () => {
  const handleSignInWithGithub = async () => {
    await signInWithGithub()
  }
  return (
    <div>
      <header>
        <Link href={'/'}>回首页</Link>
      </header>

      <div>
        <div>
          我是登录页，如果你退出登录也会回到我这里，如果你直接打开管理页面，也会来到我这里
        </div>
        <button onClick={handleSignInWithGithub}>使用 Github 登录</button>
      </div>
    </div>
  )
}
