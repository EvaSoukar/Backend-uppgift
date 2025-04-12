import { useEffect, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import axios from "../api/axios"
import { Link } from "react-router"

const OrderHistory = () => {

  const { token } = useAuth()
  const [ orders, setOrders ] = useState([])

  useEffect(() => {
    const getOrders = async () => {
      const res = await axios.get('api/orders', {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      if(res.status !== 200) return

      setOrders(res.data)
    }
    getOrders()
  }, [])

  return (
    <div className="h-dvh w-dvw bg-neutral-100 px-4 py-8 flex flex-col items-center">
      <h2 className="pb-4 text-3xl font-bold text-orange-400">Orderhistorik</h2>
      {
        !!orders.length
        ? orders.map(order => (
        <div key={order._id} className="rounded-sm border-2 text-teal-900 border-teal-900 w-fit flex flex-col gap-4 p-6">
          <p>Ordernummer: {order._id}</p>
          <p>Skapad: {order.createdAt}</p>
          <p>Totalt pris: {order.totalPrice}</p>
          <Link to={`/orderdetails/${order._id}`} className="bg-yellow-300 text-teal-900 font-bold text-lg rounded-3xl px-6 py-2 text-center">Mer information</Link>
        </div>
      ))
      : (
        <div className="rounded-sm border-2 text-teal-900 border-teal-900 w-fit text-center p-6">Du har inga tidigare beställningar!</div>
      )
    }
    </div>
  )
}
export default OrderHistory