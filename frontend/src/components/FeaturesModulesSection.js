import React from 'react';
import { 
  DollarSign, 
  Users, 
  Bus, 
  BookOpen, 
  MessageSquare, 
  BarChart3,
  Calendar,
  FileText,
  Shield,
  Smartphone,
  Globe,
  Settings
} from 'lucide-react';

const FeaturesModulesSection = () => {
  const modules = [
    {
      icon: DollarSign,
      name: 'Fee Management',
      description: 'Complete fee collection, tracking, and reconciliation'
    },
    {
      icon: Users,
      name: 'Student Management',
      description: 'Centralized student records and profiles'
    },
    {
      icon: Calendar,
      name: 'Attendance System',
      description: 'Digital attendance marking and tracking'
    },
    {
      icon: Bus,
      name: 'Transport Management',
      description: 'Route optimization and GPS tracking'
    },
    {
      icon: BookOpen,
      name: 'Academics & Exams',
      description: 'Exam scheduling, results, and report cards'
    },
    {
      icon: MessageSquare,
      name: 'Communication',
      description: 'Parent and teacher mobile apps'
    },
    {
      icon: FileText,
      name: 'Admissions',
      description: 'Online application and enrollment management'
    },
    {
      icon: BarChart3,
      name: 'Analytics & Reports',
      description: 'Real-time insights and data visualization'
    },
    {
      icon: Smartphone,
      name: 'Mobile Apps',
      description: 'Native iOS and Android apps for parents & teachers'
    },
    {
      icon: Globe,
      name: 'School Website',
      description: 'Premium, modern website included free'
    },
    {
      icon: Shield,
      name: 'Security & Compliance',
      description: 'DPDP Act compliant with bank-grade encryption'
    },
    {
      icon: Settings,
      name: 'Custom Integration',
      description: 'API access for third-party integrations'
    }
  ];

  return (
    <section id="modules" className="section-padding bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Complete <span className="gradient-text">School Management</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
            Everything you need to run a modern school, in one platform
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => {
            const Icon = module.icon;
            return (
              <div 
                key={index}
                className="glass-effect rounded-xl p-6 hover:border-sky-500/50 transition-all duration-300 group"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-sky-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-sky-500/30 transition-colors">
                    <Icon size={24} className="text-sky-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-2">{module.name}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{module.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesModulesSection;
