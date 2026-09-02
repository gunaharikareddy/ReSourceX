const Waste = require("../models/Waste");

// Add new waste
const createWaste = async (req, res) => {
    try {
        const waste = await Waste.create(req.body);

        res.status(201).json({
            success: true,
            message: "Waste created successfully",
            data: waste
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get all waste
const getWastes = async (req, res) => {
    try {
        const wastes = await Waste.find();

        res.status(200).json({
            success: true,
            count: wastes.length,
            data: wastes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update waste
const updateWaste = async (req, res) => {
    try {
        const updatedWaste =
            await Waste.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!updatedWaste) {
            return res.status(404).json({
                success: false,
                message: "Waste listing not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Waste listing updated successfully",
            data: updatedWaste
        });

    } catch (error) {
        console.error("Update waste error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete waste
const deleteWaste = async (req, res) => {
    try {
        const deletedWaste =
            await Waste.findByIdAndDelete(req.params.id);

        if (!deletedWaste) {
            return res.status(404).json({
                success: false,
                message: "Waste listing not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Waste listing deleted successfully",
            data: deletedWaste
        });

    } catch (error) {
        console.error("Delete waste error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createWaste,
    getWastes,
    updateWaste,
    deleteWaste
};