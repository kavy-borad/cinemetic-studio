const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const { connectDB } = require("./src/config/database");
const errorHandler = require("./src/middleware/errorHandler");

// Import Routes
const authRoutes = require("./src/routes/authRoutes");
const portfolioRoutes = require("./src/routes/portfolioRoutes");
const serviceRoutes = require("./src/routes/serviceRoutes");
const quotationRoutes = require("./src/routes/quotationRoutes");

// Import models to ensure they are registered with Sequelize
require("./src/models");

const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/quotations", quotationRoutes);

// Health Check
app.get("/api/health", (req, res) => {
    res.json({ success: true, message: "Pixcel Studio Backend is running 🚀" });
});

// Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
};

startServer();
