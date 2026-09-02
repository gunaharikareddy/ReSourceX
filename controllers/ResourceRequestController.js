const ResourceRequest = require("../models/ResourceRequest");

// Create a new resource request
const createRequest = async (req, res) => {
    try {
        const request = await ResourceRequest.create(req.body);

        res.status(201).json({
            success: true,
            message: "Resource request created successfully",
            data: request
        });
    } catch (error) {
        console.error("Create request error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get all resource requests
const getRequests = async (req, res) => {
    try {
        const requests = await ResourceRequest
            .find()
            .populate("waste");

        res.status(200).json({
            success: true,
            count: requests.length,
            data: requests
        });
    } catch (error) {
        console.error("Get requests error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get one resource request
const getRequestById = async (req, res) => {
    try {
        const request = await ResourceRequest
            .findById(req.params.id)
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
        console.error("Get request error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    createRequest,
    getRequests,
    getRequestById
};