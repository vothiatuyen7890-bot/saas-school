import Link from 'next/link'
export default function Home(){
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh'}}>
      <div style={{maxWidth:560,padding:24,background:'#fff',borderRadius:8,boxShadow:'0 4px 16px rgba(0,0,0,0.08)'}}>
        <h1 style={{fontSize:24,marginBottom:8}}>Web quản lý điểm của học sinh</h1>
        <p style={{marginBottom:16}}>Ứng dụng SaaS demo — quản lý học sinh, điểm và thống kê.</p>
        <div style={{display:'flex',gap:8}}>
          <Link href="/login"><a style={{padding:'8px 12px',background:'#2563eb',color:'#fff',borderRadius:6}}>Đăng nhập</a></Link>
          <Link href="/register"><a style={{padding:'8px 12px',background:'#e5e7eb',color:'#111',borderRadius:6}}>Đăng ký</a></Link>
        </div>
      </div>
    </div>
  )
}
