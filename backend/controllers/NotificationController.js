const Notification = require("../models/Notification");

const createNotification = async (req, res) => {
    try {
        const notification = await Notification.create(
            req.body
        );

        res.status(201).json({
            success: true,
            message: "Notification created successfully",
            data: notification
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getNotifications = async (req, res) => {
    try {
        const notifications =
            await Notification.find()
                .populate("request")
                .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: notifications.length,
            data: notifications
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const markNotificationAsRead = async (req, res) => {
    try {
        const notification =
            await Notification.findByIdAndUpdate(
                req.params.id,
                { read: true },
                { new: true }
            );

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Notification marked as read",
            data: notification
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteNotification = async (req, res) => {
    try {
        const notification =
            await Notification.findByIdAndDelete(
                req.params.id
            );

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Notification deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createNotification,
    getNotifications,
    markNotificationAsRead,
    deleteNotification
};