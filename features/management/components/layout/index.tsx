import React from 'react'
import Image from 'next/image'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'
import { SignOutButton } from '@/features/auth/components/signoutbtn/sign-out-btn'
import Icon from '@/components/ui/icons'
import styles from './index.module.scss'
import { KuaiLe } from '@/app/ui/fonts'
import Link from 'next/link'

const NAV_LIST = [
  {
    text: '博客',
    icon: 'BookMinus',
    link: '/management/blog',
  },
  {
    text: '标签',
    icon: 'Tag',
    link: '/management/tag',
  },
  {
    text: '用户',
    icon: 'User',
    link: '/management/user',
  },
]

const CREATE_URL = '/management/blog/create'

export const MGLayout = async ({ children }: React.PropsWithChildren) => {
  const session = await auth()

  if (!session?.user) {
    redirect('api/auth/signin') // 固定路由
  }

  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const dateString = `${year} ${month.toString().padStart(2, '0')} ${day
    .toString()
    .padStart(2, '0')}`

  return (
    <>
      <header className={`${styles.mgHeader} ${KuaiLe.className}`}>
        <p>Youfu Blog</p>
        <span>
          你好，{session?.user.name} {dateString}
        </span>
        <div>
          <Link href={CREATE_URL}>
            <Icon name="NotebookPen" />
            写文章
          </Link>
        </div>
      </header>
      <main className={styles.mgCnt}>
        <div className={styles.mgLeft}>
          {session?.user.image && (
            <div className={styles.mgUser}>
              <Image width={60} height={60} src={session?.user.image} alt="" />
            </div>
          )}
          <div className={styles.mgNav}>
            {NAV_LIST.map((item) => (
              <div key={item.text} className={styles.mgNavItem}>
                <Icon name={item.icon} />
                <Link href={item.link}>{item.text}</Link>
              </div>
            ))}
          </div>
          <footer className={styles.mgLogout}>
            <SignOutButton />
          </footer>
        </div>
        <div className={styles.mgRight}>{children}</div>
      </main>
    </>
  )
}
