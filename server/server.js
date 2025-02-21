import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Databasae connected sucessfully"))
  .catch((err) => console.error(err));
app.listen(port, () => console.log(`app is  running on port ${port}`));
