import React from 'react';
import { Header } from '../../components/others/Header';
import { KPICards } from '../../components/others/KPICards';
import { LeadManagement } from '../../components/others/LeadManagement';
import { CommissionTracker } from '../../components/others/CommissionTracker';
import { ProjectMatcher } from '../../components/others/ProjectMatcher';
import Footer from '../../components/others/Footer';

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