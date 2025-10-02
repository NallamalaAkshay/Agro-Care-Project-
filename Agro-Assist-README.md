# 🌾 Agro Assist – Full Stack Project

Agro Assist is a **full-stack agricultural platform** that integrates a **React-based frontend** with a **Django + ML backend**.  
It provides farmers, users, and administrators with tools for **crop recommendations, fertilizer suggestions, disease detection, e-commerce, and equipment rentals**.

---

## 🚀 Features

### 🌐 Frontend (React + Tailwind)
- **User Authentication** (Login & Signup)
- **E-commerce Features**: cart, wishlist, product details, checkout
- **Farmer Tools**:
  - Crop recommendations
  - Fertilizer advice
  - Disease identification
  - Equipment rentals
- **Weather Alerts**
- **Admin Dashboard**:
  - Manage products
  - Monitor user activity
  - Update inventory and prices
- **Role-Based Access Control** (Admin, Farmer, User)
- **Dynamic Routing with React Router**

### 🖥 Backend (Django + ML)
- RESTful API endpoints for:
  - Crop recommendation
  - Fertilizer recommendation
  - Disease detection
- Integrated ML models:
  - Random Forest Classifiers for crop/fertilizer
  - ResNet18 CNN for disease detection
- Django REST Framework APIs
- JSON responses for frontend consumption
- Secure role-based access & scalable deployment

---

## 🛠 Tech Stack

- **Frontend**: React, Tailwind CSS, React Router
- **Backend**: Django, Django REST Framework
- **ML Models**: scikit-learn, PyTorch
- **Database**: SQLite (dev) / PostgreSQL (prod)
- **Deployment**: Django server, Node frontend build

---

## 📦 Installation & Setup

### 🔹 Frontend
```bash
cd agro-assist-frontend
npm install
npm run dev   # start development server
```

### 🔹 Backend (Django)
```bash
cd agro-assist-ml
python -m venv venv
source venv/bin/activate   # Linux/macOS
venv\Scripts\activate    # Windows

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Frontend runs at: `http://localhost:5173`  
Backend runs at: `http://127.0.0.1:8000`  

---

## 🔑 API Endpoints (Backend)

### 🌾 Crop Recommendation
**POST** `/api/crop-recommend/`
```json
{
  "N": 90,
  "P": 42,
  "K": 43,
  "temperature": 26.5,
  "humidity": 80,
  "ph": 6.5,
  "rainfall": 200
}
```
**Response:**
```json
{
  "recommended_crop": "rice",
  "confidence": 0.87
}
```

### 🌱 Fertilizer Recommendation
**POST** `/api/fertilizer-recommend/`
```json
{
  "crop": "rice",
  "soil_N": 30,
  "soil_P": 20,
  "soil_K": 15
}
```
**Response:**
```json
{
  "recommended_fertilizer": "Urea",
  "dosage": "50 kg/hectare"
}
```

### 🌿 Disease Detection
**POST** `/api/disease-detect/`  
- Form-Data: `image` (crop leaf image)  

**Response:**
```json
{
  "disease": "Leaf Blight",
  "confidence": 0.92
}
```

---

## 🧠 ML Models Used

- **Crop Recommendation** → Random Forest Classifier  
- **Fertilizer Recommendation** → Random Forest Classifier  
- **Disease Detection** → ResNet18 CNN (PyTorch)  

---

## ⚙️ Project Structure

```
Agro-Assist/
│── frontend/ (React app)
│   │── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/UserContext.tsx
│   │   └── App.tsx
│   └── package.json
│
│── backend/ (Django + ML app)
│   │── agro_ml/ (main project)
│   │── crop_app/
│   │── fertilizer_app/
│   │── disease_app/
│   │── models/ (trained ML models)
│   │── manage.py
│   └── requirements.txt
│
└── README.md
```

---

## 🌐 Frontend Integration Example

```js
const res = await fetch("http://127.0.0.1:8000/api/crop-recommend/", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});
const data = await res.json();
console.log("Recommended Crop:", data.recommended_crop);
```

---

## 👨‍💻 Contributors

- **Akshay Nallamalla**
- **Kautilya Miryala**
- **Prem Sai Potukuchi**
- **Ishan Pathak**
- **Hemanth Paila**
- **Madhu**


---

## 🙏 Acknowledgements

- Professors & Mentors for guidance  
- Open-source ML Libraries (scikit-learn, PyTorch)  
- Community datasets for training models  
- React & Django communities  

---

## 📌 Future Enhancements

- Deploy on **AWS/GCP** with Docker + Kubernetes  
- Add **IoT sensor integration** for real-time soil/temperature data  
- Expand disease dataset coverage  
- Multi-language farmer support  
- Payment integration for equipment rentals  

---

✅ With this README, Agro Assist is **fully documented end-to-end**, covering **Frontend + Backend + ML**.
