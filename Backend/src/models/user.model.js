import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: trur },
  password: { type: String, required: true }
});
// cryptera lösenord

const User = mongoose.model('User', userSchema);

export default User;