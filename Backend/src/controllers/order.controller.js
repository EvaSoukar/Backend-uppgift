import Order from "../models/order.model.js";
import asyncHandler from "express-async-handler";
import Product from "../models/product.model.js";

export const createOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { products } = req.body;

  if(!products || products.length === 0) {
    return res.status(400).json({ message: "No products in the order" });
  }

  let totalPrice = 0;
  const orderProducts = [];

  for (const item of products) {
    const product = await Product.findById(item.productId);
    if(!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    totalPrice += product.price * item.quantity;

    const orderProduct = {
      productId: item.productId,
      quantity: item.quantity
    };

    orderProducts.push(orderProduct);
  }

  const order = await Order.create({
    userId,
    products: orderProducts,
    totalPrice
  });

  const populateOrder = await Order.findById(order._id).populate("products.productId").exec();
  res.status(201).json(populateOrder);
});

export const getOrders = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const orders = await Order.find({ userId }).populate("products.productId").exec();
  if(!orders || orders.length === 0) {
    return res.status(404).json({ message: "No orders found for this user" });
  }
  res.status(200).json(orders)
});

export const getOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { orderId } = req.params;
  console.log("User ID:", userId);
  console.log("Order ID:", orderId);

  const order = await Order.findOne({ _id: orderId, userId }).populate("products.productId").exec();
  if(!order) {
    return res.status(404).json({ message: "No order found for this user" });
  }
  res.status(200).json({ order });
});