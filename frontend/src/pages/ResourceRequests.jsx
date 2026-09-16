
import { useEffect, useState } from "react";

function ResourceRequests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);
    const [matchingId, setMatchingId] = useState(null);
    const [matches, setMatches] = useState({});

    const fetchRequests = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/requests"
            );

            const data = await response.json();

            if (data.success) {
                setRequests(data.data);
            }
        } catch (error) {
            console.error(
                "Error fetching requests:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            setUpdatingId(id);

            const response = await fetch(
                `http://localhost:5000/api/requests/${id}/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        status: status
                    })
                }
            );

            const data = await response.json();

            if (data.success) {
                setRequests((previousRequests) =>
                    previousRequests.map((request) =>
                        request._id === id
                            ? {
                                  ...request,
                                  status: status
                              }
                            : request
                    )
                );
            } else {
                alert(
                    data.message ||
                    "Failed to update request"
                );
            }
        } catch (error) {
            console.error(
                "Error updating request:",
                error
            );

            alert("Unable to update request");
        } finally {
            setUpdatingId(null);
        }
    };

    const findMatches = async (requestId) => {
        try {
            setMatchingId(requestId);

            const response = await fetch(
                `http://localhost:5000/api/matching/${requestId}`
            );

            const data = await response.json();

            if (data.success) {
                setMatches((previousMatches) => ({
                    ...previousMatches,
                    [requestId]: data
                }));
            } else {
                alert(
                    data.message ||
                    "Unable to find matches"
                );
            }
        } catch (error) {
            console.error(
                "Error finding matches:",
                error
            );

            alert(
                "Unable to find matching resources"
            );
        } finally {
            setMatchingId(null);
        }
    };

    if (loading) {
        return (
            <section className="requests-section">
                <h2>Resource Requests</h2>
                <p>Loading requests...</p>
            </section>
        );
    }

    return (
        <section
            className="requests-section"
            id="resource-requests"
        >
            <div className="marketplace-header">
                <p className="marketplace-label">
                    RESOURCE MANAGEMENT
                </p>

                <h2>Resource Requests</h2>

                <p>
                    Manage requests submitted for
                    industrial waste resources.
                </p>
            </div>

            {requests.length === 0 ? (
                <div className="empty-waste">
                    <div className="empty-icon">
                        📩
                    </div>

                    <h3>
                        No resource requests yet
                    </h3>

                    <p>
                        Requests submitted from the
                        marketplace will appear here.
                    </p>
                </div>
            ) : (
                <div className="waste-container">
                    {requests.map((request) => (
                        <div
                            className="waste-card"
                            key={request._id}
                        >
                            <div className="waste-top">
                                <div className="waste-icon">
                                    📩
                                </div>

                                <div className="waste-status">
                                    {request.status ||
                                        "Pending"}
                                </div>
                            </div>

                            <h3>
                                {request.waste
                                    ?.wasteType ||
                                    "Resource"}
                            </h3>

                            <div className="waste-info">
                                <div className="info-row">
                                    <span>
                                        Requester
                                    </span>

                                    <strong>
                                        {
                                            request.requesterName
                                        }
                                    </strong>
                                </div>

                                <div className="info-row">
                                    <span>
                                        Contact
                                    </span>

                                    <strong>
                                        {
                                            request.requesterContact
                                        }
                                    </strong>
                                </div>

                                <div className="info-row">
                                    <span>
                                        Requested
                                    </span>

                                    <strong>
                                        {
                                            request.requestedQuantity
                                        }{" "}
                                        {
                                            request.waste
                                                ?.unit
                                        }
                                    </strong>
                                </div>

                                <div className="info-row">
                                    <span>
                                        Location
                                    </span>

                                    <strong>
                                        {
                                            request.waste
                                                ?.location ||
                                            "N/A"
                                        }
                                    </strong>
                                </div>
                            </div>

                            <div className="waste-description">
                                <p>
                                    <strong>
                                        Message:
                                    </strong>{" "}
                                    {request.message ||
                                        "No message provided."}
                                </p>
                            </div>

                            <p>
                                <strong>
                                    Requested On:
                                </strong>{" "}
                                {request.createdAt
                                    ? new Date(
                                          request.createdAt
                                      ).toLocaleDateString()
                                    : "N/A"}
                            </p>

                            <div className="request-actions">
                                <button
                                    className="match-btn"
                                    onClick={() =>
                                        findMatches(
                                            request._id
                                        )
                                    }
                                    disabled={
                                        matchingId ===
                                        request._id
                                    }
                                >
                                    {matchingId ===
                                    request._id
                                        ? "Finding..."
                                        : "🔍 Find Matches"}
                                </button>

                                {request.status ===
                                    "Pending" ||
                                !request.status ? (
                                    <>
                                        <button
                                            className="approve-btn"
                                            onClick={() =>
                                                updateStatus(
                                                    request._id,
                                                    "Approved"
                                                )
                                            }
                                            disabled={
                                                updatingId ===
                                                request._id
                                            }
                                        >
                                            {updatingId ===
                                            request._id
                                                ? "Updating..."
                                                : "✓ Approve"}
                                        </button>

                                        <button
                                            className="reject-btn"
                                            onClick={() =>
                                                updateStatus(
                                                    request._id,
                                                    "Rejected"
                                                )
                                            }
                                            disabled={
                                                updatingId ===
                                                request._id
                                            }
                                        >
                                            {updatingId ===
                                            request._id
                                                ? "Updating..."
                                                : "✕ Reject"}
                                        </button>
                                    </>
                                ) : (
                                    <div className="request-completed">
                                        {request.status ===
                                        "Approved"
                                            ? "✓ Request Approved"
                                            : "✕ Request Rejected"}
                                    </div>
                                )}
                            </div>

                            {matches[request._id] && (
                                <div className="matches-section">
                                    <div className="matches-header">
                                        <h3>
                                            🔗 Matching Resources
                                        </h3>

                                        <span className="match-count">
                                            {
                                                matches[
                                                    request._id
                                                ].matchCount
                                            }{" "}
                                            Match
                                            {matches[
                                                request._id
                                            ].matchCount !== 1
                                                ? "es"
                                                : ""}
                                        </span>
                                    </div>

                                    {matches[
                                        request._id
                                    ].matches.length ===
                                    0 ? (
                                        <div className="no-match">
                                            <div className="no-match-icon">
                                                🔍
                                            </div>

                                            <h4>
                                                No suitable
                                                matches found
                                            </h4>

                                            <p>
                                                ReSourceX could
                                                not find a
                                                suitable waste
                                                listing for
                                                this request.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="match-container">
                                            {matches[
                                                request._id
                                            ].matches.map(
                                                (
                                                    match,
                                                    index
                                                ) => (
                                                    <div
                                                        className="match-card"
                                                        key={
                                                            match
                                                                .waste
                                                                ._id
                                                        }
                                                    >
                                                        <div className="match-top">
                                                            <div className="match-number">
                                                                #
                                                                {index +
                                                                    1}
                                                            </div>

                                                            <div className="match-score">
                                                                ⭐{" "}
                                                                {
                                                                    match.score
                                                                }
                                                                %
                                                            </div>
                                                        </div>

                                                        <h4>
                                                            ♻️{" "}
                                                            {
                                                                match
                                                                    .waste
                                                                    .wasteType
                                                            }
                                                        </h4>

                                                        <div className="match-info">
                                                            <div className="match-info-row">
                                                                <span>
                                                                    📦
                                                                    Quantity
                                                                </span>

                                                                <strong>
                                                                    {
                                                                        match
                                                                            .waste
                                                                            .quantity
                                                                    }{" "}
                                                                    {
                                                                        match
                                                                            .waste
                                                                            .unit
                                                                    }
                                                                </strong>
                                                            </div>

                                                            <div className="match-info-row">
                                                                <span>
                                                                    📍
                                                                    Location
                                                                </span>

                                                                <strong>
                                                                    {
                                                                        match
                                                                            .waste
                                                                            .location
                                                                    }
                                                                </strong>
                                                            </div>

                                                            <div className="match-info-row">
                                                                <span>
                                                                    📅
                                                                    Available
                                                                    Until
                                                                </span>

                                                                <strong>
                                                                    {match
                                                                        .waste
                                                                        .availableUntil
                                                                        ? new Date(
                                                                              match
                                                                                  .waste
                                                                                  .availableUntil
                                                                          ).toLocaleDateString()
                                                                        : "Not specified"}
                                                                </strong>
                                                            </div>
                                                        </div>

                                                        <div className="match-description">
                                                            <p>
                                                                <strong>
                                                                    Description:
                                                                </strong>{" "}
                                                                {match
                                                                    .waste
                                                                    .description ||
                                                                    "No description provided."}
                                                            </p>
                                                        </div>

                                                        <div className="match-reasons">
                                                            <h5>
                                                                Why
                                                                this
                                                                is a
                                                                match
                                                            </h5>

                                                            <ul>
                                                                {match.reasons.map(
                                                                    (
                                                                        reason,
                                                                        reasonIndex
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                reasonIndex
                                                                            }
                                                                        >
                                                                            ✅{" "}
                                                                            {
                                                                                reason
                                                                            }
                                                                        </li>
                                                                    )
                                                                )}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default ResourceRequests;

