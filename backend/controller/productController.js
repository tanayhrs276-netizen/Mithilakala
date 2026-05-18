import product from "../models/product.js";


// ✅ CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, image } = req.body;

    // 🔴 validation
    if (!name || !description || !price || !category || !image) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    // 🔍 check duplicate
    const existingProduct = await product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists" });
    }

    // ✅ create
    const newProduct = await product.create({
      name,
      description,
      price,
      stock,
      category,
      image,
    });

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });

  } catch (error) {
    console.log(error); // 🔥 debugging
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// ✅ GET ALL PRODUCTS
export const allProduct = async (req, res) => {
  try {
    const products = await product.find().sort({ createdAt: -1 });

    res.status(200).json({
      count: products.length,
      products,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// ✅ GET SINGLE PRODUCT
export const getSingleProduct = async (req, res) => {
  try {
    const singleProduct = await product.findById(req.params.id);

    if (!singleProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(singleProduct);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// ✅ UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// ✅ DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// ✅ CHECK PRODUCT EXISTS (BY NAME)
export const productexist = async (req, res) => {
  try {
    const existingProduct = await product.findOne({ name: req.params.name });

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product exists",
      product: existingProduct,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};