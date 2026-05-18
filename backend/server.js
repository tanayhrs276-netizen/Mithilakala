import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();

const app = express();
const port = 5002;  

// connect DB
connectDb();

// middleware
app.use(cors({
  origin: "*", // for development
}));
app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/product',productRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/address',addressRoutes);
app.use('/api/wishlist',wishlistRoutes);
app.use('/api/payment',paymentRoutes);

// server start
app.listen(port, () => {
    console.log(`App is running at port ${port}`);
});