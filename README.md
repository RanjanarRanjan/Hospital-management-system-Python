# 🏥 Doctor Appointment Booking System  

A **full-stack web application** built using **Django (DRF)** for the backend and **React (Vite)** for the frontend.  
This system allows users to **book appointments** with doctors, while **admins** can manage doctors and appointments.  

---

## 📖 Project Overview  

The **Doctor Appointment Booking System** is designed to simplify the process of scheduling doctor consultations.  
It provides separate roles for **Admin** and **User**, ensuring secure authentication and access control using **JWT tokens stored in cookies**.  

- 🧑‍⚕️ **Admin** can add, edit, and delete doctor profiles and view all appointments.  
- 👩‍💻 **User** can register, log in, view available doctors, and book or cancel their appointments.  
- 🔒 Secure login and session management using **JWT authentication with HttpOnly cookies**.  

---

## 🎯 Purpose of the Project  

The main goal of this project is to create a **digital platform for hospital appointment management** that:  
- Reduces manual work in booking appointments.  
- Provides a user-friendly and responsive interface.  
- Ensures secure access control for both admin and users.  
- Enables efficient doctor and appointment management.  

---

## 🧩 Technologies Used  

### 💻 Frontend  
- **React.js (Vite)**  
- **React Router DOM**  
- **Tailwind CSS** *(optional styling library)*  
- **Fetch API** (no Axios used)  

### ⚙️ Backend  
- **Django 5+**  
- **Django REST Framework (DRF)**  
- **MySQL Database**  
- **djangorestframework-simplejwt** for token management  
- **django-cors-headers** for CORS handling  

---

## 🧰 Additional Tools & Libraries  

| Tool / Library | Purpose |
|-----------------|----------|
| 🔐 **JWT (SimpleJWT)** | Token-based authentication |
| 🍪 **HttpOnly Cookies** | Secure token storage in browser |
| 🌐 **DRF (Django REST Framework)** | Backend API development |
| ⚙️ **CORS Headers** | Cross-Origin communication |
| 🧱 **Vite** | Fast React build tool |
| 🎨 **Figma** | UI/UX design prototype |

🔗 **Figma Design:** [View Design on Figma](https://www.figma.com/design/c8RMrCTU80azdsYV7MUDzJ/Untitled?node-id=0-1&p=f&t=VPtLiQagOg1GU4Vx-0)

---

## 🧠 System Roles  

| Role | Permissions |
|------|--------------|
| 👩‍💼 **Admin** | Manage doctors and view all appointments |
| 👨‍👩‍⚕️ **User** | View doctors, book, and cancel own appointments |

---

🔄 Project Flow

User visits the homepage and logs in or signs up.
First signup becomes Admin automatically.
Admin adds doctor details (name, specialization, available slots, etc.).
Users can view doctors, pick a slot, and book appointments.
Admin can view all appointments; users can view/cancel their own.

📸 Screens & Design

🏠 Home Page — Welcome screen with login/signup options.
👩‍⚕️ Admin Dashboard — Manage doctors and appointments.
📅 User Dashboard — View doctors and book appointments.

---

## ⚡ How to Run the Project  

### 🗂️ 1. Clone the Repository  
```bash
git clone https://github.com/<your-username>/doctor-appointment-system.git
cd doctor-appointment-system

🖥️ 2. Backend Setup (Django + MySQL)

Create a virtual environment:

python -m venv venv
source venv/bin/activate 

python manage.py makemigations
python manage.py migrate
python manage.py runserver


🌐 3. Frontend Setup (React + Vite)

Go to the frontend folder:
cd frontend

Install dependencies:
npm install

Start the Vite development server:
npm run dev
