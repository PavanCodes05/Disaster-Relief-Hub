import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDb } from "./Lib/db.js";

import authRoutes from "./Routes/authRoute.js";
import donorRoutes from "./Routes/donorRoute.js";
import affectedRoutes from "./Routes/affectedRoute.js";
import notificationRoutes from "./Routes/notificationRoute.js";
import messageRoutes from "./Routes/messageRoute.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/donor", donorRoutes);
app.use("/api/affected", affectedRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/chats", messageRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDb();
});
