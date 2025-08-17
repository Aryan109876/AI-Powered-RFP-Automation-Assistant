"use client";

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Settings, User } from 'lucide-react';

interface DashboardHeaderProps {
  userRole: 'sales' | 'legal' | 'technical';
  onRoleChange: (role: 'sales' | 'legal' | 'technical') => void;
}

export function DashboardHeader({ userRole, onRoleChange }: DashboardHeaderProps) {
  const roleColors = {
    sales: 'bg-green-100 text-green-800',
    legal: 'bg-purple-100 text-purple-800',
    technical: 'bg-blue-100 text-blue-800',
  };

  return (
    <header className="bg-white shadow-sm border-b h-20 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">AI</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">RFP Automation Assistant</h1>
            <p className="text-sm text-gray-500">IBM Technical Sales Platform</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Role:</span>
          <Badge className={roleColors[userRole]} variant="secondary">
            {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
          </Badge>
          <select
            value={userRole}
            onChange={(e) => onRoleChange(e.target.value as 'sales' | 'legal' | 'technical')}
            className="ml-2 px-3 py-1 border rounded-md text-sm"
          >
            <option value="sales">Sales</option>
            <option value="legal">Legal</option>
            <option value="technical">Technical</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Bell className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <User className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}