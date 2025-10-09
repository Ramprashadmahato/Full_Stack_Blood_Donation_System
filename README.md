# 🩸 Blood Donation and Emergency Request System

A full-stack web application designed to connect **blood donors**, **recipients**, and **administrators** for efficient blood donation management and emergency requests.

Developed with ❤️ by **Ram Prashad Mahato**

---

## 📖 Overview

The **Blood Donation and Emergency Request System** is built to simplify the blood donation process by bridging the gap between **donors** and **recipients**.  
It allows users to register as donors, request blood in emergencies, and helps administrators manage blood inventory, donations, and requests effectively.

---

## 🚀 Features

### 👨‍⚕️ Donor Module
- Register as a donor with details such as name, age, blood group, and location.  
- Update donor information easily.  
- Manage donation history and view past donations.  
- Securely store and update donor health information.

### 🧍‍♀️ Recipient Module
- Request blood by specifying required blood group, urgency level, and hospital details.  
- Track the status of their blood request.  
- Get notified when a compatible donor is found.

### 🧰 Admin Module
- Manage donors, recipients, and blood requests.  
- Monitor blood inventory by type and availability.  
- Generate and view analytical reports.  
- Approve or reject donor and recipient registrations.  
- Handle emergency blood request coordination.

### 🏥 Emergency Request System
- Real-time blood request system for emergency cases.  
- Auto-match compatible donors and alert them instantly.  
- Display nearby blood banks or hospitals with available stock.

---

## 💻 Tech Stack

### **Frontend**
- React.js (Vite)
- Tailwind CSS
- Axios for API calls
- React Router DOM for navigation
- React Icons for UI elements

### **Backend**
- Node.js
- Express.js
- MongoDB with Mongoose ODM
- JWT Authentication and Bcrypt for security
- Cloudinary / Multer for image and file uploads (if required)

---

## 🗂️ Folder Structure

blood-donation-emergency-system/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── providers/
│   │   └── App.jsx
│   └── .env
│
├── README.md
└── package.json
📊 Future Enhancements

Integration with Google Maps API for donor-recipient distance tracking

Real-time notifications via Socket.io

Mobile-friendly PWA version

AI-based donor matching system

🤝 Contributing

Contributions are welcome!
If you'd like to improve the system, please fork the repo and create a pull request.

👨‍💻 Developer Info

Name: Ram Prashad Mahato
📞 Contact: 9826872678
📧 Email: rpxingh201@gmail.com

📍 Location: Nepal

🪪 License

This project is licensed under the BIT License.
Feel free to use and modify it for educational or development purposes.
