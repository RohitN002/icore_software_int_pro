import User from "../models/user.js";
import bcryt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT;
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
  } = req.body();
  try {
    const userExist = await UserActivation.findOne({ email });
    if (userExist)
      return res.status(400).json({ message: "User already registerd" });
    const hassedPassword = await bcryt.hash(password, 10);
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
      password: hassedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User Registred Sucessfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body();
  try {
    const user = await User.find({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcryt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credintials" });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "24h" });
    res.status(200).json({ token, user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server Error" });
  }
};
