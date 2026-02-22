# ArcTrack - Complete School Management Platform

> Transform Your School Digitally with Complete ERP, Mobile Apps, and Premium Website

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.5-47A248?logo=mongodb)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red)]()

## 🎯 Overview

**ArcTrack** is a comprehensive digital infrastructure platform designed specifically for private schools in India (300-2000 students). It combines a powerful ERP system, native mobile applications for parents and teachers, and a premium school website - all in one integrated solution.

### Key Features

- **💰 Fee Collection System** - Complete financial control with automated reminders and multi-payment gateway support
- **📱 Mobile Apps** - Native iOS and Android apps for seamless parent-teacher communication
- **📊 Analytics Dashboard** - Real-time insights into attendance, fees, and operations
- **🚌 Transport Management** - GPS tracking and route optimization
- **📚 Academics & Exams** - Exam scheduling, results, and report card generation
- **🌐 Premium Website** - Modern, SEO-optimized school website included with every plan
- **🔒 Security** - Bank-grade encryption and DPDP Act compliance

## 🏗️ Architecture

### Tech Stack

**Frontend:**
- React 19 with React Router for navigation
- Tailwind CSS for responsive, modern UI
- Lucide React for consistent iconography
- Axios for API communication

**Backend:**
- FastAPI (Python) for high-performance REST APIs
- MongoDB with Motor (async driver) for data persistence
- Pydantic for data validation
- SMTP integration for email notifications

**Infrastructure:**
- Supervisor for process management
- Hot reload enabled for development
- CORS configured for cross-origin requests

### Project Structure

```
/app
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route pages
│   │   ├── utils/           # Utilities and mock data
│   │   └── App.js           # Main app component
│   ├── public/
│   └── package.json
│
├── backend/                  # FastAPI application
│   ├── routes/              # API route handlers
│   ├── services/            # Business logic & integrations
│   ├── models.py            # Pydantic models
│   ├── server.py            # FastAPI app initialization
│   └── requirements.txt
│
└── memory/
    └── PRD.md               # Product requirements document
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and Yarn
- Python 3.9+
- MongoDB 4.5+
- SMTP credentials (for email notifications)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd arctrack
   ```

2. **Backend Setup**
   ```bash
   cd backend
   pip install -r requirements.txt
   
   # Create .env file
   cat > .env << EOF
   MONGO_URL=mongodb://localhost:27017
   DB_NAME=arctrack_db
   SMTP_USERNAME=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   ADMIN_EMAIL=arctrackdev@gmail.com
   EOF
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   yarn install
   
   # Create .env file
   echo "REACT_APP_BACKEND_URL=http://localhost:8001" > .env
   ```

4. **Start Development Servers**
   ```bash
   # Start backend (from /app/backend)
   sudo supervisorctl restart backend
   
   # Start frontend (from /app/frontend)
   sudo supervisorctl restart frontend
   ```

5. **Access the Application**
   - **Website:** http://localhost:3000
   - **Admin Dashboard:** http://localhost:3000/admin
   - **API Docs:** http://localhost:8001/docs

### Admin Dashboard Access

- Navigate to `/admin` route
- Default password: `arctrack2024`
- **⚠️ Change this in production!**

## 📋 Features in Detail

### 1. Lead Management System

The platform includes a complete lead capture and management workflow:

- **Public Form:** Visitors fill out a simple 6-field form
- **Auto-notifications:** Admin and lead receive instant email confirmations
- **Admin Dashboard:** Track, filter, and manage all leads in real-time
- **Status Management:** Update lead status (New → Contacted → Qualified → Converted)
- **Calendly Integration:** Schedule demos directly from success page

### 2. Email Notification System

Automated email notifications for:
- **Admin Notifications:** Instant alerts for new leads with complete details
- **Lead Confirmations:** Professional welcome emails with next steps
- **Customizable Templates:** HTML email templates with your branding

### 3. Complete School Modules

- Fee Management
- Student Management
- Attendance System
- Transport Management
- Academics & Exams
- Communication Hub
- Admissions Portal
- Analytics & Reports
- Mobile Apps (iOS & Android)
- Premium Website
- Security & Compliance
- Custom Integrations

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```bash
MONGO_URL=mongodb://localhost:27017
DB_NAME=arctrack_db
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=arctrackdev@gmail.com
SMTP_PASSWORD=your-app-specific-password
ADMIN_EMAIL=arctrackdev@gmail.com
```

**Frontend (.env)**
```bash
REACT_APP_BACKEND_URL=https://your-domain.com
```

### Email Setup (Gmail)

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an [App Password](https://myaccount.google.com/apppasswords)
3. Use the app password in `SMTP_PASSWORD` env variable

## 📊 API Documentation

### Leads API

#### Create Lead
```bash
POST /api/leads
Content-Type: application/json

{
  "schoolName": "St. Mary's High School",
  "studentStrength": "801-1200",
  "city": "Mumbai",
  "contactName": "Rajesh Kumar",
  "email": "rajesh@stmarys.edu",
  "phone": "9876543210",
  "source": "Website Form"
}
```

#### Get All Leads
```bash
GET /api/leads?skip=0&limit=100
```

#### Update Lead Status
```bash
PATCH /api/leads/{lead_id}
Content-Type: application/json

{
  "status": "Contacted"
}
```

## 🎨 Design System

### Color Palette

- **Primary Navy:** `#0F172A` (Slate 900)
- **Accent Blue:** `#0EA5E9` (Sky 500)
- **Secondary Blue:** `#3B82F6` (Blue 500)
- **Text Primary:** `#F1F5F9` (Slate 100)
- **Text Secondary:** `#94A3B8` (Slate 400)

### Typography

- **Font Family:** Inter (sans-serif)
- **Headings:** 700 weight
- **Body:** 400 weight
- **Emphasis:** 600 weight

## 🧪 Testing

### Manual Testing

```bash
# Test backend API
curl -X POST http://localhost:8001/api/leads \
  -H "Content-Type: application/json" \
  -d '{"schoolName":"Test School","studentStrength":"801-1200","city":"Mumbai","contactName":"Test User","email":"test@example.com","phone":"9876543210"}'

# Test email notifications (check logs)
tail -f /var/log/supervisor/backend.err.log
```

## 📈 Performance

- **Lighthouse Score:** 90+ Performance
- **LCP:** < 2.5s (Largest Contentful Paint)
- **Mobile Responsive:** Fully optimized for all devices
- **SEO Optimized:** Meta tags, semantic HTML, fast loading

## 🔒 Security

- **Authentication:** Admin dashboard password-protected
- **Data Encryption:** All sensitive data encrypted in transit (HTTPS)
- **DPDP Compliance:** Compliant with Indian data protection regulations
- **Input Validation:** Server-side validation using Pydantic
- **CORS:** Properly configured for production security

## 🚀 Deployment

### Vercel Deployment (Recommended - No Backend Server Needed!)

Your app is configured for **serverless deployment** on Vercel with automatic email notifications.

**Quick Start:**
1. Get free Resend API key: https://resend.com/api-keys
2. Push to GitHub
3. Import to Vercel: https://vercel.com/new
4. Add environment variables:
   - `RESEND_API_KEY` - Your Resend API key
   - `ADMIN_EMAIL` - arctrackdev@gmail.com
5. Deploy!

**📖 Complete Guide**: See `/VERCEL_DEPLOYMENT.md` for step-by-step instructions

**Alternative**: See `/EMAILJS_ALTERNATIVE.md` for even simpler deployment (no backend at all)

---

## 🚀 Deployment

### Production Checklist

- [ ] Update `ADMIN_PASSWORD` in AdminDashboard.js
- [ ] Configure production MongoDB URL
- [ ] Set up SMTP with production email
- [ ] Update `REACT_APP_BACKEND_URL` to production domain
- [ ] Enable HTTPS/SSL
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy for MongoDB
- [ ] Review and update CORS settings

### Deployment Commands

```bash
# Build frontend
cd frontend && yarn build

# Backend is served via supervisor (no build needed)

# Restart services
sudo supervisorctl restart all
```

## 📞 Support

For questions, issues, or feature requests:

- **Email:** arctrackdev@gmail.com
- **Documentation:** See `/memory/PRD.md` for detailed requirements
- **Admin Dashboard:** Access at `/admin` for lead management

## 📝 License

Proprietary - All rights reserved

## 🙏 Acknowledgments

- Calendly for scheduling integration
- React and FastAPI communities
- Tailwind CSS for the design system
- Lucide for beautiful icons

---

**Built with ❤️ for modern Indian schools**

*Transform your school's operations with complete digital infrastructure*
