'use client'
import { ChangeEvent, useState } from 'react'
import styles from './index.module.scss'

interface IProps {
  isShow: boolean;
  onClose: Function;
}

const Login: React.FC<IProps> = (props) => {
  const { isShow = false, onClose } = props
  const [isShowVerifyCode, setIsShowVerifyCode] = useState(false)
  const [form, setForm] = useState({
    phone: '',
    verify: '',
  })

  const handleClose = () => {
    onClose && onClose()
  }

  const handleGetVerifyCode = () => {}

  const handleLogin = () => {
    setIsShowVerifyCode(true)
  }

  const handleOAuthGithub = () => {}

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value,
    })
  }

  return isShow ? (
    <div className={styles.loginArea}>
      <div className={styles.loginBox}>
        <div className={styles.loginTitle}>
          <div>手机号登录</div>
          <div className={styles.close} onClick={handleClose}>
            x
          </div>
        </div>
        <input
          name="phone"
          type="text"
          placeholder="请输入手机号"
          value={form.phone}
          onChange={handleFormChange}
        />
        <div className={styles.verifyCodeArea}>
          <input
            name="verify"
            type="text"
            placeholder="请输入验证码"
            value={form.verify}
            onChange={handleFormChange}
          />
          <span className={styles.verifyCode} onClick={handleGetVerifyCode}>
            {isShowVerifyCode ? <div>倒计时</div> : '获取验证码'}
          </span>
        </div>
        <div className={styles.loginBtn} onClick={handleLogin}>
          登录
        </div>
        <div className={styles.otherLogin} onClick={handleOAuthGithub}>
          使用 Github 登录
        </div>
      </div>
    </div>
  ) : null
}

export default Login
