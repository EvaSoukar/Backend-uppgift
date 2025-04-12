import Hero from "../components/Hero"
import ProductsList from "../components/ProductsList"

const HomePage = () => {
  
  return (
    <div>
      <Hero />
      <div className="px-2 py-24 md:px-0 flex flex-col items-center flex-wrap bg-teal-900">
        <ProductsList />
      </div>

    </div>
  )
}
export default HomePage