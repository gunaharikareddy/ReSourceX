import { useState } from "react";

function AddWaste() {
  const [formData, setFormData] = useState({
    wasteType: "",
    quantity: "",
    unit: "kg",
    location: "",
    description: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/wastes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...formData,
            quantity: Number(formData.quantity)
          })
        }
      );

      const data = await response.json();

      if (data.success) {
        setMessage("Waste listing added successfully!");

        setFormData({
          wasteType: "",
          quantity: "",
          unit: "kg",
          location: "",
          description: ""
        });
      } else {
        setMessage("Failed to add waste listing.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Unable to connect to server.");
    }
  };

  return (
    <div className="form-page">
      <h1>List Industrial Waste</h1>

      <p>
        List reusable industrial waste so other businesses
        can discover and use it as a raw material.
      </p>

      <form
        onSubmit={handleSubmit}
        className="industry-form"
      >
        <input
          type="text"
          name="wasteType"
          placeholder="Waste Type"
          value={formData.wasteType}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          min="1"
          required
        />

        <select
          name="unit"
          value={formData.unit}
          onChange={handleChange}
        >
          <option value="kg">Kilograms (kg)</option>
          <option value="ton">Tonnes</option>
          <option value="litre">Litres</option>
          <option value="piece">Pieces</option>
        </select>

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Waste Description"
          value={formData.description}
          onChange={handleChange}
          rows="5"
        />

        <button type="submit">
          List Waste
        </button>
      </form>

      {message && (
        <p className="form-message">
          {message}
        </p>
      )}
    </div>
  );
}

export default AddWaste;