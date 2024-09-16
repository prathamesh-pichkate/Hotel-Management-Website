import express, { Response, Request } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import path from "path";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => {
    console.log(
      "mongodb connected successfully! ",
      process.env.MONGODB_CONNECTION_STRING as string
    );
  })
  .catch((err) => console.log("Mongodb connection error!"));

const app = express();
app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(7000, () => {
  console.log("The app is running at port:7000");
});
