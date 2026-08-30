const mongoose = require("mongoose");

const industrySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        industryType: {
            type: String,
            required: true
        },

        location: {
            type: String,
            required: true
        },

        contact: {
            type: String,
            required: true
        },

        description: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Industry", industrySchema);