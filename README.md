# ReSourceX

## Industrial Resource Marketplace

**Turn Industrial Waste Into Valuable Resources**

ReSourceX is an industrial resource marketplace that connects industries generating reusable waste with businesses that can reuse those materials as valuable raw materials.

---

## 📌 Project Overview

Industrial activities generate large amounts of waste materials such as plastic scrap, iron scrap, metal waste, and other reusable resources.

ReSourceX provides a platform where industries can:

* Register their industry
* List reusable industrial waste
* Specify quantity and location
* Discover available resources
* Submit resource requests
* Find potential matches
* Approve or reject requests
* Receive notifications

The goal is to encourage industrial waste reuse and help convert waste into valuable resources.

---

## 🚀 Key Features

### 🏭 Industry Management

* Add new industries
* Store industry details
* View registered industries
* Display industry type, location, contact, and description

### ♻️ Waste Marketplace

* List industrial waste
* Specify waste type
* Specify available quantity
* Select measurement unit
* Add location and description
* View available waste
* Search waste listings
* Filter by waste category
* Sort waste listings

### 📩 Resource Requests

* Submit requests for waste resources
* View submitted requests
* View requested quantity
* View requester details
* Track request status
* Approve requests
* Reject requests

### 🔍 Resource Matching

ReSourceX includes a matching system that compares resource requests with available waste listings.

The matching system considers:

* Waste type
* Available quantity
* Unit
* Location
* Availability date

Matches are assigned levels such as:

* Excellent Match
* Good Match
* Potential Match

### 🔔 Notification System

The application automatically creates a notification when a new resource request is submitted.

Users can:

* View notifications
* See unread notifications
* Mark notifications as read
* Delete notifications
* View notification timestamps

### 📊 Dashboard

The dashboard displays live statistics including:

* Industries
* Waste Listings
* Resources Reused
* Successful Matches
* Total Requests
* Pending Requests
* Approved Requests
* Rejected Requests
* Unread Notifications

---

## 🛠️ Technologies Used

### Frontend

* React
* Vite
* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Development Tools

* Visual Studio Code
* MongoDB Compass
* Thunder Client
* Git
* GitHub

---

## 📂 Project Structure

```text
ReSourceX/
│
├── backend/
│   ├── controllers/
│   │   ├── IndustryController.js
│   │   ├── WasteController.js
│   │   ├── ResourceRequestController.js
│   │   ├── MatchingController.js
│   │   └── NotificationController.js
│   │
│   ├── models/
│   │   ├── Industry.js
│   │   ├── Waste.js
│   │   ├── ResourceRequest.js
│   │   └── Notification.js
│   │
│   ├── routes/
│   │   ├── industryRoutes.js
│   │   ├── wasteRoutes.js
│   │   ├── ResourceRequestRoutes.js
│   │   ├── MatchingRoutes.js
│   │   └── NotificationRoutes.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── AddIndustry.jsx
│   │   │   ├── IndustryList.jsx
│   │   │   ├── AddWaste.jsx
│   │   │   ├── WasteList.jsx
│   │   │   ├── ResourceRequests.jsx
│   │   │   └── Notifications.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/gunaharikareddy/ReSourceX.git
```

Move into the project:

```bash
cd ReSourceX
```

---

## 🔧 Backend Setup

Open a terminal and navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the backend folder:

```env
MONGO_URI=mongodb://127.0.0.1:27017/ReSourceX
PORT=5000
```

Start MongoDB locally.

Then start the backend:

```bash
node server.js
```

The backend should run at:

```text
http://localhost:5000
```

---

## 💻 Frontend Setup

Open another terminal.

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

The frontend should run at:

```text
http://localhost:5173
```

---

## 🗄️ MongoDB Setup

ReSourceX uses a local MongoDB database.

Database name:

```text
ReSourceX
```

The application automatically creates the required collections when data is inserted.

Main collections include:

```text
industries
wastes
resourcerequests
notifications
```

MongoDB Compass can be used to inspect the stored data.

---

## 🔗 API Endpoints

### Industry APIs

```text
GET    /api/industries
POST   /api/industries
```

### Waste APIs

```text
GET    /api/wastes
POST   /api/wastes
```

### Resource Request APIs

```text
GET    /api/requests
GET    /api/requests/:id
POST   /api/requests
PATCH  /api/requests/:id/status
```

### Matching API

```text
GET    /api/matching/:id
```

### Notification APIs

```text
GET    /api/notifications
POST   /api/notifications
PATCH  /api/notifications/:id/read
DELETE /api/notifications/:id
```

---

## 🔄 Application Workflow

```text
Industry Registration
        ↓
List Industrial Waste
        ↓
Waste Marketplace
        ↓
Business Discovers Resource
        ↓
Submit Resource Request
        ↓
Automatic Notification
        ↓
Find Matching Resources
        ↓
Request Approval / Rejection
        ↓
Resource Reuse
```

---

## 🔍 Matching System

The matching system evaluates available waste listings against a resource request.

The system checks:

```text
Waste Type
     ↓
Quantity
     ↓
Unit
     ↓
Location
     ↓
Availability
```

A matching score is calculated and the result is classified as:

```text
Excellent Match
Good Match
Potential Match
```

This helps users identify potentially suitable industrial resources.

---

## 🔔 Notification Workflow

When a user submits a resource request:

```text
Resource Request Submitted
          ↓
ResourceRequest Created
          ↓
Notification Created
          ↓
Notification Appears
          ↓
Unread Count Updated
          ↓
User Marks Notification as Read
```

Notifications can also be deleted from the application.

---

## 📊 Dashboard Statistics

The dashboard dynamically retrieves data from the backend APIs.

Displayed statistics include:

```text
Industries
Waste Listings
Resources Reused
Successful Matches
Total Requests
Pending Requests
Approved Requests
Rejected Requests
Unread Notifications
```

---

## 🧪 Testing

The backend APIs can be tested using:

* Thunder Client
* Browser
* Frontend application

MongoDB data can be verified using:

* MongoDB Compass

Frontend functionality can be tested by checking:

* Industry registration
* Waste listing
* Marketplace search
* Marketplace filtering
* Resource requests
* Matching
* Request approval
* Request rejection
* Notifications
* Mark as Read
* Delete notification
* Dashboard statistics

---

## 🔐 Environment Variables

The `.env` file contains local configuration values.

Example:

```env
MONGO_URI=mongodb://127.0.0.1:27017/ReSourceX
PORT=5000
```

The `.env` file should not be committed to GitHub.

---

## 🌱 Future Enhancements

Possible future improvements include:

* User authentication
* Industry accounts
* Business accounts
* Advanced search
* Location-based matching
* Real-time notifications
* Messaging between businesses
* Waste price negotiation
* Admin dashboard
* Environmental impact tracking
* Recycling analytics
* Cloud deployment

---

## 🎯 Project Objective

The objective of ReSourceX is to create a digital marketplace that encourages industries to reuse waste materials by connecting waste generators with businesses that can use those materials as raw resources.

---

## 👩‍💻 Project Member

**Pandi Guna Harika Reddy**

---

## 📜 Project Type

**Student Innovation Project**

---

## ♻️ ReSourceX

**Industrial Waste → Valuable Resources**

> Turn Industrial Waste Into Valuable Resources
