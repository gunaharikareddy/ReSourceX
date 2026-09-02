const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const resourceRequestRoutes = require("./routes/ResourceRequestRoutes");

const app = express();

// =========================
// MIDDLEWARE
// =========================

app.use(cors());
app.use(express.json());


// =========================
// ROUTES
// =========================

app.use("/api/requests", resourceRequestRoutes);


// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to ReSourceX API"
    });
});


// =========================
// MONGODB CONNECTION
// =========================

const MONGO_URI =
    process.env.MONGO_URI ||
    "mongodb://127.0.0.1:27017/ReSourceX";

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");

        // =========================
        // SERVER
        // =========================

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(
                `ReSourceX server running on port ${PORT}`
            );
        });
    })
    .catch((error) => {
        console.error(
            "MongoDB connection failed:",
            error.message
        );
    });