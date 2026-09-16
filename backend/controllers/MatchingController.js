const Waste = require("../models/Waste");
const ResourceRequest = require("../models/ResourceRequest");

const normalize = (value) => {
    return (value || "").trim().toLowerCase();
};

const getMatchLevel = (score) => {
    if (score >= 90) {
        return "Excellent Match";
    }

    if (score >= 75) {
        return "Good Match";
    }

    return "Potential Match";
};

const findMatches = async (req, res) => {
    try {
        const request = await ResourceRequest.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Resource request not found"
            });
        }

        const requestedWaste = await Waste.findById(request.waste);

        if (!requestedWaste) {
            return res.status(404).json({
                success: false,
                message: "Requested waste resource not found"
            });
        }

        const allWastes = await Waste.find();

        const today = new Date();

        const requestedType = normalize(
            requestedWaste.wasteType
        );

        const requestedLocation = normalize(
            requestedWaste.location
        );

        const requestedUnit = normalize(
            requestedWaste.unit
        );

        const matches = allWastes
            .filter((waste) => {
                if (
                    waste._id.toString() ===
                    requestedWaste._id.toString()
                ) {
                    return false;
                }

                if (
                    waste.availableUntil &&
                    new Date(waste.availableUntil) < today
                ) {
                    return false;
                }

                return true;
            })
            .map((waste) => {
                let score = 0;
                const reasons = [];

                const wasteType = normalize(
                    waste.wasteType
                );

                const location = normalize(
                    waste.location
                );

                const unit = normalize(
                    waste.unit
                );

                if (wasteType === requestedType) {
                    score += 50;
                    reasons.push(
                        "Waste type matches (+50)"
                    );
                } else {
                    reasons.push(
                        "Waste type does not match (+0)"
                    );
                }

                if (unit === requestedUnit) {
                    if (
                        waste.quantity >=
                        request.requestedQuantity
                    ) {
                        score += 25;
                        reasons.push(
                            "Sufficient quantity available (+25)"
                        );
                    } else if (waste.quantity > 0) {
                        score += 10;
                        reasons.push(
                            "Partial quantity available (+10)"
                        );
                    }
                } else {
                    reasons.push(
                        "Unit does not match (+0)"
                    );
                }

                if (location === requestedLocation) {
                    score += 15;
                    reasons.push(
                        "Same location (+15)"
                    );
                } else {
                    reasons.push(
                        "Different location (+0)"
                    );
                }

                if (unit === requestedUnit) {
                    score += 10;
                    reasons.push(
                        "Same unit (+10)"
                    );
                }

                return {
                    waste,
                    score,
                    matchLevel: getMatchLevel(score),
                    reasons
                };
            })
            .filter((match) => match.score >= 60)
            .sort((a, b) => b.score - a.score);

        res.status(200).json({
            success: true,
            requestId: request._id,
            requestedWaste: requestedWaste.wasteType,
            requestedQuantity: request.requestedQuantity,
            requestedUnit: requestedWaste.unit,
            requestedLocation: requestedWaste.location,
            matchCount: matches.length,
            matches
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    findMatches
};