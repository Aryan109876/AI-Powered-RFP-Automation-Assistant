"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit3, 
  FileText,
  CheckCircle,
  XCircle,
  Upload,
  Calendar,
  Clock,
  User,
  AlertCircle
} from 'lucide-react';

interface AuditLogsProps {
  userRole: 'sales' | 'legal' | 'technical';
}

export function AuditLogs({ userRole }: AuditLogsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const mockAuditLogs = [
    {
      id: 1,
      action: 'RFP_APPROVED',
      description: 'Global Bank Digital Transformation RFP approved by Legal team',
      user: 'Mike Davis',
      role: 'Legal',
      timestamp: '2024-12-15 14:32:00',
      rfpId: 'RFP-2024-001',
      details: {
        previousStatus: 'pending-legal-review',
        newStatus: 'approved',
        changes: ['Added compliance section', 'Updated contract terms']
      },
      severity: 'info',
    },
    {
      id: 2,
      action: 'DOCUMENT_UPLOADED',
      description: 'New case study uploaded: AI Analytics for Financial Services',
      user: 'Sarah Johnson',
      role: 'Technical',
      timestamp: '2024-12-15 11:45:00',
      rfpId: null,
      details: {
        fileName: 'AI-Analytics-Financial-Case-Study.pdf',
        fileSize: '3.2 MB',
        processed: true
      },
      severity: 'info',
    },
    {
      id: 3,
      action: 'RFP_REJECTED',
      description: 'Healthcare Cloud Migration RFP rejected due to compliance issues',
      user: 'Mike Davis',
      role: 'Legal',
      timestamp: '2024-12-14 16:20:00',
      rfpId: 'RFP-2024-002',
      details: {
        reason: 'HIPAA compliance requirements not adequately addressed',
        feedback: 'Requires additional security certifications'
      },
      severity: 'warning',
    },
    {
      id: 4,
      action: 'AUTO_DRAFT_GENERATED',
      description: 'AI draft generated for RetailCorp Analytics Platform proposal',
      user: 'System',
      role: 'AI',
      timestamp: '2024-12-14 09:15:00',
      rfpId: 'RFP-2024-003',
      details: {
        sourceDocs: 5,
        confidence: 0.92,
        citationsUsed: 12
      },
      severity: 'info',
    },
    {
      id: 5,
      action: 'SEARCH_PERFORMED',
      description: 'Semantic search: "cloud security frameworks for financial institutions"',
      user: 'John Smith',
      role: 'Sales',
      timestamp: '2024-12-13 13:28:00',
      rfpId: null,
      details: {
        query: 'cloud security frameworks for financial institutions',
        resultsFound: 8,
        documentsAccessed: 3
      },
      severity: 'info',
    },
    {
      id: 6,
      action: 'PERMISSION_VIOLATION',
      description: 'Attempted unauthorized access to legal documents',
      user: 'Unknown User',
      role: 'External',
      timestamp: '2024-12-13 02:45:00',
      rfpId: null,
      details: {
        ipAddress: '192.168.1.100',
        attemptedAction: 'download_legal_document',
        blocked: true
      },
      severity: 'error',
    },
  ];

  const filters = [
    { value: 'all', label: 'All Actions' },
    { value: 'rfp', label: 'RFP Actions' },
    { value: 'document', label: 'Document Actions' },
    { value: 'search', label: 'Search Actions' },
    { value: 'security', label: 'Security Events' },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'success': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'info': return <Eye className="w-4 h-4 text-blue-600" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'RFP_APPROVED':
      case 'RFP_REJECTED':
        return <CheckCircle className="w-5 h-5" />;
      case 'DOCUMENT_UPLOADED':
        return <Upload className="w-5 h-5" />;
      case 'AUTO_DRAFT_GENERATED':
        return <Edit3 className="w-5 h-5" />;
      case 'SEARCH_PERFORMED':
        return <Search className="w-5 h-5" />;
      case 'PERMISSION_VIOLATION':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const filteredLogs = mockAuditLogs.filter(log => {
    const matchesSearch = log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'rfp' && log.action.includes('RFP')) ||
                         (selectedFilter === 'document' && log.action.includes('DOCUMENT')) ||
                         (selectedFilter === 'search' && log.action.includes('SEARCH')) ||
                         (selectedFilter === 'security' && log.action.includes('VIOLATION'));
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Audit Logs</h2>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Logs
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search logs by action, user, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm"
              >
                {filters.map(filter => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </select>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Date Range
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Log Entries */}
      <Card>
        <CardHeader>
          <CardTitle>System Activity Log</CardTitle>
          <CardDescription>
            {filteredLogs.length} entries found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLogs.map((log) => (
              <div key={log.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {getActionIcon(log.action)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{log.description}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3 text-gray-500" />
                            <span className="text-sm text-gray-600">{log.user}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {log.role}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-gray-500" />
                            <span className="text-sm text-gray-600">{log.timestamp}</span>
                          </div>
                          {log.rfpId && (
                            <Badge variant="outline" className="text-xs">
                              {log.rfpId}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {getSeverityIcon(log.severity)}
                        <Badge className={getSeverityColor(log.severity)} variant="secondary">
                          {log.severity}
                        </Badge>
                      </div>
                    </div>

                    {/* Details */}
                    {log.details && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          {Object.entries(log.details).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-gray-600 capitalize">
                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                              </span>
                              <span className="text-gray-900 font-medium">
                                {Array.isArray(value) ? value.join(', ') : String(value)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">247</div>
            <p className="text-sm text-gray-600">Total Actions Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">12</div>
            <p className="text-sm text-gray-600">RFPs Approved</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">85</div>
            <p className="text-sm text-gray-600">Documents Processed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-red-600 mb-1">3</div>
            <p className="text-sm text-gray-600">Security Alerts</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}