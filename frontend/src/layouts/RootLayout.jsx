import { Outlet } from "react-router"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useAuth } from "../contexts/AuthContext"
import { RiLoaderFill } from "react-icons/ri"

const RootLayout = () => {

  const { authReady } = useAuth()
  if(!authReady) {
    return (
      <div className="bg-teal-900 min-h-dvh text-yellow-300 flex items-center justify-center">
        <RiLoaderFill className="size-16 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-neutral-100">
      <Navbar />
      <main className="mx-auto min-h-screen bg-teal-900">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
export default RootLayout