
import Wishlist from "../models/wishlist.js";

// ✅ ADD TO WISHLIST
export const addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({
        userId,
        products: [{ productId }]
      });
    } else {
      const exists = wishlist.products.find(
       p => p.productId.toString() === productId.toString()
      );

      if (exists) {
        return res.status(400).json({ message: "Already in wishlist" });
      }

      wishlist.products.push({ productId });
    }

    await wishlist.save();

    res.json({
      message: "Added to wishlist",
      wishlist
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ GET WISHLIST
export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({
      userId: req.params.userId
    }).populate("products.productId");

    res.json(wishlist);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ REMOVE FROM WISHLIST
export const removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

  wishlist.products = wishlist.products.filter(
  p => p.productId.toString() !== productId.toString()
);

    await wishlist.save();

    res.json({
      message: "Removed from wishlist",
      wishlist
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};