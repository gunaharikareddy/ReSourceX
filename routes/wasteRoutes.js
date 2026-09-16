const express = require("express");

const {
    createWaste,
    getWastes
} = require("../controllers/WasteController");

const router = express.Router();

router.post("/", createWaste);

router.get("/", getWastes);

module.exports = router;