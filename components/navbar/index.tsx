'use client'
import type { NextPage } from 'next'
import Link from 'next/link'

// import { useState } from 'react'
// import { Button } from 'antd'

import styles from './index.module.scss'
import { navs } from './config'
// import Login from '@/components/login'

const Navbar: NextPage = () => {
  // const [isShowLogin, setIsShowLogin] = useState(false)

  // const handleGotoEditorPage = () => {}

  // const handleLogin = () => {
  //   setIsShowLogin(true)
  // }
  // const handleClose = () => {
  //   setIsShowLogin(false)
  // }

  return (
    <div className={styles.navbar}>
      <section>Youfu-BLOG</section>
      <section>
        {navs?.map((nav) => (
          <Link key={nav.label} href={nav.value}>
            {nav.label}
          </Link>
        ))}
      </section>
      {/* <section className={styles.operationArea}>
        <Button onClick={handleGotoEditorPage}>写文章</Button>
        <Button onClick={handleLogin} type="primary">
          登录
        </Button>
      </section>
      <Login isShow={isShowLogin} onClose={handleClose} /> */}
    </div>
  )
}

export default Navbar
