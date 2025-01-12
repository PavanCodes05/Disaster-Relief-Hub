🌍 Disaster Relief Hub

A real-time platform connecting donors and individuals affected by disasters for efficient resource coordination and relief efforts.

📖 Overview
Disaster Relief Hub is a web application designed to streamline relief efforts during natural or man-made disasters. By connecting donors with affected individuals, the platform ensures timely distribution of essential resources, empowering communities to recover faster.

🚀 Key Features
  1. User Management
  Authentication: Secure signup/login/logout functionality.
  User Profiles: Donors and recipients can create and manage profiles.
  2. Post-Based Interaction
  Recipients create posts detailing their requirements (e.g., food, medicine, clothing).
  Donors browse and select posts to fulfill needs.
  3. Inventory Management
  Donors manage inventory: add, update, or remove resources.
  Real-time status updates: Track donations from "pending" to "delivered."
  4. Notifications
  Instant notifications when donor resources match recipient needs.
  5. Group Chat
  Donors are added to a group chat for logistics discussions.
  Direct chats between donors and recipients after donation approval.
  6. Analytics Dashboard
  Insights for administrators: resource flow, donor activity, and unmet needs.

🛠️ Tech Stack

Frontend: React.js (with Tailwind CSS and DaisyUI for styling)
Backend:Node.js, Express.js
Database: MongoDB
Other Tools:
Socket.io: Real-time chat and notifications.
Cloudinary: Image upload and storage for posts.
JWT: Secure user authentication.

📋 Installation
Clone the repository:

git clone https://github.com/your-username/disaster-relief-hub.git
cd disaster-relief-hub

Install dependencies:
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
Set up environment variables:

Backend: Create a .env file in the backend folder and configure the following:
.env

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

Run the application:
# Backend
cd backend
npm run dev

# Frontend
cd ../frontend
npm start
Open the app in your browser at http://localhost:3000.

🌟 Future Enhancements

1. AI-Powered Recommendation System: Match donors and recipients more effectively based on historical data.
2. Geolocation Support: Help donors locate recipients in nearby areas.
3. Multi-Language Support: Expand accessibility for diverse user bases.
4. Disaster-Specific Modules: Tailored resources and actions based on disaster type.
