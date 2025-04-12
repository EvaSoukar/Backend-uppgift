import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useAuth } from "../contexts/AuthContext"
import { RiLoaderFill } from "react-icons/ri"

const Register = () => {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { register, rememberUser, toggleRememberUser } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    if(!credentials.name || !credentials.email || !credentials.password || !credentials.repeatPassword) {
      setError('Vänligen fyll i alla fält')
      return
    } else if(credentials.password !== credentials.repeatPassword) {
      setError('Lösenorden stämmer inte överens')
      return
    } else if(credentials.password.length < 6) {
      setError('Lösenorden måste vara minst 6 tecken långa')
      return
    }
    setLoading(true)
    setError('')
    try {
      await register(credentials)
      navigate('/')
    } catch (error) {
      setError(error.response?.data?.message || 'Något gick fel!')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="min-w-[350px] max-w-[600px] w-full p-8 rounded-sm space-y-5 my-16 mx-4 bg-neutral-100">
      <h2 className="text-2xl font-bold text-center text-orange-400">Registrera</h2>
      <form className="space-y3 flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="block font-bold text-teal-900" htmlFor="name">Namn</label>
          <input className="border rounded-sm border-teal-900 w-full" type="text" id="name" onChange={e => setCredentials(state => ({ ...state, [e.target.id]: e.target.value}))} value={credentials.name} />
        </div>
        <div>
          <label className="block font-bold text-teal-900" htmlFor="email">E-post</label>
          <input className="border rounded-sm border-teal-900 w-full" type="email" id="email" onChange={e => setCredentials(state => ({ ...state, [e.target.id]: e.target.value}))} value={credentials.email} />
        </div>
        <div>
          <label className="block font-bold text-teal-900" htmlFor="password">Lösenord</label>
          <input className="border rounded-sm border-teal-900 w-full" type="password" id="password" onChange={e => setCredentials(state => ({ ...state, [e.target.id]: e.target.value}))} value={credentials.password} />
        </div>
        <div>
          <label className="block font-bold text-teal-900" htmlFor="repeatPassord">Upprepa lösenord</label>
          <input className="border rounded-sm border-teal-900 w-full" type="password" id="repeatPassword" onChange={e => setCredentials(state => ({ ...state, [e.target.id]: e.target.value}))} value={credentials.repeatPassword} />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="persist" className="accent-teal-900" checked={rememberUser} onChange={toggleRememberUser} />
          <label htmlFor="persist">Kom ihåg mig</label>
        </div>
        <button disabled={loading} className="bg-yellow-300 text-teal-900 font-bold text-lg rounded-3xl px-6 py-2">{loading ? <span className="flex items-center justify-center gap-1 animate-pulse"><RiLoaderFill className="size-6 animate-spin" /> Loading</span> : 'Registrera'}</button>
      </form>
      <p className="text-red-500 text-center">{error}</p>
      <p className="text-center">Har du redan ett konto? <Link className="underline" to="/login">Logga in</Link></p>
    </div>
  )
}
export default Register