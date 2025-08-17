"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Wand2, 
  FileText, 
  Download, 
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Copy,
  Edit3,
  Sparkles
} from 'lucide-react';

interface AutoDraftGeneratorProps {
  userRole: 'sales' | 'legal' | 'technical';
}

export function AutoDraftGenerator({ userRole }: AutoDraftGeneratorProps) {
  const [requirements, setRequirements] = useState('');
  const [clientName, setClientName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDraft, setGeneratedDraft] = useState('');
  const [citations, setCitations] = useState<any[]>([]);

  const mockCitations = [
    {
      id: 1,
      document: "IBM Cloud Migration Best Practices",
      section: "Section 3.2 - Financial Services Migration",
      confidence: 0.94,
      used: true,
    },
    {
      id: 2,
      document: "AI Analytics Case Study - RetailCorp",
      section: "Implementation Timeline",
      confidence: 0.87,
      used: true,
    },
    {
      id: 3,
      document: "Security Architecture Framework", 
      section: "Compliance Requirements",
      confidence: 0.82,
      used: false,
    },
  ];

  const mockDraft = `# Cloud Migration and AI Analytics Solution for ${clientName || 'Your Organization'}

## Executive Summary

IBM proposes a comprehensive cloud migration and AI analytics solution designed to transform your organization's digital infrastructure while ensuring security, compliance, and operational excellence. Our proven methodology has successfully delivered similar transformations for leading financial institutions.

## Technical Approach

### Phase 1: Assessment and Planning (Weeks 1-4)
- Comprehensive infrastructure assessment using IBM Cloud Transformation Advisor
- Risk analysis and mitigation planning with focus on regulatory compliance
- Custom migration roadmap development

### Phase 2: Cloud Migration (Weeks 5-16) 
- Phased migration approach minimizing business disruption
- Implementation of IBM Cloud security frameworks
- Real-time monitoring and validation throughout the process

### Phase 3: AI Analytics Implementation (Weeks 12-20)
- Deployment of IBM Watson Studio and AI services
- Custom analytics models for your specific use cases
- Integration with existing business processes

## Expected Benefits
- **34% increase** in operational efficiency (based on similar implementations)
- **99.9% uptime** guarantee with IBM Cloud infrastructure
- **ROI of 250%** within 18 months

## Investment Summary
Total project investment: $2.4M over 20 weeks
Monthly subscription: $45,000 for cloud services and support

---
*This proposal is generated using AI-powered insights from similar successful implementations. All claims are supported by documented case studies and technical specifications.*`;

  const handleGenerate = async () => {
    setIsGenerating(true);
    setCitations(mockCitations);
    
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedDraft(mockDraft);
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Auto-Draft Generator</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          {generatedDraft && (
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          )}
        </div>
      </div>

      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            RFP Requirements
          </CardTitle>
          <CardDescription>
            Enter the RFP requirements and client details to generate an AI-powered draft response
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client Name
              </label>
              <Input
                placeholder="e.g., First National Bank"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Type
              </label>
              <select className="w-full px-3 py-2 border rounded-md text-sm">
                <option>Cloud Migration</option>
                <option>AI Implementation</option>
                <option>Digital Transformation</option>
                <option>Security Upgrade</option>
                <option>Data Analytics</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              RFP Requirements & Key Questions
            </label>
            <Textarea
              placeholder="Paste the RFP requirements here or describe the key questions that need to be addressed..."
              rows={6}
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
            />
          </div>

          <Button 
            onClick={handleGenerate}
            disabled={isGenerating || !requirements.trim() || !clientName.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Generating AI Draft...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2" />
                Generate AI-Powered Draft
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Citations Panel */}
      {citations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Source Citations</CardTitle>
            <CardDescription>
              AI-retrieved sources used in the draft generation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {citations.map((citation) => (
                <div key={citation.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      citation.used ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                    <div>
                      <p className="font-medium text-gray-900">{citation.document}</p>
                      <p className="text-sm text-gray-600">{citation.section}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {(citation.confidence * 100).toFixed(0)}% confidence
                    </Badge>
                    {citation.used && (
                      <Badge className="bg-green-100 text-green-800" variant="secondary">
                        Used
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Generated Draft */}
      {generatedDraft && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Generated Draft Response</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Regenerate
                </Button>
                <Button variant="outline" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" size="sm">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>
            </div>
            <CardDescription>
              AI-generated draft based on your requirements and past successful responses
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Quality Indicators */}
            <div className="flex gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-900">Compliance Check: Passed</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <span className="text-sm font-medium text-gray-900">Review Required: Legal Terms</span>
              </div>
            </div>

            {/* Draft Content */}
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-gray-800 bg-white p-6 border rounded-lg">
                {generatedDraft}
              </pre>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-6 pt-6 border-t">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Sparkles className="w-4 h-4" />
                Generated using RAG with {citations.filter(c => c.used).length} source documents
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  Send for Review
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve & Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!generatedDraft && !isGenerating && (
        <Card>
          <CardContent className="p-12 text-center">
            <Wand2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Ready to Generate Your RFP Response
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Fill in the client details and RFP requirements above, then click generate to create 
              an AI-powered draft response using relevant content from your document library.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}