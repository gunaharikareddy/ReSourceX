
import { useEffect, useState } from "react";
import "./App.css";

import AddIndustry from "./pages/AddIndustry";
import IndustryList from "./pages/IndustryList";
import AddWaste from "./pages/AddWaste";
import WasteList from "./pages/WasteList";
import ResourceRequests from "./pages/ResourceRequests";
import Notifications from "./pages/Notifications";

function App() {
  const [industryCount, setIndustryCount] = useState(0);
  const [wasteCount, setWasteCount] = useState(0);

  const [requestCount, setRequestCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);

  const [unreadNotificationCount, setUnreadNotificationCount] =
    useState(0);

  const fetchStatistics = async () => {
    try {
      const industryResponse = await fetch(
        "http://localhost:5000/api/industries"
      );

      const industryData = await industryResponse.json();

      if (industryData.success) {
        setIndustryCount(industryData.count);
      }

      const wasteResponse = await fetch(
        "http://localhost:5000/api/wastes"
      );

      const wasteData = await wasteResponse.json();

      if (wasteData.success) {
        setWasteCount(wasteData.count);
      }

      const requestResponse = await fetch(
        "http://localhost:5000/api/requests"
      );

      const requestData = await requestResponse.json();

      if (requestData.success) {
        const requests = requestData.data;

        setRequestCount(requests.length);

        const pendingRequests = requests.filter(
          (request) =>
            !request.status ||
            request.status === "Pending"
        );

        const approvedRequests = requests.filter(
          (request) =>
            request.status === "Approved"
        );

        const rejectedRequests = requests.filter(
          (request) =>
            request.status === "Rejected"
        );

        setPendingCount(
          pendingRequests.length
        );

        setApprovedCount(
          approvedRequests.length
        );

        setRejectedCount(
          rejectedRequests.length
        );

        setMatchedCount(
          approvedRequests.length
        );
      }

      const notificationResponse = await fetch(
        "http://localhost:5000/api/notifications"
      );

      const notificationData =
        await notificationResponse.json();

      if (notificationData.success) {
        const unreadNotifications =
          notificationData.data.filter(
            (notification) =>
              !notification.read
          );

        setUnreadNotificationCount(
          unreadNotifications.length
        );
      }

    } catch (error) {
      console.error(
        "Error fetching statistics:",
        error
      );
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  return (
    <div className="app">

      <nav className="navbar">

        <div className="logo">
          ReSourceX
        </div>

        <div className="nav-links">

          <a href="#dashboard">
            Dashboard
          </a>

          <a href="#add-industry">
            Add Industry
          </a>

          <a href="#industries">
            Industries
          </a>

          <a href="#waste">
            List Waste
          </a>

          <a href="#waste-marketplace">
            Marketplace
          </a>

          <a href="#resource-requests">
            Requests
          </a>

          <a href="#notifications">
            Notifications

            {unreadNotificationCount > 0 && (
              <span className="notification-badge">
                {unreadNotificationCount}
              </span>
            )}

          </a>

        </div>

      </nav>

      <section
        className="hero"
        id="dashboard"
      >

        <div className="hero-content">

          <p className="hero-label">
            INDUSTRIAL RESOURCE MARKETPLACE
          </p>

          <h1>
            Turn Industrial Waste Into
            Valuable Resources
          </h1>

          <p>
            ReSourceX connects industries that
            generate waste with businesses that
            can reuse it as valuable raw material.
          </p>

          <div className="hero-buttons">

            <button
              onClick={() =>
                document
                  .getElementById("add-industry")
                  .scrollIntoView({
                    behavior: "smooth"
                  })
              }
            >
              Add Industry
            </button>

            <button
              className="secondary-btn"
              onClick={() =>
                document
                  .getElementById(
                    "waste-marketplace"
                  )
                  .scrollIntoView({
                    behavior: "smooth"
                  })
              }
            >
              Explore Marketplace
            </button>

          </div>

        </div>

      </section>

      <section className="stats">

        <div className="stat-card">
          <div className="stat-icon">🏭</div>
          <h2>{industryCount}</h2>
          <p>Industries</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">♻️</div>
          <h2>{wasteCount}</h2>
          <p>Waste Listings</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🌱</div>
          <h2>{matchedCount}</h2>
          <p>Resources Reused</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🤝</div>
          <h2>{matchedCount}</h2>
          <p>Successful Matches</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📩</div>
          <h2>{requestCount}</h2>
          <p>Total Requests</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <h2>{pendingCount}</h2>
          <p>Pending Requests</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <h2>{approvedCount}</h2>
          <p>Approved Requests</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">❌</div>
          <h2>{rejectedCount}</h2>
          <p>Rejected Requests</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔔</div>
          <h2>{unreadNotificationCount}</h2>
          <p>Unread Notifications</p>
        </div>

      </section>

      <section id="add-industry">
        <AddIndustry />
      </section>

      <section id="industries">
        <IndustryList />
      </section>

      <section id="waste">
        <AddWaste />
      </section>

      <section id="waste-marketplace">
        <WasteList />
      </section>

      <section id="resource-requests">
        <ResourceRequests />
      </section>

      <section id="notifications">
        <Notifications />
      </section>

      <section className="features">

        <h2>
          How ReSourceX Works
        </h2>

        <p className="section-description">
          A simple way to transform industrial waste
          into valuable resources.
        </p>

        <div className="feature-container">

          <div className="feature-card">

            <div className="icon">
              🏭
            </div>

            <h3>
              List Industrial Waste
            </h3>

            <p>
              Industries can list reusable
              waste materials and available
              quantities.
            </p>

          </div>

          <div className="feature-card">

            <div className="icon">
              🔍
            </div>

            <h3>
              Discover Resources
            </h3>

            <p>
              Businesses can search for waste
              materials that can be used as
              raw materials.
            </p>

          </div>

          <div className="feature-card">

            <div className="icon">
              ♻️
            </div>

            <h3>
              Reuse & Reduce
            </h3>

            <p>
              Convert industrial waste into
              useful resources and reduce
              environmental impact.
            </p>

          </div>

        </div>

      </section>

      <footer>

        <h3>
          ReSourceX
        </h3>

        <p>
          Industrial Waste → Valuable Resources
        </p>

        <p>
          Student Innovation Project
        </p>

      </footer>

    </div>
  );
}

export default App;

