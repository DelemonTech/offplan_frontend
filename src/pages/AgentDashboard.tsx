import React from 'react';
import { Header } from '../components/Header';
import { KPICards } from '../components/KPICards';
import { LeadManagement } from '../components/LeadManagement';
import { CommissionTracker } from '../components/CommissionTracker';
import { ProjectMatcher } from '../components/ProjectMatcher';
import Footer from '../components/Footer';

export const AgentDashboard = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <KPICards />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <LeadManagement />
          <CommissionTracker />
        </div>
        <ProjectMatcher />
      </main>
        <Footer/>
    </div>
  );
};

export default AgentDashboard;