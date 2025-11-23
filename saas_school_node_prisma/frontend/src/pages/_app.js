import '../styles/globals.css'
import { useEffect } from 'react'
import { setAuthToken } from '../lib/api'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    setAuthToken(token)
  }, [])
  return <Component {...pageProps} />
}
