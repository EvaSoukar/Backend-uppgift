import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Providers from './contexts/Providers'
import RootLayout from './layouts/RootLayout'
import AuthLayout from './layouts/AuthLayout'
import PrivateLayout from './layouts/PrivateLayout'
import HomePage from './pages/HomePage'
import ProductDetails from './pages/ProductDetails'
import Login from './pages/Login'
import Register from './pages/Register'
import OrderHistory from './pages/OrderHistory'
import OrderDetails from './pages/OrderDetails'
import Contact from './pages/Contact'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/products/:productId',
        element: <ProductDetails />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: <Login />
          },
          {
            path: 'register',
            element: <Register />
          }
        ]
      },
      {
        element: <PrivateLayout />,
        children: [
          {
            path: 'orderhistory',
            element: <OrderHistory />
          },
          {
            path: 'orderdetails/:orderId',
            element: <OrderDetails />
          }
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>,
)
