import type { NextPage } from 'next'
import { KuaiLe } from '@/app/ui/fonts'
import Icon from '@/components/ui/icons'

const Home: NextPage = () => {
  return (
    <main>
      <div className={KuaiLe.className} style={{ fontSize: '48px' }}>
        <span style={{ color: '#034ce0' }}>哟~</span>
        <br />
        <span>稀客呀!~</span>
      </div>
      <div style={{ fontSize: '60px', color: '#034ce0' }}>
        <span className={KuaiLe.className}>Hi~</span> o(*￣▽￣*)ブ
        <Icon name="Home" />
      </div>
    </main>
  )
}

export default Home
