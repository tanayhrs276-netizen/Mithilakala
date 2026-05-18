import express from "express";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist
} from "../controller/wishlistController.js";

const router = express.Router();

// ✅ Add to wishlist
router.post("/add", addToWishlist);

// ✅ Remove from wishlist
router.post("/remove", removeFromWishlist);

// ✅ Get wishlist by userId
router.get("/:userId", getWishlist);

export default router;