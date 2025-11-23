import { useState } from 'react'
import API from '../lib/api'
import { useRouter } from 'next/router'

export default function Register(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const router = useRouter()

  async function submit(e){
    e.preventDefault()
    try {
      await API.post('/api/auth/register', { email, password, fullName })
      router.push('/login')
    } catch (err) {
      alert(err?.response?.data?.error || 'Register failed')
    }
  }

  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh'}}>
      <form onSubmit={submit} style={{padding:20,background:'#fff',borderRadius:8,boxShadow:'0 4px 12px rgba(0,0,0,0.08)',width:320}}>
        <h2 style={{marginBottom:12}}>Đăng ký</h2>
        <input value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="Họ tên" style={{width:'100%',padding:8,marginBottom:8}} />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" style={{width:'100%',padding:8,marginBottom:8}} />
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Mật khẩu" style={{width:'100%',padding:8,marginBottom:12}} />
        <button style={{width:'100%',padding:10,background:'#16a34a',color:'#fff',borderRadius:6}}>Tạo tài khoản</button>
      </form>
    </div>
  )
}
