"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp, 
  Users,
  Target,
  Calendar
} from 'lucide-react';

interface RFPDashboardProps {
  userRole: 'sales' | 'legal' | 'technical';
}

export function RFPDashboard({ userRole }: RFPDashboardProps) {
  const mockRFPs = [
    {
      id: 1,
      title: "Global Bank Digital Transformation",
      client: "First National Bank",
      status: "in-progress",
      progress: 65,
      deadline: "2025-01-15",
      priority: "high",
      team: ["Sales", "Technical", "Legal"],
    },
    {
      id: 2,
      title: "Cloud Migration for Healthcare",
      client: "MedTech Solutions",
      status: "review",
      progress: 85,
      deadline: "2025-01-10",
      priority: "urgent",
      team: ["Sales", "Technical"],
    },
    {
      id: 3,
      title: "AI Analytics Platform",
      client: "RetailCorp",
      status: "draft",
      progress: 30,
      deadline: "2025-01-20",
      priority: "medium",
      team: ["Sales", "Technical"],
    },
  ];

  const stats = [
    { label: "Active RFPs", value: "12", icon: FileText, color: "text-blue-600" },
    { label: "Pending Reviews", value: "5", icon: Clock, color: "text-orange-600" },
    { label: "Completed This Month", value: "8", icon: CheckCircle, color: "text-green-600" },
    { label: "Win Rate", value: "74%", icon: TrendingUp, color: "text-purple-600" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'review': return 'bg-orange-100 text-orange-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <FileText className="w-4 h-4 mr-2" />
          New RFP
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active RFPs */}
      <Card>
        <CardHeader>
          <CardTitle>Active RFPs</CardTitle>
          <CardDescription>Track progress and manage ongoing proposals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRFPs.map((rfp) => (
              <div key={rfp.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{rfp.title}</h3>
                    <p className="text-sm text-gray-600">{rfp.client}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(rfp.status)} variant="secondary">
                      {rfp.status}
                    </Badge>
                    <Badge className={getPriorityColor(rfp.priority)} variant="secondary">
                      {rfp.priority}
                    </Badge>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{rfp.progress}%</span>
                  </div>
                  <Progress value={rfp.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Due: {rfp.deadline}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <div className="flex gap-1">
                      {rfp.team.map((member, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {member}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Smart Search</h3>
            <p className="text-sm text-gray-600">Find relevant past responses using AI</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <AlertCircle className="w-12 h-12 text-orange-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Auto-Draft</h3>
            <p className="text-sm text-gray-600">Generate responses with RAG technology</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Collaborate</h3>
            <p className="text-sm text-gray-600">Review and approve with your team</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}