import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define the user type without extending Document
export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

// Define the user schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

// Middleware to hash the password before saving
userSchema.pre("save", async function (next) {
  const user = this as any; // Cast `this` to `any` to bypass type checks
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Create the model without extending `Document`
const User = mongoose.model<UserType>("User", userSchema);

export default User;
