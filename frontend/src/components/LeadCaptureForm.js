import React, { useState } from 'react';
import { X, School, Users, MapPin, User, Mail, Phone, Loader2 } from 'lucide-react';
import { studentStrengthOptions, indianCities } from '../utils/mockData';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const LeadCaptureForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    schoolName: '',
    studentStrength: '',
    city: '',
    contactName: '',
    email: '',
    phone: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.schoolName.trim()) {
      newErrors.schoolName = 'School name is required';
    }
    
    if (!formData.studentStrength) {
      newErrors.studentStrength = 'Please select student strength';
    }
    
    if (!formData.city) {
      newErrors.city = 'Please select city';
    }
    
    if (!formData.contactName.trim()) {
      newErrors.contactName = 'Contact name is required';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await axios.post(`${API}/leads`, {
        schoolName: formData.schoolName,
        studentStrength: formData.studentStrength,
        city: formData.city,
        contactName: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        source: 'Website Form'
      });

      // Redirect to success page with lead ID
      window.location.href = `/success?leadId=${response.data.id}`;
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error submitting your request. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-700 animate-fadeInUp">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-sky-500 to-blue-500 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Apply for Digital Upgrade</h2>
            <p className="text-blue-100 text-sm mt-1">Schedule your free consultation in the next step</p>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
            disabled={isSubmitting}
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* School Name */}
          <div>
            <label className="flex items-center space-x-2 text-white font-medium mb-2">
              <School size={18} className="text-sky-400" />
              <span>School Name *</span>
            </label>
            <input
              type="text"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleChange}
              placeholder="Enter your school name"
              className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg px-4 py-3 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
            />
            {errors.schoolName && <p className="text-red-400 text-sm mt-1">{errors.schoolName}</p>}
          </div>

          {/* Student Strength */}
          <div>
            <label className="flex items-center space-x-2 text-white font-medium mb-2">
              <Users size={18} className="text-sky-400" />
              <span>Student Strength *</span>
            </label>
            <select
              name="studentStrength"
              value={formData.studentStrength}
              onChange={handleChange}
              className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg px-4 py-3 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
            >
              <option value="">Select student strength</option>
              {studentStrengthOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            {errors.studentStrength && <p className="text-red-400 text-sm mt-1">{errors.studentStrength}</p>}
          </div>

          {/* City */}
          <div>
            <label className="flex items-center space-x-2 text-white font-medium mb-2">
              <MapPin size={18} className="text-sky-400" />
              <span>City *</span>
            </label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg px-4 py-3 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
            >
              <option value="">Select city</option>
              {indianCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
          </div>

          {/* Contact Name */}
          <div>
            <label className="flex items-center space-x-2 text-white font-medium mb-2">
              <User size={18} className="text-sky-400" />
              <span>Your Name *</span>
            </label>
            <input
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg px-4 py-3 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
            />
            {errors.contactName && <p className="text-red-400 text-sm mt-1">{errors.contactName}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center space-x-2 text-white font-medium mb-2">
              <Mail size={18} className="text-sky-400" />
              <span>Email Address *</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg px-4 py-3 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="flex items-center space-x-2 text-white font-medium mb-2">
              <Phone size={18} className="text-sky-400" />
              <span>Mobile Number *</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="9876543210"
              maxLength="10"
              className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg px-4 py-3 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
            />
            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-sky-500 to-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-sky-600 hover:to-blue-600 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <span>Continue to Schedule Demo</span>
            )}
          </button>

          <p className="text-slate-400 text-xs text-center">
            By submitting, you agree to our terms. We'll schedule a 30-minute consultation at your convenience in the next step.
          </p>
        </form>
      </div>
    </div>
  );
};

export default LeadCaptureForm;
