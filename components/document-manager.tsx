"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  FileText, 
  Filter, 
  Search, 
  Download, 
  Eye, 
  Trash2,
  Calendar,
  User,
  Tag
} from 'lucide-react';

interface DocumentManagerProps {
  userRole: 'sales' | 'legal' | 'technical';
}

export function DocumentManager({ userRole }: DocumentManagerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const mockDocuments = [
    {
      id: 1,
      title: "IBM Cloud Migration Best Practices",
      type: "PDF",
      category: "Technical",
      size: "2.4 MB",
      uploadDate: "2024-12-15",
      uploadedBy: "John Smith",
      status: "processed",
      tags: ["cloud", "migration", "best-practices"],
      embeddings: true,
    },
    {
      id: 2,
      title: "Financial Services Compliance Guide",
      type: "DOC",
      category: "Legal",
      size: "1.8 MB",
      uploadDate: "2024-12-10",
      uploadedBy: "Sarah Johnson",
      status: "processing",
      tags: ["compliance", "financial", "regulations"],
      embeddings: false,
    },
    {
      id: 3,
      title: "AI Analytics Case Study - RetailCorp",
      type: "PDF",
      category: "Sales",
      size: "3.2 MB",
      uploadDate: "2024-12-08",
      uploadedBy: "Mike Davis",
      status: "processed",
      tags: ["ai", "analytics", "case-study", "retail"],
      embeddings: true,
    },
    {
      id: 4,
      title: "Security Architecture Framework",
      type: "PDF",
      category: "Technical",
      size: "4.1 MB",
      uploadDate: "2024-12-05",
      uploadedBy: "Lisa Chen",
      status: "processed",
      tags: ["security", "architecture", "framework"],
      embeddings: true,
    },
  ];

  const categories = ["all", "Technical", "Legal", "Sales"];

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Document Management</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Upload className="w-4 h-4 mr-2" />
          Upload Documents
        </Button>
      </div>

      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>Upload New Documents</CardTitle>
          <CardDescription>
            Upload RFP responses, case studies, and technical documents for AI processing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">Drop files here or click to upload</p>
            <p className="text-sm text-gray-600 mb-4">Supports PDF, DOC, DOCX files up to 10MB</p>
            <Button variant="outline">Choose Files</Button>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search documents, tags, or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document List */}
      <Card>
        <CardHeader>
          <CardTitle>Document Library</CardTitle>
          <CardDescription>
            {filteredDocuments.length} documents found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{doc.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {doc.type}
                        </Badge>
                        <Badge className={getStatusColor(doc.status)} variant="secondary">
                          {doc.status}
                        </Badge>
                        {doc.embeddings && (
                          <Badge className="bg-purple-100 text-purple-800" variant="secondary">
                            AI Ready
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <span className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {doc.category}
                        </span>
                        <span>{doc.size}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {doc.uploadDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {doc.uploadedBy}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {doc.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                    {userRole === 'legal' && (
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}