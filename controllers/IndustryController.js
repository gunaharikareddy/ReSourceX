const Industry = require("../models/Industry");

// Add a new industry
const createIndustry = async (req, res) => {
    try {
        const industry = await Industry.create(req.body);

        res.status(201).json({
            success: true,
            message: "Industry created successfully",
            data: industry
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get all industries
const getIndustries = async (req, res) => {
    try {
        const industries = await Industry.find();

        res.status(200).json({
            success: true,
            count: industries.length,
            data: industries
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createIndustry,
    getIndustries
};