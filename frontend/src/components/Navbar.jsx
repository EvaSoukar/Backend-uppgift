import { Link, NavLink } from "react-router"
import Logo from "../assets/logo.svg"
import { MdOutlineShoppingBag } from "react-icons/md"
import { RxHamburgerMenu } from "react-icons/rx"
import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import AvtarDropdown from "./AvtarDropdown"
import ShoppingCart from "./ShoppingCart"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleNav = () => {
    setIsOpen(state => !state)
  }
  
  const { user } = useAuth()

  return (
    <nav className="sticky z-50 top-0 h-12 flex items-center bg-neutral-50 text-teal-900 text-lg">
      <div className="px-2 md:px-0 container m-auto flex items-center justify-between relative">
        <Link to="/"><img className="w-18" src={Logo} alt="" /></Link>
        <ul className="hidden md:flex items-center gap-4">
          <li><NavLink className="[&.active]:font-bold" to="/">Hem</NavLink></li>
          <li><NavLink className="[&.active]:font-bold" to="contact">Kontakta oss</NavLink></li>
          {
            user === null
            ? <>
                <li><NavLink to="/login">Logga in</NavLink></li>
                <li className="cursor-pointer"><ShoppingCart /></li>
            </>

            : (
              <>
                <li><NavLink to="/orderhistory">Orderhistorik</NavLink></li>
                <li className="cursor-pointer"><MdOutlineShoppingBag /></li>
                <AvtarDropdown />
              </>
            )
          }
        </ul>
        <div className="md:hidden flex items-center justify-center gap-2">
          <div className="cursor-pointer"><MdOutlineShoppingBag /></div>
          <button className="cursor-pointer" onClick={handleNav}><RxHamburgerMenu /></button>
          {
            user && (
              <AvtarDropdown />
            )
          }
        </div>
        { isOpen && (
          <>
            <div className="inset-0 fixed z-10" onClick={() => setIsOpen(false)}></div>
            <div className="absolute right-0 top-8 text-center bg-yellow-300 px-12 py-8 rounded-b-lg z-20">
              <ul className="flex flex-col gap-4">
                <li><NavLink onClick={handleNav} className="[&.active]:font-bold" to="/">Hem</NavLink></li>
                <li><NavLink onClick={handleNav} className="[&.active]:font-bold" to="contact">Kontakta oss</NavLink></li>
                {
                  user === null
                  ? <li><NavLink onClick={handleNav} to="/login">Logga in</NavLink></li>
                  : (
                    <>
                      <li><NavLink onClick={handleNav} to="/orderhistory">Orderhistorik</NavLink></li>
                    </>
                  )
                }
              </ul>
            </div>
          </>
        )}
      </div>
    </nav>
  )
}
export default Navbar