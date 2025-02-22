import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const registerUser = async (req, res) => {
  const {
    firstName,
    lastName,
    role,
    dob,
    gender,
    mobile,
    city,
    state,
    email,
    password,
  } = req.body;
  console.log(
    firstName,
    lastName,
    role,
    dob,
    gender,
    mobile,
    city,
    state,
    email,
    password
  );
  try {
    const userExist = await User.findOne({ email });
    if (userExist)
      return res.status(400).json({ message: "User already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      role,
      dob,
      gender,
      mobile,
      city,
      state,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await User.find({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("user", user, "password", user[0].password);
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credintials" });
    }
    const token = jwt.sign({ id: user._id }, "hello", { expiresIn: "24h" });
    res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    return res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
