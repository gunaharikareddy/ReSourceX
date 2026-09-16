const express = require("express");

const {
    findMatches
} = require("../controllers/MatchingController");

const router = express.Router();

router.get("/:id", findMatches);

module.exports = router;