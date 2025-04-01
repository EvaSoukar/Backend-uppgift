import express from "express";
import productRoutes from "./routes/product.route.js";
import messageRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.route.js";
import orderRoutes from "./routes/order.route.js";
import { errorHandler, notFound } from "./middleware/error.middleware.js";

const app = express();
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/orders', orderRoutes);

app.use(notFound); // Not found
app.use(errorHandler); // Error
export default app;