import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  console.log("token", token);
  console.log("jwt", process.env.JWT_SECRET);
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, "hello");
    console.log("decoded", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("err", err.message);
    return res.status(400).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
