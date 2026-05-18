import express from "express"; 
import {
    allProduct,
    createProduct,
    deleteProduct
    ,updateProduct } from "../controller/productController.js";

    const router= express.Router();

    router.post("/create",createProduct);
    router.get("/all",allProduct);
    router.put("/update/:id",updateProduct);
    router.delete("/delete/:id",deleteProduct);


export default router;
