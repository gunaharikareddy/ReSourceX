const ResourceRequest = require("../models/ResourceRequest");
const Notification = require("../models/Notification");

const createRequest = async (req, res) => {
    try {
        const request = await ResourceRequest.create(req.body);

        await Notification.create({
            type: "New Request",
            title: "New Resource Request",
            message: `${request.requesterName} submitted a new resource request`,
            request: request._id
        });

        res.status(201).json({
            success: true,
            message: "Resource request created successfully",
            data: request
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getRequests = async (req, res) => {
    try {
        const requests = await ResourceRequest.find()
            .populate("waste")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: requests.length,
            data: requests
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getRequestById = async (req, res) => {
    try {
        const request = await ResourceRequest.findById(req.params.id)
            .populate("waste");

        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Resource request not found"
            });
        }

        res.status(200).json({
            success: true,
            data: request
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateRequestStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!["Pending", "Approved", "Rejected"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status"
            });
        }

        const request = await ResourceRequest.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        ).populate("waste");

        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Resource request not found"
            });
        }

        res.status(200).json({
            success: true,
            message: `Request ${status.toLowerCase()} successfully`,
            data: request
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createRequest,
    getRequests,
    getRequestById,
    updateRequestStatus
};

