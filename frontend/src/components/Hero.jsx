import HeroImage from "../assets/hero-img.png"
import { FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi"
import { RiTwitterXFill } from "react-icons/ri"


const Hero = () => {

  return (
    <div className="max-h-svh bg-neutral-100 relative">
      <img src={HeroImage} alt="" />
      <div className="absolute bottom-2 left-2 md:bottom-6 md:left-6 lg:bottom-16 lg:left-16">
        <h1 className="font-bold text-lg sm:text-4xl text-orange-400 pb-2">EcoShades</h1>
        <ul className="flex gap-2">
          <li><FiFacebook /></li>
          <li><FiInstagram /></li>
          <li><FiYoutube /></li>
          <li><RiTwitterXFill /></li>
        </ul>
      </div>
    </div>
  )
}
export default Hero