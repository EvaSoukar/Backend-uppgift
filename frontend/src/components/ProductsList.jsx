import { Link } from "react-router"
import { useProducts } from "../contexts/ProductsContext"
import { useState } from "react"

const ProductsList = () => {
  const { products } = useProducts()
  const [selectedCategory, setSelectedCategory] = useState('')
  const categories = [...new Set(products.map(product => product.category))]
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div>
      <div className="md:flex pb-16 justify-between items-center">
        <h2 className="pb-4 md:pb-0 text-3xl font-bold text-orange-400">Våra glasögon</h2>
        <div className="flex gap-2 items-center">
          <label htmlFor="category" className="text-yellow-300 font-medium">Välj modell:</label>
          <select className="text-teal-900 font-bold uppercase bg-orange-400 rounded-lg px-2 py-2 text-sm" id='category' onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">Alla modeller</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
        {
          filteredProducts.map(product => (
            <Link to={`/products/${product._id}`} className="flex flex-col items-center gap-2 pb-12" key={product._id}>
              <div className="w-[320px] h-[320px] rounded-full overflow-hidden bg-white">
                <img className="w-full h-full object-contain" src={product.images[0]} alt="" />
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-yellow-300">{product.name}</p>
                <p className="text-yellow-300 font-extrabold">{product.price}:-</p>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}
export default ProductsList