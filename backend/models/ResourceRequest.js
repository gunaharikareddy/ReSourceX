const mongoose = require("mongoose");

const resourceRequestSchema = new mongoose.Schema(
    {
        waste: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Waste",
            required: true
        },

        requesterName: {
            type: String,
            required: true,
            trim: true
        },

        requesterContact: {
            type: String,
            required: true,
            trim: true
        },

        requestedQuantity: {
            type: Number,
            required: true,
            min: 1
        },

        message: {
            type: String,
            trim: true,
            default: ""
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "Approved",
                "Rejected"
            ],
            default: "Pending"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "ResourceRequest",
    resourceRequestSchema
);