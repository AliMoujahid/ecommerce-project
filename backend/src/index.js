require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const connectDB = require("./config/db.config");
const productRoutes = require("./routes/products");  // Move this here, above usage
const authRoutes = require("./routes/auth");

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
app.use("/api/auth", authRoutes);

// Connect Database
connectDB();

// API Routes
app.get("/", (req, res) => res.send("E-commerce API Running..."));
app.use("/api/products", productRoutes);  // Use the product routes here

// Start Server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
