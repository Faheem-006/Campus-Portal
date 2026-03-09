# 🎓 CampusVoice Portal - MERN Stack Food Complaint System

A full-stack Student Food Complaint Portal built with React.js, Node.js/Express, and MongoDB.

---

## 📁 Project Structure

```
campusvoice/
├── backend/           # Node.js + Express API
│   ├── models/        # Mongoose schemas (User, Complaint, Contact)
│   ├── routes/        # Auth, Complaints, Contact, Admin APIs
│   ├── middleware/    # JWT auth middleware
│   ├── uploads/       # Uploaded complaint images
│   ├── server.js      # Entry point
│   └── .env           # Environment variables
└── frontend/          # React.js SPA
    ├── public/
    └── src/
        ├── components/  # Navbar, Footer
        ├── context/     # AuthContext (JWT state)
        └── pages/       # All page components
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- npm

### 1. Backend Setup
```bash
cd backend
npm install
```

Edit `.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/campusvoice
JWT_SECRET=your_secret_key_here
```

```bash
npm run dev    # Development (nodemon)
npm start      # Production
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm start
```

Frontend runs on **http://localhost:3000**  
Backend runs on **http://localhost:5000**

---

## 🌐 Pages & Features

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, features, stats, testimonials |
| About | `/about` | Mission, how it works, team |
| File Complaint | `/file-complaint` | Submit complaints with photo upload |
| My Complaints | `/my-complaints` | Track complaints (by ID or login) |
| FAQ | `/faq` | Accordion FAQ |
| Contact | `/contact` | Contact form + department info |
| Login | `/login` | JWT authentication |
| Register | `/register` | Student registration |
| Admin | `/admin` | Dashboard, complaint management |

---

## 🔌 REST API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register student |
| POST | `/api/auth/login` | Login (returns JWT) |

### Complaints
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/complaints` | No | Submit complaint (multipart) |
| GET | `/api/complaints/my` | Yes | Get user's complaints |
| GET | `/api/complaints/track/:id` | No | Track by complaint ID |
| GET | `/api/complaints/stats` | No | Public statistics |

### Contact
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit contact message |

### Admin (requires admin JWT)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/complaints` | All complaints |
| PUT | `/api/admin/complaints/:id` | Update status |
| GET | `/api/admin/stats` | Full statistics |
| GET | `/api/admin/contacts` | All messages |

---

## 👑 Creating an Admin User

After registering normally, update role in MongoDB:
```js
db.users.updateOne({ email: "admin@example.com" }, { $set: { role: "admin" } })
```

---

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router v6, Bootstrap 5, Axios, SweetAlert2
- **Backend**: Node.js, Express.js, JWT, Multer (file uploads)
- **Database**: MongoDB with Mongoose ODM
- **Auth**: bcryptjs + JSON Web Tokens

---

## 📦 Dependencies

### Backend
- express, mongoose, cors, dotenv
- bcryptjs, jsonwebtoken
- multer (image uploads)
- nodemon (dev)

### Frontend
- react, react-dom, react-router-dom
- axios, sweetalert2
- Bootstrap 5, Bootstrap Icons (via CDN)
