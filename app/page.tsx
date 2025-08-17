"use client";

import { useState } from 'react';
import { DashboardHeader } from '@/components/dashboard-header';
import { RFPDashboard } from '@/components/rfp-dashboard';
import { DocumentManager } from '@/components/document-manager';
import { SemanticSearch } from '@/components/semantic-search';
import { AutoDraftGenerator } from '@/components/auto-draft-generator';
import { ApprovalWorkflow } from '@/components/approval-workflow';
import { AuditLogs } from '@/components/audit-logs';
import { cn } from '@/lib/utils';

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userRole, setUserRole] = useState<'sales' | 'legal' | 'technical'>('sales');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'documents', label: 'Documents', icon: '📄' },
    { id: 'search', label: 'Semantic Search', icon: '🔍' },
    { id: 'draft', label: 'Auto-Draft', icon: '✏️' },
    { id: 'approval', label: 'Approvals', icon: '✅' },
    { id: 'audit', label: 'Audit Logs', icon: '📝' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <DashboardHeader userRole={userRole} onRoleChange={setUserRole} />
      
      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-white shadow-lg h-[calc(100vh-80px)] p-4 border-r">
          <div className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200",
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                )}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'dashboard' && <RFPDashboard userRole={userRole} />}
          {activeTab === 'documents' && <DocumentManager userRole={userRole} />}
          {activeTab === 'search' && <SemanticSearch />}
          {activeTab === 'draft' && <AutoDraftGenerator userRole={userRole} />}
          {activeTab === 'approval' && <ApprovalWorkflow userRole={userRole} />}
          {activeTab === 'audit' && <AuditLogs userRole={userRole} />}
        </main>
      </div>
    </div>
  );
}