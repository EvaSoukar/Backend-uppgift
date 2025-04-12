import { useState } from "react"
import { FaUser } from 'react-icons/fa'
import { useNavigate } from "react-router"
import { useAuth } from "../contexts/AuthContext"
const AvtarDropdown = () => {

  const [isOpen, setIsOpen] = useState(false)
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <>
      <button onClick={() => setIsOpen(state => !state)} className="rounded-full p-2 bg-teal-900 cursor-pointer">
        <FaUser className="text-yellow-300" />
      </button>
      {
        isOpen && (
          <>
            <div className="inset-0 fixed z-10" onClick={() => setIsOpen(false)}></div>
            <div className="absolute right-0 top-10 text-center bg-yellow-300 px-12 py-12 rounded-b-lg z-20">
              <button onClick={handleLogout} className="bg-orange-400 text-teal-900 font-bold text-lg rounded-3xl px-6 py-2">Logga ut</button>
            </div>
          </>
        )
      }
    </>
  )
}
export default AvtarDropdown