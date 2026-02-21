// Mock data for ArcTrack Landing Page

export const heroStats = [
  { value: "500+", label: "Schools Digitized" },
  { value: "2.5L+", label: "Students Managed" },
  { value: "₹125Cr+", label: "Fees Processed" }
];

export const painPoints = [
  {
    id: 1,
    title: "Fee Leakage & Revenue Chaos",
    description: "Manual fee tracking leads to reconciliation nightmares. Parents pay late, records get lost, and your revenue suffers.",
    impact: "Average 12-18% revenue leakage"
  },
  {
    id: 2,
    title: "WhatsApp Communication Overload",
    description: "Important announcements buried in endless group chats. Parents miss updates, teachers waste hours, confusion everywhere.",
    impact: "4-6 hours wasted daily"
  },
  {
    id: 3,
    title: "Zero Real-Time Visibility",
    description: "You're running blind. No dashboard to see today's attendance, pending admissions, or fee collection status instantly.",
    impact: "Decision delays cost growth"
  }
];

export const solutionPillars = [
  {
    id: "revenue",
    name: "Revenue Command Center",
    tagline: "Complete Financial Control",
    features: [
      "Real-time fee collection dashboard",
      "Automated payment reminders via SMS/WhatsApp",
      "Multi-payment gateway integration (UPI, Cards, Net Banking)",
      "Instant reconciliation reports",
      "Late fee automation"
    ],
    mockupData: {
      totalCollected: "₹1.82 Cr",
      pendingDues: "₹24.5 L",
      collectionRate: "88.6%",
      monthlyGrowth: "+12.3%"
    }
  },
  {
    id: "communication",
    name: "Communication Nexus",
    tagline: "End WhatsApp Chaos",
    features: [
      "Dedicated Parent & Teacher mobile apps",
      "Smart push notifications for attendance, fees, events",
      "Digital homework submission & tracking",
      "In-app messaging with read receipts",
      "Photo & video gallery sharing"
    ],
    mockupData: {
      messagesSent: "45,230",
      appActiveUsers: "1,847",
      avgReadRate: "94.2%"
    }
  },
  {
    id: "operations",
    name: "Operational Control Panel",
    tagline: "CEO-Level Visibility",
    features: [
      "Live attendance tracking (class & bus)",
      "Real-time admission pipeline dashboard",
      "Staff attendance & payroll management",
      "Exam scheduling & result publication",
      "Transport route optimization"
    ],
    mockupData: {
      todayAttendance: "94.7%",
      pendingAdmissions: 23,
      activeRoutes: 12,
      examScheduled: 8
    }
  }
];

export const freeWebsiteBonus = {
  title: "Premium School Website Included",
  subtitle: "Valued at ₹40,000 - Yours Complimentary",
  features: [
    "Modern, mobile-responsive design",
    "SEO-optimized for local search",
    "Online admission form integration",
    "Photo gallery & events section",
    "Google Maps integration",
    "Fast hosting & SSL security"
  ],
  cta: "See how your website could look"
};

export const roiMetrics = [
  {
    metric: "Revenue Recovery",
    value: "15-20%",
    description: "Increase in fee collection rates"
  },
  {
    metric: "Time Saved",
    value: "25+ hrs",
    description: "Per week on admin tasks"
  },
  {
    metric: "Parent Satisfaction",
    value: "4.8/5",
    description: "Average app rating"
  },
  {
    metric: "Setup Time",
    value: "7 Days",
    description: "From signup to go-live"
  }
];

export const pricingPlans = [
  {
    id: "essential",
    name: "Essential",
    tagline: "Perfect for 300-800 students",
    price: "Contact for pricing",
    features: [
      "Complete Fee Management",
      "Attendance System",
      "Parent Mobile App",
      "Basic Reports",
      "Free Premium Website"
    ],
    recommended: false
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Ideal for 800-1500 students",
    price: "Contact for pricing",
    features: [
      "Everything in Essential",
      "Transport Management",
      "Exam & Result System",
      "Advanced Analytics",
      "WhatsApp Integration",
      "Priority Support"
    ],
    recommended: true
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For 1500+ students",
    price: "Custom pricing",
    features: [
      "Everything in Premium",
      "Multi-branch Support",
      "Custom Integrations",
      "Dedicated Account Manager",
      "White-label Options",
      "24/7 Premium Support"
    ],
    recommended: false
  }
];

export const features = [
  {
    category: "Fee Management",
    items: [
      "Automated fee structure setup",
      "Online payment collection",
      "SMS/Email payment reminders",
      "Discount & scholarship management",
      "Financial reports & analytics"
    ]
  },
  {
    category: "Communication",
    items: [
      "Parent mobile app (iOS & Android)",
      "Teacher mobile app",
      "Push notifications",
      "Digital homework submission",
      "Event calendar & announcements"
    ]
  },
  {
    category: "Attendance & Transport",
    items: [
      "Digital attendance marking",
      "Bus tracking with GPS",
      "Route optimization",
      "Parent pickup alerts",
      "Attendance analytics"
    ]
  },
  {
    category: "Academics",
    items: [
      "Exam scheduling",
      "Online result publication",
      "Report card generation",
      "Assignment management",
      "Performance analytics"
    ]
  }
];

export const studentStrengthOptions = [
  { value: "300-500", label: "300-500 students" },
  { value: "501-800", label: "501-800 students" },
  { value: "801-1200", label: "801-1200 students" },
  { value: "1201-1500", label: "1201-1500 students" },
  { value: "1501-2000", label: "1501-2000 students" },
  { value: "2000+", label: "2000+ students" }
];

export const indianCities = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai",
  "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Surat",
  "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane",
  "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad", "Patna", "Vadodara",
  "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad",
  "Meerut", "Rajkot", "Kalyan-Dombivali", "Vasai-Virar", "Varanasi",
  "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai",
  "Allahabad", "Ranchi", "Howrah", "Coimbatore", "Jabalpur",
  "Gwalior", "Vijayawada", "Jodhpur", "Madurai", "Raipur",
  "Kota", "Chandigarh", "Guwahati", "Solapur", "Hubli-Dharwad"
].sort();

export const securityFeatures = [
  {
    icon: "Shield",
    title: "Bank-Grade Security",
    description: "256-bit SSL encryption for all data"
  },
  {
    icon: "Lock",
    title: "DPDP Act Compliant",
    description: "Full compliance with Indian data protection laws"
  },
  {
    icon: "Server",
    title: "Secure Cloud Hosting",
    description: "99.9% uptime with automated backups"
  },
  {
    icon: "CheckCircle",
    title: "Payment Security",
    description: "PCI-DSS compliant payment processing"
  }
];
