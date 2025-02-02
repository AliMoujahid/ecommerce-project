require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const connectDB = require("./config/db.config");
const productRoutes = require("./routes/products");  // Product routes
const authRoutes = require("./routes/auth");  // Authentication routes
const userRoutes = require("./routes/user");  // User routes (profile, etc.)

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(compression());

// Routes
app.use("/api/auth", authRoutes);  // Auth routes (register, login, etc.)
app.use("/api/user", userRoutes);  // User routes (profile, etc.)
app.use("/api/products", productRoutes);  // Product routes

// Connect to Database
connectDB();

// Base route
app.get("/", (req, res) => res.send("E-commerce API Running..."));

// Start Server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
