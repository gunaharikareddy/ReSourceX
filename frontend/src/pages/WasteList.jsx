import { useEffect, useMemo, useState } from "react";

function WasteList() {
    const [wastes, setWastes] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [locationFilter, setLocationFilter] = useState("");
    const [category, setCategory] = useState("All");
    const [sortBy, setSortBy] = useState("newest");

    const [selectedWaste, setSelectedWaste] = useState(null);
    const [editingWaste, setEditingWaste] = useState(null);

    const [deleting, setDeleting] = useState(false);
    const [saving, setSaving] = useState(false);

    // Resource request
    const [requestWaste, setRequestWaste] = useState(null);

    const [requestForm, setRequestForm] = useState({
        requesterName: "",
        requesterContact: "",
        requestedQuantity: "",
        message: ""
    });

    const [requesting, setRequesting] = useState(false);


    // =========================
    // GET WASTE LISTINGS
    // =========================

    const fetchWastes = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/wastes"
            );

            const data = await response.json();

            if (data.success) {
                setWastes(data.data);
            }
        } catch (error) {
            console.error(
                "Error fetching waste listings:",
                error
            );
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchWastes();
    }, []);


    // =========================
    // CATEGORIES
    // =========================

    const categories = useMemo(() => {
        const uniqueCategories = [
            ...new Set(
                wastes
                    .map((waste) => waste.wasteType)
                    .filter(Boolean)
            )
        ];

        return ["All", ...uniqueCategories];
    }, [wastes]);


    // =========================
    // FILTER + SORT
    // =========================

    const filteredWastes = useMemo(() => {
        let results = wastes.filter((waste) => {
            const searchText =
                search.toLowerCase().trim();

            const wasteType =
                waste.wasteType?.toLowerCase() || "";

            const description =
                waste.description?.toLowerCase() || "";

            const location =
                waste.location?.toLowerCase() || "";

            const matchesSearch =
                searchText === "" ||
                wasteType.includes(searchText) ||
                description.includes(searchText);

            const matchesLocation =
                locationFilter.trim() === "" ||
                location.includes(
                    locationFilter.toLowerCase().trim()
                );

            const matchesCategory =
                category === "All" ||
                waste.wasteType === category;

            return (
                matchesSearch &&
                matchesLocation &&
                matchesCategory
            );
        });


        results = [...results].sort((a, b) => {
            if (sortBy === "alphabetical") {
                return (
                    a.wasteType || ""
                ).localeCompare(
                    b.wasteType || ""
                );
            }

            if (sortBy === "quantity-high") {
                return (
                    Number(b.quantity) -
                    Number(a.quantity)
                );
            }

            if (sortBy === "quantity-low") {
                return (
                    Number(a.quantity) -
                    Number(b.quantity)
                );
            }

            return (
                new Date(b.createdAt || 0) -
                new Date(a.createdAt || 0)
            );
        });

        return results;
    }, [
        wastes,
        search,
        locationFilter,
        category,
        sortBy
    ]);


    // =========================
    // CLEAR FILTERS
    // =========================

    const clearFilters = () => {
        setSearch("");
        setLocationFilter("");
        setCategory("All");
        setSortBy("newest");
    };


    // =========================
    // DELETE WASTE
    // =========================

    const deleteWaste = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this waste listing?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setDeleting(true);

            const response = await fetch(
                `http://localhost:5000/api/wastes/${id}`,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message ||
                    "Failed to delete listing"
                );
            }

            setWastes((currentWastes) =>
                currentWastes.filter(
                    (waste) =>
                        waste._id !== id
                )
            );

            setSelectedWaste(null);

            alert(
                "Waste listing deleted successfully."
            );

        } catch (error) {
            console.error(
                "Delete error:",
                error
            );

            alert(
                error.message ||
                "Failed to delete waste listing."
            );

        } finally {
            setDeleting(false);
        }
    };


    // =========================
    // UPDATE WASTE
    // =========================

    const updateWaste = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            const response = await fetch(
                `http://localhost:5000/api/wastes/${editingWaste._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({
                        wasteType:
                            editingWaste.wasteType,

                        quantity:
                            Number(
                                editingWaste.quantity
                            ),

                        unit:
                            editingWaste.unit,

                        location:
                            editingWaste.location,

                        description:
                            editingWaste.description
                    })
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message ||
                    "Failed to update listing"
                );
            }

            setWastes((currentWastes) =>
                currentWastes.map((waste) =>
                    waste._id ===
                    editingWaste._id
                        ? data.data
                        : waste
                )
            );

            setEditingWaste(null);
            setSelectedWaste(data.data);

            alert(
                "Waste listing updated successfully."
            );

        } catch (error) {
            console.error(
                "Update error:",
                error
            );

            alert(
                error.message ||
                "Failed to update waste listing."
            );

        } finally {
            setSaving(false);
        }
    };


    // =========================
    // SUBMIT RESOURCE REQUEST
    // =========================

    const submitResourceRequest = async (e) => {
        e.preventDefault();

        if (!requestWaste) {
            return;
        }

        if (
            Number(requestForm.requestedQuantity) <= 0
        ) {
            alert(
                "Requested quantity must be greater than 0."
            );
            return;
        }

        if (
            Number(requestForm.requestedQuantity) >
            Number(requestWaste.quantity)
        ) {
            alert(
                `Only ${requestWaste.quantity} ${requestWaste.unit} is available.`
            );
            return;
        }

        try {
            setRequesting(true);

            const response = await fetch(
                "http://localhost:5000/api/requests",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        waste:
                            requestWaste._id,

                        requesterName:
                            requestForm.requesterName,

                        requesterContact:
                            requestForm.requesterContact,

                        requestedQuantity:
                            Number(
                                requestForm.requestedQuantity
                            ),

                        message:
                            requestForm.message
                    })
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message ||
                    "Failed to submit resource request"
                );
            }

            alert(
                "Resource request submitted successfully!"
            );

            setRequestWaste(null);

            setRequestForm({
                requesterName: "",
                requesterContact: "",
                requestedQuantity: "",
                message: ""
            });

        } catch (error) {
            console.error(
                "Request error:",
                error
            );

            alert(
                error.message ||
                "Failed to submit request."
            );

        } finally {
            setRequesting(false);
        }
    };


    // =========================
    // LOADING
    // =========================

    if (loading) {
        return (
            <section className="waste-marketplace">
                <p className="loading">
                    Loading waste listings...
                </p>
            </section>
        );
    }


    return (
        <section
            className="waste-marketplace"
            id="waste-marketplace"
        >

            {/* =========================
                HEADER
            ========================= */}

            <div className="marketplace-header">

                <p className="marketplace-label">
                    RESOURCE MARKETPLACE
                </p>

                <h2>
                    Waste Marketplace
                </h2>

                <p>
                    Discover reusable industrial waste
                    available from registered industries.
                </p>

            </div>


            {/* =========================
                SEARCH
            ========================= */}

            <div className="waste-search">

                <div className="search-box">

                    <span>🔎</span>

                    <input
                        type="text"
                        placeholder="Search waste type or description..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                    />

                </div>


                <div className="search-box">

                    <span>📍</span>

                    <input
                        type="text"
                        placeholder="Filter by location..."
                        value={locationFilter}
                        onChange={(e) =>
                            setLocationFilter(
                                e.target.value
                            )
                        }
                    />

                </div>

            </div>


            {/* =========================
                FILTERS
            ========================= */}

            <div className="marketplace-controls">

                <div className="control-group">

                    <label>
                        Waste Category
                    </label>

                    <select
                        value={category}
                        onChange={(e) =>
                            setCategory(
                                e.target.value
                            )
                        }
                    >

                        {categories.map(
                            (item) => (
                                <option
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </option>
                            )
                        )}

                    </select>

                </div>


                <div className="control-group">

                    <label>
                        Sort By
                    </label>

                    <select
                        value={sortBy}
                        onChange={(e) =>
                            setSortBy(
                                e.target.value
                            )
                        }
                    >

                        <option value="newest">
                            Newest First
                        </option>

                        <option value="alphabetical">
                            Alphabetical
                        </option>

                        <option value="quantity-high">
                            Quantity: High to Low
                        </option>

                        <option value="quantity-low">
                            Quantity: Low to High
                        </option>

                    </select>

                </div>


                <button
                    className="clear-filter"
                    onClick={clearFilters}
                >
                    Clear Filters
                </button>

            </div>


            {/* =========================
                RESULT COUNT
            ========================= */}

            <div className="results-count">

                Showing{" "}

                <strong>
                    {filteredWastes.length}
                </strong>

                {" "}of{" "}

                <strong>
                    {wastes.length}
                </strong>

                {" "}waste listings

            </div>


            {/* =========================
                WASTE LISTINGS
            ========================= */}

            {wastes.length === 0 ? (

                <div className="empty-waste">

                    <div className="empty-icon">
                        ♻️
                    </div>

                    <h3>
                        No waste listings yet
                    </h3>

                    <p>
                        Add a waste listing to see it here.
                    </p>

                </div>

            ) : filteredWastes.length === 0 ? (

                <div className="empty-waste">

                    <div className="empty-icon">
                        🔎
                    </div>

                    <h3>
                        No matching waste found
                    </h3>

                    <p>
                        Try changing your search,
                        category or location filter.
                    </p>

                    <button
                        onClick={clearFilters}
                    >
                        Clear Filters
                    </button>

                </div>

            ) : (

                <div className="waste-container">

                    {filteredWastes.map(
                        (waste) => (

                            <div
                                className="waste-card"
                                key={waste._id}
                            >

                                <div className="waste-top">

                                    <div className="waste-icon">
                                        ♻️
                                    </div>

                                    <div className="waste-status">
                                        Available
                                    </div>

                                </div>


                                <h3>
                                    {waste.wasteType}
                                </h3>


                                <div className="waste-info">

                                    <div className="info-row">

                                        <span>
                                            Quantity
                                        </span>

                                        <strong>
                                            {waste.quantity}{" "}
                                            {waste.unit}
                                        </strong>

                                    </div>


                                    <div className="info-row">

                                        <span>
                                            Location
                                        </span>

                                        <strong>
                                            {waste.location}
                                        </strong>

                                    </div>

                                </div>


                                <div className="waste-description">

                                    <p>
                                        {waste.description ||
                                            "No description provided."}
                                    </p>

                                </div>


                                <button
                                    className="contact-btn"
                                    onClick={() =>
                                        setSelectedWaste(
                                            waste
                                        )
                                    }
                                >
                                    View Details
                                </button>

                            </div>

                        )
                    )}

                </div>

            )}


            {/* =========================
                DETAILS MODAL
            ========================= */}

            {selectedWaste && (

                <div
                    className="modal-overlay"
                    onClick={() =>
                        setSelectedWaste(null)
                    }
                >

                    <div
                        className="waste-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <button
                            className="modal-close"
                            onClick={() =>
                                setSelectedWaste(null)
                            }
                        >
                            ×
                        </button>


                        <div className="modal-icon">
                            ♻️
                        </div>


                        <h2>
                            {selectedWaste.wasteType}
                        </h2>


                        <div className="modal-details">

                            <p>
                                <span>
                                    Quantity
                                </span>

                                <strong>
                                    {selectedWaste.quantity}{" "}
                                    {selectedWaste.unit}
                                </strong>
                            </p>


                            <p>
                                <span>
                                    Location
                                </span>

                                <strong>
                                    {selectedWaste.location}
                                </strong>
                            </p>


                            <p>
                                <span>
                                    Status
                                </span>

                                <strong>
                                    Available
                                </strong>
                            </p>


                            <p>
                                <span>
                                    Description
                                </span>

                                <strong>
                                    {selectedWaste.description ||
                                        "No description provided."}
                                </strong>
                            </p>


                            {selectedWaste.createdAt && (

                                <p>
                                    <span>
                                        Listed On
                                    </span>

                                    <strong>
                                        {new Date(
                                            selectedWaste.createdAt
                                        ).toLocaleDateString()}
                                    </strong>
                                </p>

                            )}

                        </div>


                        {/* ACTIONS */}

                        <div className="modal-actions">

                            <button
                                className="request-btn"
                                onClick={() => {
                                    setRequestWaste(
                                        selectedWaste
                                    );

                                    setSelectedWaste(
                                        null
                                    );
                                }}
                            >
                                Request Resource
                            </button>


                            <button
                                className="edit-btn"
                                onClick={() => {
                                    setEditingWaste({
                                        ...selectedWaste
                                    });

                                    setSelectedWaste(
                                        null
                                    );
                                }}
                            >
                                Edit Listing
                            </button>


                            <button
                                className="delete-btn"
                                disabled={deleting}
                                onClick={() =>
                                    deleteWaste(
                                        selectedWaste._id
                                    )
                                }
                            >
                                {deleting
                                    ? "Deleting..."
                                    : "Delete Listing"}
                            </button>

                        </div>

                    </div>

                </div>

            )}


            {/* =========================
                EDIT MODAL
            ========================= */}

            {editingWaste && (

                <div
                    className="modal-overlay"
                    onClick={() =>
                        setEditingWaste(null)
                    }
                >

                    <div
                        className="waste-modal edit-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <button
                            className="modal-close"
                            onClick={() =>
                                setEditingWaste(null)
                            }
                        >
                            ×
                        </button>


                        <h2>
                            Edit Waste Listing
                        </h2>


                        <form
                            onSubmit={updateWaste}
                            className="edit-form"
                        >

                            <label>
                                Waste Type
                            </label>

                            <input
                                type="text"
                                value={
                                    editingWaste.wasteType ||
                                    ""
                                }
                                onChange={(e) =>
                                    setEditingWaste({
                                        ...editingWaste,
                                        wasteType:
                                            e.target.value
                                    })
                                }
                                required
                            />


                            <label>
                                Quantity
                            </label>

                            <input
                                type="number"
                                min="1"
                                value={
                                    editingWaste.quantity ||
                                    ""
                                }
                                onChange={(e) =>
                                    setEditingWaste({
                                        ...editingWaste,
                                        quantity:
                                            e.target.value
                                    })
                                }
                                required
                            />


                            <label>
                                Unit
                            </label>

                            <select
                                value={
                                    editingWaste.unit ||
                                    "kg"
                                }
                                onChange={(e) =>
                                    setEditingWaste({
                                        ...editingWaste,
                                        unit:
                                            e.target.value
                                    })
                                }
                            >

                                <option value="kg">
                                    Kilograms (kg)
                                </option>

                                <option value="tonnes">
                                    Tonnes
                                </option>

                                <option value="litres">
                                    Litres
                                </option>

                                <option value="pieces">
                                    Pieces
                                </option>

                            </select>


                            <label>
                                Location
                            </label>

                            <input
                                type="text"
                                value={
                                    editingWaste.location ||
                                    ""
                                }
                                onChange={(e) =>
                                    setEditingWaste({
                                        ...editingWaste,
                                        location:
                                            e.target.value
                                    })
                                }
                                required
                            />


                            <label>
                                Description
                            </label>

                            <textarea
                                rows="4"
                                value={
                                    editingWaste.description ||
                                    ""
                                }
                                onChange={(e) =>
                                    setEditingWaste({
                                        ...editingWaste,
                                        description:
                                            e.target.value
                                    })
                                }
                            />


                            <button
                                type="submit"
                                className="save-btn"
                                disabled={saving}
                            >
                                {saving
                                    ? "Saving..."
                                    : "Save Changes"}
                            </button>

                        </form>

                    </div>

                </div>

            )}


            {/* =========================
                REQUEST RESOURCE MODAL
            ========================= */}

            {requestWaste && (

                <div
                    className="modal-overlay"
                    onClick={() =>
                        setRequestWaste(null)
                    }
                >

                    <div
                        className="waste-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <button
                            className="modal-close"
                            onClick={() =>
                                setRequestWaste(null)
                            }
                        >
                            ×
                        </button>


                        <div className="modal-icon">
                            ♻️
                        </div>


                        <h2>
                            Request Resource
                        </h2>


                        <p>
                            Resource:
                            {" "}
                            <strong>
                                {requestWaste.wasteType}
                            </strong>
                        </p>


                        <p>
                            Available Quantity:
                            {" "}
                            <strong>
                                {requestWaste.quantity}{" "}
                                {requestWaste.unit}
                            </strong>
                        </p>


                        <form
                            className="edit-form"
                            onSubmit={
                                submitResourceRequest
                            }
                        >

                            <label>
                                Your Name
                            </label>

                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={
                                    requestForm.requesterName
                                }
                                onChange={(e) =>
                                    setRequestForm({
                                        ...requestForm,
                                        requesterName:
                                            e.target.value
                                    })
                                }
                                required
                            />


                            <label>
                                Contact Number
                            </label>

                            <input
                                type="tel"
                                placeholder="Enter contact number"
                                value={
                                    requestForm.requesterContact
                                }
                                onChange={(e) =>
                                    setRequestForm({
                                        ...requestForm,
                                        requesterContact:
                                            e.target.value
                                    })
                                }
                                required
                            />


                            <label>
                                Requested Quantity
                            </label>

                            <input
                                type="number"
                                min="1"
                                placeholder="Enter quantity"
                                value={
                                    requestForm.requestedQuantity
                                }
                                onChange={(e) =>
                                    setRequestForm({
                                        ...requestForm,
                                        requestedQuantity:
                                            e.target.value
                                    })
                                }
                                required
                            />


                            <label>
                                Message
                            </label>

                            <textarea
                                rows="4"
                                placeholder="Enter your requirements..."
                                value={
                                    requestForm.message
                                }
                                onChange={(e) =>
                                    setRequestForm({
                                        ...requestForm,
                                        message:
                                            e.target.value
                                    })
                                }
                            />


                            <button
                                type="submit"
                                className="request-btn"
                                disabled={requesting}
                            >
                                {requesting
                                    ? "Submitting..."
                                    : "Submit Request"}
                            </button>

                        </form>

                    </div>

                </div>

            )}

        </section>
    );
}

export default WasteList;
