# ArcTrack School ERP Landing Page - Product Requirements Document

## Original Problem Statement
Build a high-conversion SaaS website for ArcTrack - a premium School ERP platform targeting private schools (300-2000 students) in India. The website must generate qualified leads through demo bookings, positioned as a complete digital infrastructure platform with a FREE premium website (₹40,000 value) included.

## User Personas
1. **School Owners/Trustees** - Primary decision makers focused on ROI, reputation, and control
2. **Principals/Administrators** - Focused on operational efficiency and reducing daily chaos
3. **IT/Finance Managers** - Concerned with technical implementation and financial tracking

## Core Requirements (Static)
- Modern SaaS aesthetic with professional dark theme
- High conversion rate optimization (target: 6-8%)
- Full-stack implementation (React + FastAPI + MongoDB)
- Lead capture form → Calendly integration flow
- Mobile responsive design
- Fast loading (LCP < 2.5s, Lighthouse > 90)
- Calendly badge widget integration
- WhatsApp floating button
- Trust signals (SSL, DPDP Act compliance, security badges)

## Architecture & Tech Stack
**Frontend:**
- React 19 with React Router
- Tailwind CSS for styling
- Lucide React for icons
- Custom animations and micro-interactions
- Professional color palette: Slate-900 (#0F172A) + Sky-500 (#0EA5E9)

**Backend:**
- FastAPI (Python)
- MongoDB with Motor (async driver)
- RESTful API architecture
- Pydantic models for validation

**Infrastructure:**
- Supervisor for process management
- Hot reload enabled for development
- CORS configured for cross-origin requests

## What's Been Implemented ✅

### Implementation Date: February 21, 2026

**Frontend Components:**
1. ✅ Header with sticky navigation and mobile menu
2. ✅ Hero Section with Calendly badge widget integration
3. ✅ Pain Points Section (3 key problems)
4. ✅ Solution Pillars Section with interactive tabs:
   - Revenue Command Center with realistic dashboard mockup
   - Communication Nexus with phone app mockup
   - Operational Control Panel with live metrics
5. ✅ Free Website Bonus Section with browser mockup
6. ✅ ROI Section with metrics and before/after comparison
7. ✅ Pricing Section (3 tiers: Essential, Premium, Enterprise)
8. ✅ Lead Capture Form (modal with validation)
9. ✅ Success/Confirmation Page with embedded Calendly
10. ✅ Footer with trust signals and security badges
11. ✅ WhatsApp floating button
12. ✅ Fully responsive design

**Backend APIs:**
1. ✅ POST /api/leads - Create new lead
2. ✅ GET /api/leads - Get all leads (admin)
3. ✅ GET /api/leads/{id} - Get single lead
4. ✅ PATCH /api/leads/{id} - Update lead status
5. ✅ DELETE /api/leads/{id} - Delete lead
6. ✅ GET /api/health - Health check endpoint

**Database Schema:**
- ✅ Leads collection with fields: id, schoolName, studentStrength, city, contactName, email, phone, source, status, createdAt, updatedAt

**Key Features:**
- ✅ Full lead capture workflow (form submission → success page → Calendly scheduling)
- ✅ Form validation (email regex, phone validation for Indian numbers)
- ✅ Professional dashboard mockups with realistic Indian data (₹ currency, student counts)
- ✅ Smooth animations and transitions
- ✅ Glass morphism effects
- ✅ Interactive pillar switching
- ✅ Mobile-optimized navigation

## Prioritized Backlog

### P0 (Critical - Must Have)
- [ ] **Testing**: Call testing_agent_v3 to test complete backend and frontend flow
- [ ] Email notification system for new leads
- [ ] WhatsApp notification integration for lead confirmations
- [ ] Admin dashboard to view/manage leads
- [ ] Analytics tracking (Google Analytics/Pixel)

### P1 (High Priority)
- [ ] SEO optimization (meta tags, schema markup, sitemap)
- [ ] Performance optimization (image lazy loading, code splitting)
- [ ] Lead export functionality (CSV/Excel)
- [ ] Demo video embedding section
- [ ] Testimonials section (when content is ready)
- [ ] Blog/Resources section
- [ ] CRM integration (HubSpot/Salesforce)

### P2 (Nice to Have)
- [ ] A/B testing framework for CTAs
- [ ] Live chat integration
- [ ] Multi-language support (Hindi, regional languages)
- [ ] Dark/Light mode toggle
- [ ] Interactive ROI calculator
- [ ] Case studies page
- [ ] FAQ section with accordion
- [ ] Social proof widgets (recent signups, live visitor count)

## API Contracts

### POST /api/leads
**Request Body:**
```json
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

**Response (201):**
```json
{
  "id": "uuid-string",
  "schoolName": "St. Mary's High School",
  "studentStrength": "801-1200",
  "city": "Mumbai",
  "contactName": "Rajesh Kumar",
  "email": "rajesh@stmarys.edu",
  "phone": "9876543210",
  "status": "New",
  "createdAt": "2026-02-21T10:30:00Z"
}
```

### GET /api/leads
**Query Params:** skip (default: 0), limit (default: 100)

**Response (200):**
```json
[
  {
    "id": "uuid-string",
    "schoolName": "St. Mary's High School",
    "studentStrength": "801-1200",
    "city": "Mumbai",
    "contactName": "Rajesh Kumar",
    "email": "rajesh@stmarys.edu",
    "phone": "9876543210",
    "status": "New",
    "createdAt": "2026-02-21T10:30:00Z"
  }
]
```

## Lead Conversion Flow
1. User visits landing page
2. User clicks "Apply for Digital Upgrade" or "Book Free Demo" CTA
3. Modal opens with lead capture form (6 fields)
4. User fills form and submits
5. Form validation (client-side + server-side)
6. Lead saved to MongoDB
7. User redirected to /success?leadId={id}
8. Success page shows confirmation + embedded Calendly widget
9. User schedules 30-min consultation
10. Email + WhatsApp confirmation sent (to be implemented)
11. Sales team receives notification and follows up within 15 minutes

## Mock Data vs Real Implementation
**Currently Mock:**
- ❌ Email notifications (infrastructure needed)
- ❌ WhatsApp Business API integration (API key needed)
- ❌ Calendly webhook for booking confirmations (Calendly Pro needed)
- ❌ Analytics tracking (Google Analytics ID needed)

**Fully Functional:**
- ✅ Lead form submission to database
- ✅ Calendly inline widget embedding
- ✅ Lead data persistence in MongoDB
- ✅ All frontend interactions and animations
- ✅ Responsive design across devices
- ✅ WhatsApp button (opens chat)

## Next Tasks
1. **CRITICAL**: Call testing_agent_v3 to test the complete application flow
2. Fix any issues found during testing
3. Add email notification system using SendGrid/AWS SES
4. Integrate WhatsApp Business API for confirmations
5. Set up admin dashboard for lead management
6. Add Google Analytics tracking
7. Optimize images and implement lazy loading
8. SEO optimization (meta tags, Open Graph, structured data)
9. Add demo video section
10. Performance testing and optimization

## Notes
- All mockup designs use realistic Indian school data (₹ currency, realistic student counts)
- Color palette adjusted from documentation for better contrast and professionalism
- Inter font family used throughout for modern SaaS aesthetic
- Glass morphism effects used sparingly for premium feel
- All forms have comprehensive validation
- Mobile-first responsive design approach
- Calendly integration uses provided widget code from user

## Environment Variables
**Frontend (.env):**
- REACT_APP_BACKEND_URL - Backend API URL (configured for production)

**Backend (.env):**
- MONGO_URL - MongoDB connection string (configured)
- DB_NAME - Database name (arctrack_db)
