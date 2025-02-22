import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    role: String,
    dob: String,
    gender: String,
    password: String,
    email: { type: String, unique: true },
    mobile: String,
    city: String,
    state: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
