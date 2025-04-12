import { useEffect, useState } from "react"
import axios from "../api/axios"
import { useParams } from "react-router"

const ProductDetails = () => {
  const { productId } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`api/products/${productId}`)
      setProduct(res.data)
    }
    fetchProduct()
  }, [])
  
  return (
    <>
      {product ? (
        <div className="container m-auto p-2">
          <div className="grid grid-cols-2 gap-4">
            {product.images.map((image, index) => (
              <img key={index} className="rounded-lg" src={image} alt="" />
            ))}
          </div>
          <div className="my-6">
            <div className="flex justify-between items-center max-w-[700px]">
              <h2 className="text-2xl font-bold text-orange-400">{product.name}</h2>
              <button className="bg-yellow-300 text-teal-900 font-bold text-lg rounded-3xl px-6 py-2 cursor-pointer">Köp nu</button>
            </div>
            <p className="my-4 max-w-[700px]">{product.description}</p>
            <p className="text-lg">Pris: <span className="font-bold text-orange-400">{product.price}:-</span></p>
          </div>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}
    </>
  )
}
export default ProductDetails