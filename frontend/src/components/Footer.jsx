import Logo from "../assets/logo.svg"
import { FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi"
import { RiTwitterXFill } from "react-icons/ri"
import { NavLink } from "react-router"
const Footer = () => {
  return (
    <footer className="bg-yellow-300 flex flex-col gap-6 items-center py-16">
      <ul className="flex items-center gap-6 text-teal-900">
          <li><NavLink className="[&.active]:font-bold" to="/">Hem</NavLink></li>
          <li><NavLink className="[&.active]:font-bold" to="contact">Kontakta oss</NavLink></li>
          <li><NavLink to="/login">Logga in</NavLink></li>
        </ul>
      <div className="max-w-[200px] flex flex-col items-center gap-4">
        <img src={Logo} alt="" />
        <ul className="flex gap-4 text-teal-900">
          <li><FiFacebook /></li>
          <li><FiInstagram /></li>
          <li><FiYoutube /></li>
          <li><RiTwitterXFill /></li>
        </ul>
      </div>
    </footer>
  )
}
export default Footer