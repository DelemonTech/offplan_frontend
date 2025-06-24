
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Calendar, BarChart3 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SharedStory {
  projectId: number;
  title: string;
  location: string;
  price: string;
  timestamp: string;
  thumbnail: string;
}

const SharedStories: React.FC = () => {
  const [stories, setStories] = useState<SharedStory[]>([]);
  const [shareStats, setShareStats] = useState<any[]>([]);

  useEffect(() => {
    // Load shared stories from localStorage
    const loadedStories = JSON.parse(localStorage.getItem('sharedStories') || '[]');
    setStories(loadedStories.reverse()); // Show newest first

    // Load share stats
    const loadedStats = JSON.parse(localStorage.getItem('shareStats') || '[]');
    setShareStats(loadedStats);
  }, []);

  const handleRedownload = (story: SharedStory) => {
    // Create download link from stored thumbnail
    const link = document.createElement('a');
    link.href = story.thumbnail;
    link.download = `${story.title.replace(/\s+/g, '_')}_story.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Story Re-downloaded!",
      description: "Ready to share again",
    });
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTotalShares = () => {
    return shareStats.length;
  };

  const getTopPlatform = () => {
    const platforms = shareStats.reduce((acc, share) => {
      acc[share.platform] = (acc[share.platform] || 0) + 1;
      return acc;
    }, {});
    
    return Object.keys(platforms).length > 0 
      ? Object.keys(platforms).reduce((a, b) => platforms[a] > platforms[b] ? a : b)
      : 'N/A';
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Download className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Stories Created</p>
                <p className="text-2xl font-bold">{stories.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Total Shares</p>
                <p className="text-2xl font-bold">{getTotalShares()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Top Platform</p>
                <p className="text-lg font-bold capitalize">{getTopPlatform()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shared Stories Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Shared Stories</CardTitle>
        </CardHeader>
        <CardContent>
          {stories.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Download className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No stories created yet</p>
              <p className="text-sm">Download your first project story to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stories.map((story, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="aspect-[9/16] bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={story.thumbnail}
                      alt={story.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">{story.title}</h4>
                    <p className="text-xs text-gray-600">{story.location}</p>
                    <Badge variant="secondary" className="text-xs">
                      AED {story.price}
                    </Badge>
                    <p className="text-xs text-gray-500">
                      {formatDate(story.timestamp)}
                    </p>
                  </div>

                  <Button
                    onClick={() => handleRedownload(story)}
                    variant="outline"
                    size="sm"
                    className="w-full flex items-center gap-2"
                  >
                    <Download size={14} />
                    Re-download
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SharedStories;
