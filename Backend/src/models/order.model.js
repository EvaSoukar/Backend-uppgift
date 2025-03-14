import mongoose, { mongo } from "mongoose";

const orderProductSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 }
});

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [orderProductSchema],
  totalPrice: { type: Number, required: true, min: 0 },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
const OrderProduct = mongoose.model('OrderProduct', orderProductSchema);

export { Order, OrderProduct };