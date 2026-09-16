import { useEffect, useState } from "react";

function IndustryList() {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchIndustries = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/industries"
      );

      const data = await response.json();

      if (data.success) {
        setIndustries(data.data);
      }
    } catch (error) {
      console.error("Error fetching industries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndustries();
  }, []);

  if (loading) {
    return <p className="loading">Loading industries...</p>;
  }

  return (
    <section className="industry-section">
      <h2>Registered Industries</h2>

      {industries.length === 0 ? (
        <p>No industries available.</p>
      ) : (
        <div className="industry-container">
          {industries.map((industry) => (
            <div className="industry-card" key={industry._id}>
              <h3>{industry.name}</h3>

              <p>
                <strong>Type:</strong>{" "}
                {industry.industryType}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {industry.location}
              </p>

              <p>
                <strong>Contact:</strong>{" "}
                {industry.contact}
              </p>

              <p>{industry.description}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default IndustryList;