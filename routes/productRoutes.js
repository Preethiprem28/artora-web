const express = require("express");
const Product = require("../models/Product");
const router = express.Router();
router.post("/", async (req, res) => {
    try {
        const {
            productName,
            category,
            price,
            sellerName,
            image,
            description
        } = req.body;
        if (
            !productName ||
            !category ||
            !price ||
            !sellerName ||
            !image ||
            !description
        ) {
            return res.status(400).json({
                message: "Please fill all fields"
            });
        }
        const newProduct = new Product({
            productName: productName,
            category: category,
            price: price,
            sellerName: sellerName,
            image: image,
            description: description
        });
        await newProduct.save();
        res.status(201).json({
            message: "Product added successfully",
            product: newProduct
        });
    } catch (error) {
        console.log(
            "Product creation error:",
            error
        );
        res.status(500).json({
            message: "Server error"
        });
    }
});
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.log(
            "Error fetching products:",
            error
        );
        res.status(500).json({
            message: "Server error"
        });
    }
});
router.put("/:id", async (req, res) => {
    try {
        const updatedProduct =
            await Product.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true
                }
            );
        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct
        });
    } catch (error) {
        console.log(
            "Product update error:",
            error
        );
        res.status(500).json({
            message: "Server error"
        });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const deletedProduct =
            await Product.findByIdAndDelete(
                req.params.id
            );
        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        res.status(200).json({
            message: "Product deleted successfully"
        });
    } catch (error) {
        console.log(
            "Product deletion error:",
            error
        );
        res.status(500).json({
            message: "Server error"
        });
    }
});
module.exports = router;