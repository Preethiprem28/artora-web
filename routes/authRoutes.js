const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const sendRegistrationEmail =
    require("../services/emailService");
const router = express.Router();
router.get("/test", (req, res) => {
    res.send("Auth route is working!");
});
router.post("/register", async (req, res) => {
    try {
        console.log("Registration request received");
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please fill all fields"
            });
        }
        const existingUser = await User.findOne({
            email: email
        });
        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }
        const hashedPassword =
            await bcrypt.hash(password, 10);
        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword
        });
        await newUser.save();
        console.log("User saved successfully");
        try {
            await sendRegistrationEmail(
                email,
                name
            );
            console.log(
                "Registration email sent successfully"
            );
        } catch (emailError) {
            console.log(
                "Email could not be sent:",
                emailError
            );
        }
        res.status(201).json({
            message:
                "Registration successful! Confirmation email sent."
        });
    } catch (error) {
        console.log(
            "Registration error:",
            error
        );
        res.status(500).json({
            message: "Server error"
        });
    }
});
router.post("/login", async (req, res) => {
    try {
        console.log("Login request received");
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter email and password"
            });
        }
        const user = await User.findOne({
            email: email
        });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }
        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );
        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }
        console.log(
            "Login successful:",
            user.email
        );
        res.status(200).json({
            message: "Login successful",
            user: {
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.log(
            "Login error:",
            error
        );
        res.status(500).json({
            message: "Server error"
        });
    }
});
module.exports = router;