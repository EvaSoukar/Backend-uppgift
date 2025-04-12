import { useState } from "react"
import { MdOutlineShoppingBag } from "react-icons/md"

const ShoppingCart = () => {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(state => !state)}><MdOutlineShoppingBag /></button>
      {isOpen && (
        <div className="absolute right-0 top-10 text-center bg-yellow-300 px-12 py-12 rounded-b-lg z-20">
          <p>Produkter</p>
        </div>
      )}
    </>
  )
}
export default ShoppingCart