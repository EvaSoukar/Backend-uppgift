import { useParams } from "react-router"
import { useAuth } from "../contexts/AuthContext"
import { useEffect, useState } from "react"
import axios from "../api/axios"

const OrderDetails = () => {
  const { token } = useAuth()
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await axios.get(`api/orders/${orderId}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        if (res.status === 200) {
          setOrder(res.data.order)
        }
      } catch (error) {
        console.error("Error fetching order:", error)
      }
    }
    getOrder()
  }, [orderId, token])
  

  return (
    <div className="h-dvh w-dvw bg-neutral-100 px-4 py-8 flex flex-col items-center">
      <h2 className="pb-4 text-3xl font-bold text-orange-400">Orderdetaljer</h2>
      {
        !!order
        ? (
          <div>
            <p className="pb-6 text-lg text-teal-900">Ordernummer: {order._id}</p>
            <div className="flex flex-col gap-8 items-center justify-center">
            {order.products.map(product => (
              <div key={product._id} className="rounded-sm border-2 text-teal-900 border-orange-400 flex items-center justify-center gap-4 p-6">
                <figure className="w-[140px] h-[140px] bg-white rounded-full overflow-hidden flex items-center">
                  <img src={product.productId.images[0]} alt="" />
                </figure>
                <div>
                  <h4 className="font-bold text-lg">{product.productId.name}</h4>
                  <p>Pris: {product.productId.price}:-</p>
                  <p>antal produkter: {product.quantity}</p>
                </div>
              </div>
            ))}
            </div>
            <p className="py-4 text-center font-bold text-teal-900">Totalt pris: <span className="text-orange-400 font-extrabold">{order.totalPrice}:-</span></p>
          </div>
        )
        : (
          <p>Det finns inga produkter här!</p>
        )
      }
    </div>
  );
};

export default OrderDetails;