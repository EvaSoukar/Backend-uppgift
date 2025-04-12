import { AuthProvider } from "./AuthContext"
import { ProductsProvider } from "./ProductsContext"

const Providers = ({ children }) => {
  return (
    <ProductsProvider>
      <AuthProvider>
        { children }
      </AuthProvider>
    </ProductsProvider>
  )
}
export default Providers