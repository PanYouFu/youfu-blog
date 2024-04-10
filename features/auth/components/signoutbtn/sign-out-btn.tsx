'use client'

import { signOutAndRedirect } from '../../actions/sign-out'
import Icon from '@/components/ui/icons'
import styles from './index.module.scss'

export const SignOutButton = () => {
  const handleLogout = async () => {
    await signOutAndRedirect()
  }

  return (
    <div className={styles.logout}>
      <Icon name="LogOut" color="#ffffff" />
      <span onClick={handleLogout}>退出登录</span>
    </div>
  )
}
