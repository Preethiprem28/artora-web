const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use(express.static(
    path.join(__dirname, "public")
));
mongoose
    .connect("mongodb://127.0.0.1:27017/artora")
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });
app.get("/", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "public",
            "index.html"
        )
    );
});
app.get("/test", (req, res) => {
    res.send("ARTORA backend is working!");
});
const PORT = 5000;
app.listen(PORT, () => {
    console.log(
        `ARTORA server running at http://localhost:${PORT}`
    );
});