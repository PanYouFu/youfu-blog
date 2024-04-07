import { auth } from '@/lib/auth'

const User = async () => {
  const session = await auth()

  return (
    <main>
      <header>用户页面</header>
      <div>
        {session?.user ? <p>{JSON.stringify(session.user)}</p> : <p>未登录</p>}
      </div>
    </main>
  )
}

export default User
