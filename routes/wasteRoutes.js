const express = require("express");

const {
    createWaste,
    getWastes,
    updateWaste,
    deleteWaste
} = require("../controllers/WasteController");

const router = express.Router();

router.post("/", createWaste);

router.get("/", getWastes);

router.put("/:id", updateWaste);

router.delete("/:id", deleteWaste);

module.exports = router;