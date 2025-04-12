import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";

const ProductsContext = createContext()

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('api/products')
        setProducts(res.data)
      } catch (err) {
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const value = {
    products,
    loading,
    error
  }
  
  return (
    <ProductsContext.Provider value={value}>
      { children }
    </ProductsContext.Provider>
  )
}

export const useProducts = () => useContext(ProductsContext)