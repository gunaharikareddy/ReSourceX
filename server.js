const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const industryRoutes = require("./routes/industryRoutes");
const wasteRoutes = require("./routes/WasteRoutes");
const resourceRequestRoutes = require("./routes/ResourceRequestRoutes");
const matchingRoutes = require("./routes/MatchingRoutes");
const notificationRoutes = require("./routes/NotificationRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/industries", industryRoutes);
app.use("/api/wastes", wasteRoutes);
app.use("/api/requests", resourceRequestRoutes);
app.use("/api/matching", matchingRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to ReSourceX API"
    });
});

const MONGO_URI =
    process.env.MONGO_URI ||
    "mongodb://127.0.0.1:27017/ReSourceX";

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");

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