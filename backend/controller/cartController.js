import cart from "../models/cart.js";

// ✅ ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let Cart = await cart.findOne({ userId });

    if (!Cart) {
      Cart = new cart({
        userId,
        items: [{ productId, quantity: 1 }]
      });
    } else {
      const item = Cart.items.find(
        i => i.productId.toString() === productId
      );

      if (item) {
        item.quantity += 1;
      } else {
        Cart.items.push({ productId, quantity: 1 });
      }
    }

    await Cart.save();

    res.status(200).json({
      message: "Item added to cart",
      cart: Cart
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ✅ REMOVE ITEM
export const removeItem = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const Cart = await cart.findOne({ userId });

    if (!Cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    Cart.items = Cart.items.filter(
      i => i.productId.toString() !== productId
    );

    await Cart.save();

    res.json({
      message: "Item removed",
      cart: Cart
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const Cart = await cart.findOne({ userId })
      .populate("items.productId");

    if (!Cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json({ cart: Cart });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATE QUANTITY

export const updateQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const Cart = await cart.findOne({ userId });

    if (!Cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = Cart.items.find(
      i => i.productId.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    item.quantity = quantity;

    await Cart.save();

    res.json({
      message: "Quantity updated",
      cart: Cart
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};