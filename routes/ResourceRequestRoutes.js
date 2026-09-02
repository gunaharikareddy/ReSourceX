const express = require("express");

const {
    createRequest,
    getRequests,
    getRequestById
} = require("../controllers/ResourceRequestController");

const router = express.Router();

// Create resource request
router.post("/", createRequest);

// Get all resource requests
router.get("/", getRequests);

// Get single resource request
router.get("/:id", getRequestById);

module.exports = router;