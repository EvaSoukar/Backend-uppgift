import mongoose from "mongoose";

const messageModel = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  message: { type: String, required: true }
}, { timestamps: true });

const Message = mongoose.model('Message', messageModel);
export default Message;