"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  MessageSquare, 
  User, 
  Calendar,
  AlertCircle,
  Edit3,
  Send,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

interface ApprovalWorkflowProps {
  userRole: 'sales' | 'legal' | 'technical';
}

export function ApprovalWorkflow({ userRole }: ApprovalWorkflowProps) {
  const [selectedRFP, setSelectedRFP] = useState<string>('1');
  const [comment, setComment] = useState('');

  const mockRFPs = [
    {
      id: '1',
      title: "Global Bank Digital Transformation",
      client: "First National Bank",
      status: "pending-review",
      currentStage: "Legal Review",
      progress: 75,
      deadline: "2025-01-15",
      workflow: [
        { role: 'sales', status: 'approved', user: 'John Smith', date: '2024-12-10', comment: 'Technical content looks good, pricing approved.' },
        { role: 'technical', status: 'approved', user: 'Sarah Johnson', date: '2024-12-12', comment: 'Architecture and timelines are accurate.' },
        { role: 'legal', status: 'pending', user: 'Mike Davis', date: null, comment: null },
      ],
      comments: [
        { user: 'John Smith', role: 'Sales', date: '2024-12-10', comment: 'Updated pricing based on competitive analysis.' },
        { user: 'Sarah Johnson', role: 'Technical', date: '2024-12-12', comment: 'Added security compliance details for banking regulations.' },
      ],
    },
    {
      id: '2',
      title: "Cloud Migration for Healthcare",
      client: "MedTech Solutions",
      status: "approved",
      currentStage: "Completed",
      progress: 100,
      deadline: "2025-01-10",
      workflow: [
        { role: 'sales', status: 'approved', user: 'John Smith', date: '2024-12-08', comment: 'Competitive pricing strategy approved.' },
        { role: 'technical', status: 'approved', user: 'Lisa Chen', date: '2024-12-09', comment: 'HIPAA compliance verified.' },
        { role: 'legal', status: 'approved', user: 'Mike Davis', date: '2024-12-11', comment: 'All regulatory requirements addressed.' },
      ],
      comments: [
        { user: 'Lisa Chen', role: 'Technical', date: '2024-12-09', comment: 'Added specific HIPAA compliance certifications.' },
        { user: 'Mike Davis', role: 'Legal', date: '2024-12-11', comment: 'Contract terms are favorable and compliant.' },
      ],
    },
  ];

  const selectedRFPData = mockRFPs.find(rfp => rfp.id === selectedRFP);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'pending-review': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStageIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'pending': return <Clock className="w-5 h-5 text-yellow-600" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const canApprove = (stage: any) => {
    return stage.role === userRole && stage.status === 'pending';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Approval Workflow</h2>
        <Badge className="bg-blue-100 text-blue-800" variant="secondary">
          {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Role
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* RFP List */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Reviews</CardTitle>
            <CardDescription>RFPs requiring your attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockRFPs.map((rfp) => (
              <div
                key={rfp.id}
                onClick={() => setSelectedRFP(rfp.id)}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedRFP === rfp.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-sm">{rfp.title}</h3>
                  <Badge className={getStatusColor(rfp.status)} variant="secondary">
                    {rfp.status.replace('-', ' ')}
                  </Badge>
                </div>
                <p className="text-xs text-gray-600 mb-2">{rfp.client}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Due: {rfp.deadline}</span>
                  <span className="font-medium">{rfp.currentStage}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Workflow Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{selectedRFPData?.title}</CardTitle>
            <CardDescription>
              {selectedRFPData?.client} • Due: {selectedRFPData?.deadline}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Workflow Stages */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Approval Stages</h3>
              <div className="space-y-4">
                {selectedRFPData?.workflow.map((stage, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="flex items-center gap-3 flex-1">
                      {getStageIcon(stage.status)}
                      <div>
                        <p className="font-medium text-gray-900 capitalize">
                          {stage.role} Review
                        </p>
                        {stage.user && (
                          <p className="text-sm text-gray-600">by {stage.user}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      {stage.date && (
                        <p className="text-sm text-gray-600">{stage.date}</p>
                      )}
                      <Badge className={getStatusColor(stage.status)} variant="secondary">
                        {stage.status}
                      </Badge>
                    </div>

                    {canApprove(stage) && (
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <ThumbsUp className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-800">
                          <ThumbsDown className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Comments Section */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Comments & Feedback
              </h3>
              
              <div className="space-y-4 mb-4">
                {selectedRFPData?.comments.map((comment, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-blue-600 text-white text-sm">
                        {comment.user.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900">{comment.user}</span>
                        <Badge variant="outline" className="text-xs">
                          {comment.role}
                        </Badge>
                        <span className="text-xs text-gray-500">{comment.date}</span>
                      </div>
                      <p className="text-gray-700">{comment.comment}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Comment */}
              <div className="space-y-3">
                <Textarea
                  placeholder="Add your feedback or comments..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                />
                <div className="flex justify-between items-center">
                  <Button variant="outline">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Suggest Edits
                  </Button>
                  <Button>
                    <Send className="w-4 h-4 mr-2" />
                    Post Comment
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}