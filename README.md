# 🏡 Airbnb Clone

A full-featured **Airbnb Clone** web application built with **Node.js**, **Express**, **MongoDB**, and **EJS**, allowing users to create, search, filter, and review listings. The app is fully deployed and mobile responsive.

---

## 🚀 Live Demo

👉 [View Live Site](https://airbnb-clone-h3ed.onrender.com/listings)

> ⚠️ **Note:** You may see a "Deceptive Site Ahead" warning in Chrome. This is a **false positive** due to Google Safe Browsing’s detection of new/unverified domains with login forms. The site is safe and malware-free. Please see the [Chrome Warning Explained](#-chrome-warning-explained) section below for more info and workarounds.

---

## ✨ Features

- 🔐 **User Authentication** (Signup & Login)
- 🏠 **Add, Edit & Delete Listings**
- 📂 **Filter Listings by Category**
- 🔍 **Real-Time Search Functionality**
- 💬 **Add, Edit & Delete Reviews**
- 🔄 **Auto Scroll to Filtered Sections**
- 📱 **Fully Responsive UI Design**
- ☁️ **Image Upload with Cloudinary**
- ✅ **Robust Error Handling & Form Validation**

---

## 🛠️ Tech Stack

### 🧰 Backend
- Node.js
- Express.js
- MongoDB & Mongoose

### 🎨 Frontend
- HTML, CSS, JavaScript
- EJS Templates
- Bootstrap / Tailwind CSS (optional)

### 📦 Other Libraries & Tools
- **Multer** – File Upload Handling
- **Cloudinary SDK** – Image Hosting
- **Express-Session** – Session Management
- **Connect-Flash** – Flash Messaging
- **Joi** – Schema Validation

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/airbnb-clone.git
cd airbnb-clone

# Install backend dependencies
npm install

# Set up environment variables
touch .env


📁 Folder Structure

airbnb-clone/
├── public/
│   └── CSS, JS, Images
├── routes/
│   └── listings.js, reviews.js, users.js
├── views/
│   └── EJS templates
├── models/
│   └── Listing.js, Review.js, User.js
├── middleware/
├── utils/
├── app.js
└── .env


Chrome Warning Explained

When visiting the deployed link:

🔗 https://airbnb-clone-h3ed.onrender.com/listings

you may see a red warning in Chrome: "Deceptive Site Ahead". This is due to the Google Safe Browsing algorithm flagging some new domains hosted on shared platforms like Render.

✅ Site Safety
The site is 100% safe.

Hosted on Render with HTTPS.

No malware or phishing scripts.

No data collection or external threats.

💡 Workarounds
You can still visit the site by:

Using Incognito Mode

Opening in Firefox, Edge, or Brave

Clicking "Advanced → Proceed anyway" in Chrome
