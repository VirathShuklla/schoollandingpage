import React, { useState } from 'react';
import { DollarSign, MessageSquare, BarChart3, TrendingUp, Users, Smartphone } from 'lucide-react';
import { solutionPillars } from '../utils/mockData';

const SolutionPillarsSection = () => {
  const [activePillar, setActivePillar] = useState('revenue');

  const pillarIcons = {
    revenue: DollarSign,
    communication: MessageSquare,
    operations: BarChart3
  };

  const currentPillar = solutionPillars.find(p => p.id === activePillar);
  const Icon = pillarIcons[activePillar];

  return (
    <section id="features" className="section-padding bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            The ArcTrack <span className="gradient-text">Command System</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
            Three powerful pillars that give you complete control over your school's digital infrastructure
          </p>
        </div>

        {/* Pillar Tabs */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          {solutionPillars.map((pillar) => {
            const PillarIcon = pillarIcons[pillar.id];
            return (
              <button
                key={pillar.id}
                onClick={() => setActivePillar(pillar.id)}
                className={`flex items-center space-x-3 px-6 py-4 rounded-xl font-semibold transition-all ${
                  activePillar === pillar.id
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/40'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <PillarIcon size={20} />
                <span>{pillar.name}</span>
              </button>
            );
          })}
        </div>

        {/* Pillar Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Features List */}
          <div className="space-y-6 animate-fadeIn">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-sky-500/20 rounded-lg flex items-center justify-center">
                  <Icon size={24} className="text-sky-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{currentPillar.name}</h3>
                  <p className="text-sky-400">{currentPillar.tagline}</p>
                </div>
              </div>
            </div>

            <ul className="space-y-4">
              {currentPillar.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3 group">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                  <span className="text-slate-300 text-lg">{feature}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={onCTAClick}
              className="bg-gradient-to-r from-sky-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-sky-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg"
            >
              Explore {currentPillar.name}
            </button>
          </div>

          {/* Right: Dashboard Mockup */}
          <div className="animate-fadeIn">
            {activePillar === 'revenue' && <RevenueDashboard data={currentPillar.mockupData} />}
            {activePillar === 'communication' && <CommunicationDashboard data={currentPillar.mockupData} />}
            {activePillar === 'operations' && <OperationsDashboard data={currentPillar.mockupData} />}
          </div>
        </div>
      </div>
    </section>
  );
};

// Revenue Dashboard Mockup
const RevenueDashboard = ({ data }) => (
  <div className="dashboard-card">
    <div className="mb-6">
      <h4 className="text-slate-400 text-sm font-medium mb-2">Fee Collection Dashboard</h4>
      <p className="text-3xl font-bold text-white">{data.totalCollected}</p>
      <p className="text-green-400 text-sm flex items-center mt-1">
        <TrendingUp size={16} className="mr-1" />
        {data.monthlyGrowth} from last month
      </p>
    </div>
    
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-slate-800/50 rounded-lg p-4">
        <p className="text-slate-400 text-xs mb-1">Pending Dues</p>
        <p className="text-xl font-bold text-orange-400">{data.pendingDues}</p>
      </div>
      <div className="bg-slate-800/50 rounded-lg p-4">
        <p className="text-slate-400 text-xs mb-1">Collection Rate</p>
        <p className="text-xl font-bold text-green-400">{data.collectionRate}</p>
      </div>
    </div>

    {/* Simple Bar Chart Visualization */}
    <div className="space-y-3">
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-slate-400">Tuition Fees</span>
          <span className="text-white">₹1.2 Cr</span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-sky-500 to-blue-500" style={{ width: '85%' }}></div>
        </div>
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-slate-400">Transport Fees</span>
          <span className="text-white">₹42 L</span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-sky-500 to-blue-500" style={{ width: '70%' }}></div>
        </div>
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-slate-400">Other Fees</span>
          <span className="text-white">₹20 L</span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-sky-500 to-blue-500" style={{ width: '60%' }}></div>
        </div>
      </div>
    </div>
  </div>
);

// Communication Dashboard Mockup
const CommunicationDashboard = ({ data }) => (
  <div className="phone-mockup mx-auto" style={{ maxWidth: '320px' }}>
    <div className="bg-slate-900 rounded-3xl overflow-hidden">
      {/* Phone Header */}
      <div className="bg-gradient-to-r from-sky-500 to-blue-500 p-4 text-white">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">Parent App</h4>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-xs">Online</span>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="p-4 space-y-3">
        <div className="bg-sky-500/10 border border-sky-500/30 rounded-lg p-3">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Smartphone size={16} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium text-sm">Fee Payment Due</p>
              <p className="text-slate-400 text-xs mt-1">Q3 fees of ₹18,500 due by Jan 15</p>
              <button className="mt-2 bg-sky-500 text-white text-xs px-3 py-1 rounded">Pay Now</button>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-3">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Users size={16} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium text-sm">Attendance Alert</p>
              <p className="text-slate-400 text-xs mt-1">Rahul marked present at 8:45 AM</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-3">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <MessageSquare size={16} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium text-sm">New Homework</p>
              <p className="text-slate-400 text-xs mt-1">Math Ch-5 exercises assigned</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Footer */}
      <div className="bg-slate-800/30 p-4 grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="text-xs text-slate-400">Messages</p>
          <p className="text-white font-bold">{data.messagesSent}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Active Users</p>
          <p className="text-white font-bold">{data.appActiveUsers}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Read Rate</p>
          <p className="text-green-400 font-bold">{data.avgReadRate}</p>
        </div>
      </div>
    </div>
  </div>
);

// Operations Dashboard Mockup
const OperationsDashboard = ({ data }) => (
  <div className="dashboard-card">
    <div className="mb-6">
      <h4 className="text-slate-400 text-sm font-medium mb-4">Live Operations Dashboard</h4>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30 rounded-xl p-4">
          <p className="text-green-400 text-xs mb-1">Today's Attendance</p>
          <p className="text-3xl font-bold text-white">{data.todayAttendance}</p>
          <p className="text-xs text-slate-400 mt-1">1,421 of 1,500 present</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/30 rounded-xl p-4">
          <p className="text-orange-400 text-xs mb-1">Pending Admissions</p>
          <p className="text-3xl font-bold text-white">{data.pendingAdmissions}</p>
          <p className="text-xs text-slate-400 mt-1">Applications to review</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30 rounded-xl p-4">
          <p className="text-blue-400 text-xs mb-1">Active Routes</p>
          <p className="text-3xl font-bold text-white">{data.activeRoutes}</p>
          <p className="text-xs text-slate-400 mt-1">Buses on road</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30 rounded-xl p-4">
          <p className="text-purple-400 text-xs mb-1">Exams Scheduled</p>
          <p className="text-3xl font-bold text-white">{data.examScheduled}</p>
          <p className="text-xs text-slate-400 mt-1">This week</p>
        </div>
      </div>
    </div>

    <div className="bg-sky-500/10 border border-sky-500/30 rounded-lg p-4">
      <p className="text-sky-400 text-sm font-medium mb-2">Quick Actions Available</p>
      <div className="flex flex-wrap gap-2">
        {['Mark Attendance', 'Send Alert', 'View Reports', 'Manage Staff'].map((action, i) => (
          <span key={i} className="bg-slate-800 text-slate-300 text-xs px-3 py-1 rounded-full">
            {action}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default SolutionPillarsSection;
