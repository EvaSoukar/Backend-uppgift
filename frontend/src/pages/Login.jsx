import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router"
import { useAuth } from "../contexts/AuthContext"
import { RiLoaderFill } from "react-icons/ri"

const Login = () => {

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login, rememberUser, toggleRememberUser } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = async e => {
    e.preventDefault()
    if(!credentials.email || !credentials.password) {
      setError('Vänligen fyll i alla fält')
      return
    }
    setLoading(true)
    setError('')
    try {
      await login(credentials)
      navigate(location.state?.from || '/')
    } catch (error) {
      setError(error.response?.data?.message || 'Något gick fel!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-w-[350px] max-w-[600px] w-full p-8 rounded-sm space-y-5 my-16 mx-4 bg-neutral-100">
      <h2 className="text-2xl font-bold text-center text-orange-400">Logga in</h2>
      <form className="space-y3 flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="block font-bold text-teal-900" htmlFor="email">E-post</label>
          <input className="border rounded-sm border-teal-900 w-full" type="email" id="email" onChange={e => setCredentials(state => ({ ...state, [e.target.id]: e.target.value}))} value={credentials.email} />
        </div>
        <div>
          <label className="block font-bold text-teal-900" htmlFor="password">Lösenord</label>
          <input className="border rounded-sm border-teal-900 w-full" type="password" id="password" onChange={e => setCredentials(state => ({ ...state, [e.target.id]: e.target.value}))} value={credentials.password} />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="persist" className="accent-teal-900" checked={rememberUser} onChange={toggleRememberUser} />
          <label htmlFor="persist">Kom ihåg mig</label>
        </div>
        <button disabled={loading} className="bg-yellow-300 text-teal-900 font-bold text-lg rounded-3xl px-6 py-2">{loading ? <span className="flex items-center justify-center gap-1 animate-pulse"><RiLoaderFill className="size-6 animate-spin" /> Loading</span> : 'Logga in'}</button>
      </form>
      <p className="text-red-500 text-center">{error}</p>
      <p className="text-center">Har du inget konto? <Link className="underline" to="/register">Registrera</Link></p>
    </div>
  )
}
export default Login