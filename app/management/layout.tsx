// 后台管理页面，优先验证是否登陆
import React from 'react'

import { MGLayout } from '@/features/management'

export default function Layout({ children }: React.PropsWithChildren) {
  return <MGLayout>{children}</MGLayout>
}
