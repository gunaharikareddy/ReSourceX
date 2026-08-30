const mongoose = require("mongoose");

const wasteSchema = new mongoose.Schema(
    {
        wasteType: {
            type: String,
            required: true
        },

        quantity: {
            type: Number,
            required: true
        },

        unit: {
            type: String,
            required: true
        },

        location: {
            type: String,
            required: true
        },

        description: {
            type: String
        },

        availableUntil: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Waste", wasteSchema);