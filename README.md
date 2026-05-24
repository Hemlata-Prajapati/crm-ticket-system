# CRM Ticket System

A full-stack Customer Support CRM Ticket Management System built using React.js, FastAPI, SQLAlchemy, and SQLite.

## Live Demo

Frontend:
https://crm-ticket-system-six.vercel.app/

Backend API:
https://crm-ticket-system.onrender.com/

Swagger Docs:
https://crm-ticket-system.onrender.com/docs

---

## Features

- Create support tickets
- Auto-generated ticket IDs
- View all tickets
- Search tickets
- Filter tickets by status
- Update ticket status
- View ticket details
- Responsive UI
- REST API integration

---

## Tech Stack

### Frontend
- React.js
- Vite
- Axios
- CSS

### Backend
- FastAPI
- SQLAlchemy
- SQLite
- Uvicorn

### Deployment
- Vercel (Frontend)
- Render (Backend)

---

## API Endpoints

### Get All Tickets
GET /api/tickets

### Create Ticket
POST /api/tickets

### Get Single Ticket
GET /api/tickets/{ticket_id}

### Update Ticket
PUT /api/tickets/{ticket_id}

---

## Folder Structure

crm-ticket-system/
│
├── backend/
│ ├── main.py
│ ├── crud.py
│ ├── models.py
│ ├── schemas.py
│ ├── database.py
│
├── frontend/
│ ├── src/
│ ├── components/
│ ├── pages/
│ ├── api/
│
└── README.md

---

## Setup Instructions

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Author

Hemlata Prajapati
