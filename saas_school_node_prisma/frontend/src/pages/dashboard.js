import { useEffect, useState } from 'react'
import API from '../lib/api'

export default function Dashboard(){
  const [students, setStudents] = useState([])

  useEffect(()=>{ fetchStudents() }, [])

  async function fetchStudents(){
    try {
      const res = await API.get('/api/students')
      setStudents(res.data)
    } catch (err) {
      console.error(err)
      setStudents([])
    }
  }

  return (
    <div style={{padding:24}}>
      <h1 style={{fontSize:20,marginBottom:12}}>Dashboard</h1>
      <div>
        {students.length === 0 ? <div>Không có học sinh</div> : students.map(s=>(
          <div key={s.id} style={{padding:12,background:'#fff',borderRadius:8,marginBottom:8}}>
            <div style={{fontWeight:600}}>{s.firstName} {s.lastName}</div>
            <div style={{fontSize:12,color:'#6b7280'}}>Lớp: {s.className || 'Chưa'}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
