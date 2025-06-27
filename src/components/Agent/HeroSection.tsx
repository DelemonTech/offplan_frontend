
import React from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp, MessageCircle, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import HeroVideo from '@/static/Unlock Dubai’s Best Off-Plan Deals with Nasser Dehghan (2).mp4';

const HeroSection = ({ agent }) => {
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(true);
  const [isMuted, setIsMuted] = React.useState(true);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleWhatsApp = () => {
    const message = `Hi Sahar! I'm interested in Offplan market properties. Can you share more details?`
    const whatsappUrl = `https://wa.me/${agent.whatsapp_number.replace(/\s+/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover lg:object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          poster="/lovable-uploads/8eae98ca-021a-42e1-b6ed-4146adf704b1.png"
          style={{
            aspectRatio: 'auto',
          }}
        >
          <source src={agent.introduction_video_url} type="video/mp4" />
          <source src="/path-to-your-video.webm" type="video/webm" />
          {/* Fallback image */}
          {/* <img 
            src="/lovable-uploads/8eae98ca-021a-42e1-b6ed-4146adf704b1.png" 
            alt="Sahar Kalhor - Off-Plan Expert"
            className="w-full h-full object-cover"
          /> */}
        </video>
      </div>

      {/* Minimal Overlay for Better Text Readability */}
      {/* <div className="absolute inset-0 bg-black/25 lg:bg-black/15"></div> */}

      {/* Video Controls - Desktop Only */}
      {/* <div className="hidden lg:flex absolute top-6 right-6 z-20 gap-2">
        <Button
          size="icon"
          variant="ghost"
          className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/20"
          onClick={togglePlay}
        >
          {isVideoPlaying ? <Pause size={20} /> : <Play size={20} />}
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/20"
          onClick={toggleMute}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </Button>
      </div> */}

      {/* Main Content - Clean and Minimal */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center space-y-3 lg:space-y-8">
            {/* Main Headline - Simplified for Mobile */}
            <div className="space-y-1 lg:space-y-4 text-white text-center font-semibold">
              <h1 className="text-4xl sm:text-3xl lg:text-7xl font-bold bg-gradient-to-r from-pink-700 to-blue-500 bg-clip-text text-transparent leading-tight">
                {agent.name}
              </h1>
              <div className='text-white/90 lg: text-2xl'>Off-Plan & Ready Property Expert | Dubai & UAE</div>
              <p className="text-sm sm:text-base lg:text-2xl text-white/90 font-light  max-w-2xl mx-auto px-2">

                Helping you find the right ready and off-plan properties in Dubai, Abu Dhabi, and across the UAE.
              </p>
            </div>

            {/* CTA Button - Single Button for Mobile */}
            <div className="flex justify-center items-center pt-3 lg:pt-6 px-4">
              <Button
                onClick={() => {
                  const el = document.getElementById('featured-projects');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-6 lg:px-8 py-3 lg:py-4 text-sm lg:text-lg shadow-lg hover:shadow-xl transition-all duration-300 border-0"
              >
                <TrendingUp size={16} className="mr-2" />
                Explore Projects
              </Button>

              {/* Secondary CTA - Desktop Only */}
              <Button
              onClick={handleWhatsApp}
                variant="outline"
                size="lg"
                className="hidden lg:inline-flex ml-4 border-2 border-white/50 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg transition-all duration-300"
              >
                <MessageCircle size={16} className="mr-2" />
                Chat with {agent.name}
              </Button>
            </div>

            {/* Trust Indicators - Desktop Only */}
            <div className="hidden lg:flex flex-wrap justify-center items-center gap-6 pt-8">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span className="text-sm text-white/80 font-medium">DLD Verified</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span className="text-sm text-white/80 font-medium">{agent.total_business_deals}  Deals Closed</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span className="text-sm text-white/80 font-medium">{agent.years_of_experience} of Experience</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Desktop Only */}
      {/* <div className="hidden lg:block absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/40 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div> */}
    </section>
  );
};

export default HeroSection;
