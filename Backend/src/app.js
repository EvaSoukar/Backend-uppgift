import express from "express";
import productRoutes from "./routes/product.route.js";
import messageRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.route.js";
import orderRoutes from "./routes/order.route.js";
import { errorHandler, notFound } from "./middleware/error.middleware.js";
import cors from "cors";

const app = express();

// const whitelist = ['http://localhost:5173', 'http//localhost:8080']

app.use(cors(
  // {
  // origin: (origin, callback) => {
  //   if(whitelist.indexOf(origin) !== -1) {
  //     callback(null, true)
  //   } else {
  //     callback(new Error('Not allowed by CORS'))
  //   }
  // }
  // }
))

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', 'Content-type, Accept, Authorization, Origin, X-Requested-Width')
//   if(req.method === 'Options') {
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
//   }
//   next()
// })

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/orders', orderRoutes);

app.use(notFound); // Not found
app.use(errorHandler); // Error
export default app;