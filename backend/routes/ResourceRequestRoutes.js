const express = require("express");

const {
    createRequest,
    getRequests,
    getRequestById,
    updateRequestStatus
} = require("../controllers/ResourceRequestController");

const router = express.Router();

router.post("/", createRequest);

router.get("/", getRequests);

router.get("/:id", getRequestById);

router.patch("/:id/status", updateRequestStatus);

module.exports = router;