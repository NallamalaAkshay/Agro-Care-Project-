# 🌱 Agro Assist

Agro Assist is a **React-based web application** developed as part of the **ICSI518 - Software Engineering Team Project**.  
It provides agricultural tools and e-commerce functionalities, supporting **role-based access** for Admin, Farmer, and User roles.

---

## 🚀 Features

- **User Authentication**: Login and signup functionality.
- **E-commerce Features**:
  - Add/remove products to/from cart and wishlist.
  - View product details.
- **Farmer Tools**:
  - Crop recommendations.
  - Fertilizer advice.
  - Disease identification.
  - Equipment rentals.
- **Weather Alerts**: Displays weather notifications.
- **Admin Dashboard**:
  - Manage products.
  - Review user activities.
  - Update product prices and inventory.
- **Role-Based Access Control**:
  - Only authenticated users can access certain pages.
  - Unauthorized users are redirected to the login page.

---

## 🖼️ Screenshots


### Home Page
![Home Page](./src/Assets/pic1.png)

### Login Page
![Login Page](./src/Assets/pic2.png)


---

## 🛠️ Tech Stack

- **Front End:** React.js (with React Router for navigation)  
- **Styling:** Tailwind CSS, custom CSS  
- **Backend (ML Integration):** Django APIs for machine learning predictions  

---

## 🔑 Key Functionalities

- **UserContext Integration**: Provides global state management for the authenticated user, ensuring dynamic UI updates based on user roles such as Admin, Farmer, or General User.

- **Dynamic Routing**: Implements seamless navigation using React Router. Routes are conditionally rendered based on the user's authentication status and role.

- **Cart and Wishlist Management**: Users can add or remove products to and from their cart and wishlist, with real-time data fetching from the backend to provide a smooth e-commerce experience.

- **Admin Dashboard**: Enables administrators to manage products, monitor user activities, and oversee platform operations.

- **Weather Alerts**: Displays real-time weather updates and notifications, helping farmers make informed decisions.

- **Crop Recommendation System**: Suggests suitable crops based on various factors such as weather, soil conditions, and user inputs.

- **Fertilizer Recommendation Engine**: Provides tailored fertilizer recommendations to optimize crop yield and health.

- **Disease Prediction System**: Detects potential plant diseases based on user-uploaded images or specified parameters.

- **E-Commerce Store**: A complete e-commerce platform where users can browse products, manage their cart, wishlist, and make purchases efficiently.

---

## 🤖 Agro-Assist ML

Throughout the project, we used various machine learning models to power the platform’s features:

- **Crop Type Recommendation System** – Random Forest Classifier  
- **Fertilizer Recommendation System** – Random Forest Classifier  
- **Crop Disease Identification System** – ResNet18 (CNN)  

### Django API Integration
- The ML models were integrated into Django Apps to generate REST API endpoints.  
- The frontend communicates with these APIs, sending user input data to receive predictions or recommendations in real-time.

---

## 👨‍👩‍👧‍👦 Team Members

This project was developed by **Team 6** for **ICSI518 - Software Engineering**:

- **Akshay Nallamalla**  
- **Kautilya Miryala**  
- **Prem Sai Potukuchi**  
- **Ishan Pathak**  
- **Hemanth Paila**  
- **Madhu**  

---

## 🙏 Acknowledgements

We extend our heartfelt gratitude to everyone who supported this project:  

- Our **mentors and professors** for their invaluable guidance and feedback.  
- The **open-source community** for providing tools and frameworks.  
- Our **friends and colleagues** for their encouragement and suggestions.  
- Everyone who contributed directly or indirectly to making this project a success.  

---

📌 **ICSI518 - Software Engineering Project | Fall 2024**  
