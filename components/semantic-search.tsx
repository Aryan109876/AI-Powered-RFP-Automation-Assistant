"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Sparkles, 
  FileText, 
  Clock, 
  Star,
  ExternalLink,
  Copy,
  ThumbsUp,
  Filter
} from 'lucide-react';

export function SemanticSearch() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const mockSearchResults = [
    {
      id: 1,
      document: "IBM Cloud Migration Best Practices",
      title: "Cloud Migration Strategy for Financial Services",
      content: "When migrating legacy banking systems to IBM Cloud, it's crucial to implement a phased approach that prioritizes security and regulatory compliance. Our proven methodology includes comprehensive risk assessment, data classification, and incremental migration phases...",
      similarity: 0.95,
      category: "Technical",
      tags: ["cloud migration", "financial services", "security"],
      citations: ["Section 3.2", "Appendix B"],
      lastUsed: "2024-12-01",
      useCount: 12,
    },
    {
      id: 2,
      document: "AI Analytics Case Study - RetailCorp",
      title: "AI-Powered Customer Analytics Implementation",
      content: "RetailCorp achieved a 34% increase in customer engagement through our AI analytics platform. The solution leverages machine learning algorithms to analyze customer behavior patterns and predict purchasing intent in real-time...",
      similarity: 0.89,
      category: "Sales",
      tags: ["ai analytics", "retail", "customer engagement"],
      citations: ["Case Study Overview", "Results Section"],
      lastUsed: "2024-11-28",
      useCount: 8,
    },
    {
      id: 3,
      document: "Security Architecture Framework",
      title: "Zero-Trust Security Implementation",
      content: "Our zero-trust security framework provides comprehensive protection for enterprise environments. The architecture includes identity verification, device authentication, and continuous monitoring to ensure security at every access point...",
      similarity: 0.82,
      category: "Technical",
      tags: ["security", "zero-trust", "architecture"],
      citations: ["Framework Design", "Implementation Guide"],
      lastUsed: "2024-11-25",
      useCount: 15,
    },
  ];

  const handleSearch = async () => {
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setSearchResults(mockSearchResults);
      setIsSearching(false);
    }, 1500);
  };

  const popularQueries = [
    "Cloud migration case studies",
    "AI implementation best practices",
    "Security compliance frameworks",
    "Digital transformation ROI",
    "Financial services solutions",
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Semantic Search</h2>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Advanced Filters
        </Button>
      </div>

      {/* Search Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            AI-Powered Document Search
          </CardTitle>
          <CardDescription>
            Search through past RFP responses using natural language queries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="e.g., 'Find cloud migration case studies for financial institutions'"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="text-lg"
                />
              </div>
              <Button 
                onClick={handleSearch} 
                disabled={isSearching || !query.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isSearching ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </>
                )}
              </Button>
            </div>

            {/* Popular Queries */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Popular searches:</p>
              <div className="flex flex-wrap gap-2">
                {popularQueries.map((popularQuery, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setQuery(popularQuery)}
                    className="text-sm"
                  >
                    {popularQuery}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <CardDescription>
              Found {searchResults.length} relevant passages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {searchResults.map((result) => (
                <div key={result.id} className="p-6 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{result.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {(result.similarity * 100).toFixed(0)}% match
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          {result.document}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Last used: {result.lastUsed}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          Used {result.useCount} times
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-gray-800 leading-relaxed mb-4">
                    {result.content}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {result.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>Citations:</span>
                      {result.citations.map((citation: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {citation}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {searchResults.length === 0 && !isSearching && (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Start Your Semantic Search
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Enter a natural language query to find relevant content from your RFP response library. 
              Our AI will understand the context and find the most relevant passages.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}