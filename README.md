# Employee Management System

## Overview
This is a full-stack Employee Management System built with **React** for the frontend and **Node.js/Express** for the backend. It allows users to manage employee details, including adding, updating, viewing, and deleting records. The system uses **MongoDB** as its database, and the backend is integrated with **Docker** for containerized deployment.

---

## Features
### **Frontend**
- User-friendly interface for managing employees.
- Pages include:
  - **Login/Signup:** Authentication for users.
  - **Employee List:** Displays all employees with actions (view, edit, delete).
  - **Employee Details:** View specific employee information.
  - **Add/Edit Employee:** Forms for creating or updating employee data.
- Built with **React** and styled using CSS.

### **Backend**
- RESTful APIs for employee management:
  - **GET** `/api/employees`: Fetch all employees.
  - **GET** `/api/employees/:id`: Fetch a specific employee by ID.
  - **POST** `/api/employees`: Add a new employee.
  - **PUT** `/api/employees/:id`: Update an existing employee.
  - **DELETE** `/api/employees/:id`: Delete an employee.
- JWT-based authentication for secure access.
- Built with **Node.js**, **Express**, and **MongoDB**.

### **Database**
- MongoDB (Dockerized) is used to store employee records.

---

## Tech Stack
### **Frontend**
- React (with React Router for routing)
- Axios for HTTP requests
- CSS for styling

### **Backend**
- Node.js with Express
- MongoDB
- Docker for deployment

---

