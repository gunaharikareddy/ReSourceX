import { useState } from "react";

function AddIndustry() {
  const [formData, setFormData] = useState({
    name: "",
    industryType: "",
    location: "",
    contact: "",
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
        "http://localhost:5000/api/industries",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (data.success) {
        setMessage("Industry added successfully!");

        setFormData({
          name: "",
          industryType: "",
          location: "",
          contact: "",
          description: ""
        });
      } else {
        setMessage("Failed to add industry.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Unable to connect to server.");
    }
  };

  return (
    <div className="form-page">
      <h1>Add Industry</h1>

      <p>
        Register an industry and its reusable waste resources.
      </p>

      <form onSubmit={handleSubmit} className="industry-form">
        <input
          type="text"
          name="name"
          placeholder="Industry Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="industryType"
          placeholder="Industry Type"
          value={formData.industryType}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={formData.contact}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Industry Description"
          value={formData.description}
          onChange={handleChange}
          rows="5"
        />

        <button type="submit">
          Add Industry
        </button>
      </form>

      {message && <p className="form-message">{message}</p>}
    </div>
  );
}

export default AddIndustry;