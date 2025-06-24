
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Share } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Project {
  id: number;
  title: string;
  location: string;
  price: string;
  status: string;
  delivery: string;
  image: string;
}

interface StoryGeneratorProps {
  project: Project;
  onDownload?: (projectId: number) => void;
}

const StoryGenerator: React.FC<StoryGeneratorProps> = ({ project, onDownload }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateStoryImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set Instagram Story dimensions
    canvas.width = 1080;
    canvas.height = 1920;

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, 1920);
    gradient.addColorStop(0, '#ec4899');
    gradient.addColorStop(0.5, '#8b5cf6');
    gradient.addColorStop(1, '#3b82f6');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1920);

    // Load and draw project image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      // Draw project image in center
      const imgSize = 800;
      const x = (1080 - imgSize) / 2;
      const y = 400;
      
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(x, y, imgSize, imgSize * 0.75, 20);
      ctx.clip();
      ctx.drawImage(img, x, y, imgSize, imgSize * 0.75);
      ctx.restore();

      // Add text overlay
      ctx.fillStyle = 'white';
      ctx.font = 'bold 72px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(project.title, 540, 300);

      ctx.font = '48px Arial';
      ctx.fillText(project.location, 540, 350);

      // Price banner
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(140, 1200, 800, 100);
      ctx.fillStyle = 'white';
      ctx.font = 'bold 56px Arial';
      ctx.fillText(`AED ${project.price}`, 540, 1260);

      // Status and delivery
      ctx.font = '42px Arial';
      ctx.fillText(`${project.status} • ${project.delivery}`, 540, 1350);

      // Call to action
      ctx.font = 'bold 48px Arial';
      ctx.fillText('DM for Details! 📲', 540, 1500);

      // Download the image
      downloadStory();
    };

    img.src = project.image;
  };

  const downloadStory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${project.title.replace(/\s+/g, '_')}_story.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // Store in shared stories
        const storyData = {
          projectId: project.id,
          title: project.title,
          location: project.location,
          price: project.price,
          timestamp: new Date().toISOString(),
          thumbnail: canvas.toDataURL(),
        };

        const existingStories = JSON.parse(localStorage.getItem('sharedStories') || '[]');
        existingStories.push(storyData);
        localStorage.setItem('sharedStories', JSON.stringify(existingStories));

        toast({
          title: "Story Downloaded!",
          description: "Ready to share on Instagram/WhatsApp",
        });

        onDownload?.(project.id);
      }
    }, 'image/png');
  };

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        className="hidden"
        width={1080}
        height={1920}
      />
      <Button
        onClick={generateStoryImage}
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
      >
        <Download size={16} />
        Download Story
      </Button>
    </div>
  );
};

export default StoryGenerator;
