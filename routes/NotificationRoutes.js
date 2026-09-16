const express = require("express");

const {
    createNotification,
    getNotifications,
    markNotificationAsRead,
    deleteNotification
} = require("../controllers/NotificationController");

const router = express.Router();

router.post("/", createNotification);

router.get("/", getNotifications);

router.patch("/:id/read", markNotificationAsRead);

router.delete("/:id", deleteNotification);

module.exports = router;