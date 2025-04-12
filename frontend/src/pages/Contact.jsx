import { useState } from "react"
import axios from "../api/axios"

const Contact = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle')
  const [responseMessage, setResponseMessage] = useState('')
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [messageError, setMessageError] = useState('')

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
  }

  const sendMessage = async ({ name, email, message }) => {
    const res = await axios.post('api/message', {
      name,
      email,
      message
    })
    return res.data
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let valid = true

    if (!name) {
      setNameError('Namn är obligatoriskt!')
      valid = false
    } else {
      setNameError('')
    }

    if (!email) {
      setEmailError('E-postadress är obligatorisk!')
      valid = false
    } else if (!validateEmail(email)) {
      setEmailError('Ogiltigt e-postformat!')
      valid = false
    } else {
      setEmailError('')
    }

    if (!message) {
      setMessageError('Meddelande är obligatoriskt!')
      valid = false
    } else {
      setMessageError('')
    }

    if (!valid) return

    try {
      setStatus('loading')
      const result = await sendMessage({ name, email, message })
        
      setStatus('succeeded')
      setResponseMessage(result.message || 'Tack för ditt meddelande!')

      // Clear form
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Axios Error:', error);
      setStatus('failed');
    }

  }

  return (
    <div className="bg-teal-900 h-dvh pt-8 px-4 flex justify-center">
      <div className="min-w-[350px] max-w-[600px] w-full h-fit p-8 rounded-sm space-y-5 bg-neutral-100">
        <h2 className="text-2xl font-bold text-center text-orange-400">Kontakta Oss</h2>
        <form className="space-y3 flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label className="block font-bold text-teal-900" htmlFor="name">Namn: </label>
            <input className="border rounded-sm border-teal-900 w-full" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            {nameError && <p className="text-red-500">{nameError}</p>}
          </div>
          <div>
            <label className="block font-bold text-teal-900" htmlFor="email">Epost: </label>
            <input className="border rounded-sm border-teal-900 w-full" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            {emailError && <p className="text-red-500">{emailError}</p>}
          </div>
          <div>
            <label className="block font-bold text-teal-900" htmlFor="message">Meddelande: </label>
            <textarea className="border rounded-sm border-teal-900 w-full" id="message" value={message} onChange={(e) => setMessage(e.target.value)} required />
            {messageError && <p className="text-red-500">{messageError}</p>}
          </div>
          <button className="bg-yellow-300 text-teal-900 font-bold text-lg rounded-3xl px-6 py-2" type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Skickar...' : 'Skicka meddelande'}
          </button>
        </form>
        {status === 'succeeded' && <p className="text-green-500 text-xl pt-5">{responseMessage}</p>}
        {status === 'failed' && <p className="text-red-500">Något gick fel! Försök igen senare.</p>}
      </div>
    </div>
  )
}
export default Contact