import { useState } from 'react'
import API, { setAuthToken } from '../lib/api'
import { useRouter } from 'next/router'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function submit(e){
    e.preventDefault()
    try {
      const res = await API.post('/api/auth/login', { email, password })
      const { accessToken } = res.data
      localStorage.setItem('accessToken', accessToken)
      setAuthToken(accessToken)
      router.push('/dashboard')
    } catch (err) {
      alert(err?.response?.data?.error || 'Login failed')
    }
  }

  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh'}}>
      <form onSubmit={submit} style={{padding:20,background:'#fff',borderRadius:8,boxShadow:'0 4px 12px rgba(0,0,0,0.08)',width:320}}>
        <h2 style={{marginBottom:12}}>Đăng nhập</h2>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" style={{width:'100%',padding:8,marginBottom:8}} />
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Mật khẩu" style={{width:'100%',padding:8,marginBottom:12}} />
        <button style={{width:'100%',padding:10,background:'#2563eb',color:'#fff',borderRadius:6}}>Đăng nhập</button>
      </form>
    </div>
  )
}
