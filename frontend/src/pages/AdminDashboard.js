import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Mail, Phone, MapPin, Calendar, CheckCircle, Clock, X } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const ADMIN_PASSWORD = 'arctrack2024'; // In production, use proper auth

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchLeads();
    } else {
      alert('Invalid password');
    }
  };

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/leads`);
      setLeads(response.data);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (leadId, newStatus) => {
    try {
      await axios.patch(`${API}/leads/${leadId}`, { status: newStatus });
      fetchLeads();
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };

  const filteredLeads = filter === 'all' 
    ? leads 
    : leads.filter(lead => lead.status.toLowerCase() === filter.toLowerCase());

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'New').length,
    contacted: leads.filter(l => l.status === 'Contacted').length,
    converted: leads.filter(l => l.status === 'Converted').length
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="max-w-md w-full glass-effect rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg px-4 py-3 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            />
            <button
              type="submit"
              className="w-full bg-sky-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-600 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Lead Management Dashboard</h1>
            <p className="text-slate-400">Manage and track all incoming leads</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
          >
            Back to Website
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-effect rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">Total Leads</span>
              <Users size={20} className="text-sky-400" />
            </div>
            <div className="text-3xl font-bold text-white">{stats.total}</div>
          </div>
          <div className="glass-effect rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">New</span>
              <Clock size={20} className="text-yellow-400" />
            </div>
            <div className="text-3xl font-bold text-white">{stats.new}</div>
          </div>
          <div className="glass-effect rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">Contacted</span>
              <Phone size={20} className="text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white">{stats.contacted}</div>
          </div>
          <div className="glass-effect rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">Converted</span>
              <CheckCircle size={20} className="text-green-400" />
            </div>
            <div className="text-3xl font-bold text-white">{stats.converted}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex space-x-4 mb-6">
          {['all', 'new', 'contacted', 'converted'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === f
                  ? 'bg-sky-500 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Leads Table */}
        <div className="glass-effect rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-slate-400">Loading leads...</div>
          ) : filteredLeads.length === 0 ? (
            <div className="p-12 text-center text-slate-400">No leads found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">School</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Contact</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Details</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-white font-medium">{lead.schoolName}</div>
                        <div className="text-slate-400 text-sm">{lead.studentStrength}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-white">{lead.contactName}</div>
                        <div className="flex items-center space-x-2 text-slate-400 text-sm mt-1">
                          <Mail size={14} />
                          <span>{lead.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-slate-400 text-sm">
                          <Phone size={14} />
                          <span>{lead.phone}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2 text-slate-400 text-sm">
                          <MapPin size={14} />
                          <span>{lead.city}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2 text-slate-400 text-sm">
                          <Calendar size={14} />
                          <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          lead.status === 'New' ? 'bg-yellow-500/20 text-yellow-400' :
                          lead.status === 'Contacted' ? 'bg-blue-500/20 text-blue-400' :
                          lead.status === 'Converted' ? 'bg-green-500/20 text-green-400' :
                          'bg-slate-500/20 text-slate-400'
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                          className="bg-slate-700 text-white text-sm rounded px-2 py-1 border border-slate-600 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Qualified">Qualified</option>
                          <option value="Converted">Converted</option>
                          <option value="Lost">Lost</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
