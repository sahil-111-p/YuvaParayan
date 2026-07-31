import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import {
  Image as ImageIcon,
  X,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sliders,
  Tv,
  Film,
  ExternalLink,
  Layers,
  Clock
} from 'lucide-react';
import { EVENT_DETAILS } from '../data/parayanData';

interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  title: string;
  category: string;
  year: string;
  caption: string;
  imageUrl: string;
  videoUrl?: string;
  duration?: string;
  rotation?: string;
}

const HIGHLIGHTS_ITEMS: GalleryItem[] = [
  {
    id: 'gh-1',
    type: 'image',
    title: 'BAPS Swaminarayan Mandir Malad',
    category: 'Mandir Darshan',
    year: '2026',
    caption: 'The glorious Akshardham Complex venue hosting Yuva Parayan 2026.',
    imageUrl: '/src/assets/images/hero_mandir_parayan_1785262214909.jpg',
    rotation: '-rotate-2',
  },
  {
    id: 'gh-2',
    type: 'image',
    title: 'Shri Hari Leelamrutam Pujan',
    category: 'Holy Scripture',
    year: '2025',
    caption: 'Sacred scripture worshipping ceremony and daily katha recitations.',
    imageUrl: '/src/assets/images/shri_hari_leelamrutam_book_1785262229930.jpg',
    rotation: 'rotate-1',
  },
  {
    id: 'gh-3',
    type: 'image',
    title: 'Nishtha Day White Dress Assembly',
    category: '25 Years Journey',
    year: '2024',
    caption: 'Hundreds of youths unified in pristine white for Day 1 Nishtha theme.',
    imageUrl: '/src/assets/images/day1_nishtha_visual_1785262243317.jpg',
    rotation: '-rotate-1',
  },
  {
    id: 'gh-4',
    type: 'image',
    title: 'Traditional Evening Aarti & Diya',
    category: 'Evening Aarti',
    year: '2025',
    caption: 'Radiant atmosphere of lamps during Tap day maha aarti.',
    imageUrl: '/src/assets/images/day3_tap_visual_1785262257760.jpg',
    rotation: 'rotate-2',
  },
  {
    id: 'gh-5',
    type: 'image',
    title: 'Youth Volunteers Mahaprasad Seva',
    category: 'Seva Moments',
    year: '2023',
    caption: 'Joyful youth volunteers serving dinner with devotion and enthusiasm.',
    imageUrl: 'https://images.unsplash.com/photo-1541802645635-11f2286a7482?auto=format&fit=crop&w=800&q=80',
    rotation: '-rotate-3',
  },
  {
    id: 'gh-6',
    type: 'image',
    title: 'Musical Kirtan Aradhana Night',
    category: 'Devotional Music',
    year: '2022',
    caption: 'Symphony of tablas, harmoniums, and devotional voices by Yuva Music Group.',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    rotation: 'rotate-1',
  },
  {
    id: 'gh-7',
    type: 'image',
    title: 'Silver Jubilee Youth Assembly',
    category: 'Youth Fellowship',
    year: '2021',
    caption: 'Celebrating 25 years of youth brotherhood and Satsang unity.',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    rotation: '-rotate-2',
  },
  {
    id: 'gh-8',
    type: 'image',
    title: 'Akshardham Complex Illumination',
    category: 'Mandir Architecture',
    year: '2025',
    caption: 'Sacred mandir architecture lit up in divine grandeur for evening sabhas.',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
    rotation: 'rotate-3',
  },
  {
    id: 'gh-9',
    type: 'image',
    title: 'Historic 2001 Foundation Assembly',
    category: 'Heritage & Legacy',
    year: '2001',
    caption: 'The inaugural Yuva Parayan assembly that started the 25-year tradition.',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    rotation: '-rotate-1',
  },
  {
    id: 'gh-10',
    type: 'image',
    title: 'Community Sattvik Mahaprasad',
    category: 'Festive Dining',
    year: '2024',
    caption: 'Thousands sharing Mahaprasad with love at the Akshardham Dining Hall.',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    rotation: 'rotate-2',
  },
  {
    id: 'gh-11',
    type: 'image',
    title: 'Silver Jubilee Cultural Prelude',
    category: 'Preparations',
    year: '2026',
    caption: 'Volunteers and performers rehearsing for the 25th Silver Jubilee finale.',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    rotation: '-rotate-2',
  },
  {
    id: 'gh-12',
    type: 'video',
    title: 'Official Parayan 2026 Teaser',
    category: 'Official Trailer',
    year: '2026',
    caption: 'Watch the official teaser trailer for the 25th Silver Jubilee Yuva Parayan.',
    imageUrl: '/src/assets/images/hero_mandir_parayan_1785262214909.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: '2:45',
    rotation: 'rotate-1',
  },
];

export const InteractiveGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxShift, setMaxShift] = useState('-88%');

  // Scroll driven horizontal translation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate dynamic responsive shift percentage based on screen size
  useEffect(() => {
    const calculateShift = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const windowWidth = window.innerWidth;
        if (trackWidth > windowWidth) {
          // Calculate exact shift distance required so last video card is fully centered/visible inside viewport
          const extraRightMargin = windowWidth < 640 ? 60 : 40;
          const maxScrollPx = trackWidth - windowWidth + extraRightMargin;
          const percentage = (maxScrollPx / trackWidth) * 100;
          setMaxShift(`-${Math.min(Math.max(percentage, 75), 96).toFixed(2)}%`);
        }
      }
    };

    calculateShift();
    window.addEventListener('resize', calculateShift);
    const timer = setTimeout(calculateShift, 400);
    return () => {
      window.removeEventListener('resize', calculateShift);
      clearTimeout(timer);
    };
  }, []);

  // Calculate percentage shift based on scroll
  const xTransform = useTransform(scrollYProgress, [0, 1], ['0%', maxShift]);

  // Dynamic scroll-end transform & glow for video teaser card (comes forward for attention)
  const videoCardScale = useTransform(scrollYProgress, [0.75, 1], [1, 1.15]);
  const videoCardGlow = useTransform(
    scrollYProgress,
    [0.75, 1],
    ['0px 20px 50px rgba(245,158,11,0.25)', '0px 0px 70px rgba(251,191,36,0.9)']
  );
  const videoCardBorder = useTransform(
    scrollYProgress,
    [0.75, 1],
    ['rgba(251,191,36,0.4)', 'rgba(251,191,36,1)']
  );
  const videoCardBadgeOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  // Track progress ratio for progress bar
  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      setProgressPercent(Math.min(Math.max(v * 100, 0), 100));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Image Lightbox state
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  // Video Modal state
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Prevent background scroll when video player or image lightbox is active
  useEffect(() => {
    if (isVideoModalOpen || activeImageIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVideoModalOpen, activeImageIndex]);

  // Custom Video Player Controls State
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const imageItems = HIGHLIGHTS_ITEMS.filter((item) => item.type === 'image');

  // Handle Video Modal Close
  const handleCloseVideoModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    setIsVideoModalOpen(false);
  };

  // Handle Video Card Click & Open Player
  const handleOpenVideoModal = () => {
    setIsVideoModalOpen(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }, 300);
  };

  // Handle Image Lightbox navigation
  const handlePrevImage = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) => (prev! > 0 ? prev! - 1 : imageItems.length - 1));
  };

  const handleNextImage = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) => (prev! < imageItems.length - 1 ? prev! + 1 : 0));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex !== null) {
        if (e.key === 'ArrowLeft') handlePrevImage();
        if (e.key === 'ArrowRight') handleNextImage();
        if (e.key === 'Escape') setActiveImageIndex(null);
      }
      if (isVideoModalOpen) {
        if (e.key === 'Escape') handleCloseVideoModal();
        if (e.key === ' ') {
          e.preventDefault();
          togglePlay();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, isVideoModalOpen, isPlaying]);

  // Touch Swipe for Mobile Lightbox
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 40) handlePrevImage();
    else if (deltaX < -40) handleNextImage();
    touchStartX.current = null;
  };

  // Video Control Handlers
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      setIsMuted(val === 0);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    videoRef.current.muted = nextMute;
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const togglePiP = async () => {
    if (!videoRef.current) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (document.pictureInPictureEnabled) {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (err) {
      console.error("PiP error:", err);
    }
  };

  const toggleFullscreen = async () => {
    if (!videoContainerRef.current) return;
    if (!document.fullscreenElement) {
      await videoContainerRef.current.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <section
      ref={containerRef}
      id="gallery"
      className="relative bg-[#0A0A0A] text-white overflow-visible h-[420vh]"
    >
      {/* Sticky Frame taking full viewport height while scrolling vertically */}
      <div className="sticky top-0 h-screen w-full pt-20 md:pt-0 overflow-hidden flex flex-col justify-between py-6 px-4 sm:px-8 z-10 bg-[#0B0A09]">
        
        {/* SECTION HEADER */}
        <div className="max-w-6xl mx-auto w-full text-center space-y-2 z-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold uppercase tracking-widest">
            <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
            04 • IMAGE HIGHLIGHTS & TEASER
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-white">
            Photo Memories & <span className="text-amber-300 italic">Official Teaser</span>
          </h2>
        </div>

        {/* SCROLL-DRIVEN HORIZONTAL TRACK */}
        <div className="w-full flex-1 flex items-center overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x: xTransform }}
            className="flex items-center gap-6 sm:gap-8 pl-6 sm:pl-12 pr-16 sm:pr-24 w-max"
          >
            {HIGHLIGHTS_ITEMS.map((item) => {
              if (item.type === 'video') {
                // VIDEO CARD (LAST CARD - COMES FORWARD ON SCROLL END)
                return (
                  <motion.div
                    key={item.id}
                    onClick={handleOpenVideoModal}
                    style={{
                      scale: videoCardScale,
                      boxShadow: videoCardGlow,
                      borderColor: videoCardBorder,
                    }}
                    className={`relative w-[280px] sm:w-[350px] md:w-[380px] aspect-[3/4.2] rounded-3xl overflow-hidden border-2 bg-black cursor-pointer group flex-shrink-0 z-30 ${item.rotation || ''}`}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover filter brightness-75 group-hover:brightness-90 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-between p-6">
                      
                      {/* Top Badges */}
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-amber-400 text-black text-xs font-mono font-black uppercase tracking-wider shadow-md">
                          Teaser
                        </span>

                        <span className="px-2.5 py-1 rounded-full bg-black/80 text-amber-300 border border-amber-400/40 text-[11px] font-mono flex items-center gap-1">
                          <Clock className="w-3 h-3 text-amber-400" />
                          {item.duration}
                        </span>
                      </div>

                      {/* CENTER PLAY BUTTON */}
                      <div className="self-center my-auto">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-[0_0_40px_rgba(251,191,36,0.7)] pl-1 transform group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-black text-black" />
                        </div>
                      </div>

                      {/* Bottom Info */}
                      <div className="space-y-1 text-left">
                        <p className="text-xs font-mono font-bold text-amber-300 uppercase tracking-widest">
                          OFFICIAL TEASER • {item.year}
                        </p>
                        <h3 className="text-xl sm:text-2xl font-serif font-black text-white leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-xs text-stone-300 line-clamp-2">
                          {item.caption}
                        </p>
                      </div>

                    </div>
                  </motion.div>
                );
              }

              // IMAGE CARDS
              const imgIndex = imageItems.findIndex((img) => img.id === item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveImageIndex(imgIndex)}
                  className={`relative w-[260px] sm:w-[320px] md:w-[340px] aspect-[3/4.2] rounded-3xl overflow-hidden border-2 border-white/15 bg-zinc-900 shadow-2xl cursor-pointer group flex-shrink-0 hover:border-amber-400/80 ${item.rotation || ''}`}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover filter brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-between p-5">
                    
                    {/* Top Year */}
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-black/80 text-amber-300 border border-amber-500/30 text-[10px] font-mono font-bold uppercase">
                        {item.year}
                      </span>
                      <Maximize2 className="w-4 h-4 text-white/80 group-hover:text-amber-300 transition-colors" />
                    </div>

                    {/* Bottom Title & Category */}
                    <div className="space-y-1 text-left">
                      <span className="text-[10px] font-mono uppercase text-amber-300 font-bold tracking-wider">
                        {item.category}
                      </span>
                      <h4 className="text-base sm:text-lg font-serif font-bold text-white leading-tight line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-stone-300 line-clamp-2 font-sans">
                        {item.caption}
                      </p>
                    </div>

                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* PROGRESS INDICATOR BAR AT BOTTOM */}
        <div className="max-w-xl mx-auto w-full z-20 space-y-2 text-center">
          <div className="flex items-center justify-between text-xs font-mono text-stone-400 px-2">
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Scroll down to navigate gallery</span>
            </span>
            <span className="text-amber-300 font-bold">
              {Math.round(progressPercent)}%
            </span>
          </div>

          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-300 rounded-full transition-all duration-75 shadow-[0_0_12px_rgba(251,191,36,0.5)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

      </div>

      {/* FULLSCREEN IMAGE LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl"
            onClick={() => setActiveImageIndex(null)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl bg-zinc-900 border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl relative text-white flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveImageIndex(null)}
                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/80 text-stone-300 hover:text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev Button */}
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/80 text-amber-300 hover:text-white flex items-center justify-center border border-amber-500/40 transition-all cursor-pointer shadow-xl hover:scale-110"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNextImage}
                className="absolute right-4 md:right-[42%] top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/80 text-amber-300 hover:text-white flex items-center justify-center border border-amber-500/40 transition-all cursor-pointer shadow-xl hover:scale-110"
                aria-label="Next Image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Preview Container */}
              <div className="md:w-3/5 bg-black flex items-center justify-center p-4 min-h-[300px] md:min-h-[480px]">
                <img
                  src={imageItems[activeImageIndex].imageUrl}
                  alt={imageItems[activeImageIndex].title}
                  className="max-h-[65vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Image Information Panel */}
              <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-zinc-900">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold uppercase">
                      {imageItems[activeImageIndex].category} • {imageItems[activeImageIndex].year}
                    </span>
                    <span className="text-xs font-mono text-stone-400">
                      {activeImageIndex + 1} / {imageItems.length}
                    </span>
                  </div>

                  <h3 className="text-2xl font-serif font-black text-white">
                    {imageItems[activeImageIndex].title}
                  </h3>

                  <p className="text-stone-300 text-sm leading-relaxed">
                    {imageItems[activeImageIndex].caption}
                  </p>

                  <div className="pt-2 text-xs text-stone-400 space-y-1 font-mono">
                    <p>📍 BAPS Swaminarayan Mandir, Malad (W)</p>
                    <p>✨ 25th Silver Jubilee Yuva Parayan</p>
                    <p>⌨️ Use ← → arrow keys or swipe to navigate</p>
                  </div>
                </div>

                <div className="space-y-3 border-t border-white/10 pt-4">
                  <a
                    href={EVENT_DETAILS.driveFolderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-2xl bg-amber-400 text-black font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-amber-300 transition-all cursor-pointer shadow-lg"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View High-Res Drive Album</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULLSCREEN CINEMATIC VIDEO PLAYER MODAL WITH ZOOM ANIMATION */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/98 p-2 sm:p-6 backdrop-blur-3xl"
            onClick={handleCloseVideoModal}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 26, stiffness: 320 }}
              ref={videoContainerRef}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl bg-zinc-950 border-2 border-amber-400/80 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(251,191,36,0.3)] text-white relative flex flex-col justify-between"
            >
              {/* VIDEO PLAYER TOP BAR */}
              <div className="p-4 bg-zinc-950/90 border-b border-white/10 flex items-center justify-between z-20">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-400 text-black font-extrabold">
                    <Film className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white leading-tight">
                      Parayan Teaser
                    </h4>
                    <p className="text-xs text-amber-300 font-serif">
                      25th Silver Jubilee Announcement • BAPS Malad
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCloseVideoModal}
                  className="p-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-stone-300 hover:text-white border border-white/10 transition-all cursor-pointer"
                  aria-label="Close Video Player"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* VIDEO STREAM CONTAINER */}
              <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden group">
                <video
                  ref={videoRef}
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                  poster="/src/assets/images/hero_mandir_parayan_1785262214909.jpg"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={() => setIsPlaying(false)}
                  onClick={togglePlay}
                  className="w-full h-full object-contain cursor-pointer"
                  playsInline
                />

                {/* Big Center Play Overlay when paused */}
                {!isPlaying && (
                  <div
                    onClick={togglePlay}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer"
                  >
                    <div className="w-20 h-20 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-2xl pl-1 hover:scale-110 transition-transform">
                      <Play className="w-10 h-10 fill-black text-black" />
                    </div>
                  </div>
                )}
              </div>

              {/* VIDEO CONTROLS OVERLAY BAR */}
              <div className="p-4 bg-zinc-950 border-t border-white/10 space-y-3 z-20">
                
                {/* SCRUBBER PROGRESS BAR */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-amber-300 w-10 text-right">
                    {formatTime(currentTime)}
                  </span>

                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    step={0.1}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-400 hover:accent-amber-300"
                  />

                  <span className="text-xs font-mono text-stone-400 w-10">
                    {formatTime(duration)}
                  </span>
                </div>

                {/* CONTROL BUTTONS BAR */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  
                  {/* LEFT: Play/Pause, Mute/Volume */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={togglePlay}
                      className="p-2.5 rounded-full bg-amber-400 text-black hover:bg-amber-300 transition-all cursor-pointer font-bold"
                    >
                      {isPlaying ? <Pause className="w-5 h-5 fill-black" /> : <Play className="w-5 h-5 fill-black pl-0.5" />}
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={toggleMute}
                        className="text-stone-300 hover:text-white cursor-pointer"
                      >
                        {isMuted || volume === 0 ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5 text-amber-300" />}
                      </button>
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.05}
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-16 sm:w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-400"
                      />
                    </div>
                  </div>

                  {/* RIGHT: Speed, PiP, Fullscreen */}
                  <div className="flex items-center gap-3 text-xs font-mono">
                    
                    {/* Speed Selector */}
                    <div className="flex items-center gap-1 bg-zinc-900 border border-white/10 px-2 py-1 rounded-xl">
                      <Sliders className="w-3.5 h-3.5 text-amber-400" />
                      {[0.5, 1, 1.25, 1.5, 2].map((s) => (
                        <button
                          key={s}
                          onClick={() => handleSpeedChange(s)}
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            playbackSpeed === s
                              ? 'bg-amber-400 text-black'
                              : 'text-stone-400 hover:text-white'
                          }`}
                        >
                          {s}x
                        </button>
                      ))}
                    </div>

                    {/* PiP Button */}
                    <button
                      onClick={togglePiP}
                      className="p-2 rounded-xl bg-zinc-900 border border-white/10 text-stone-300 hover:text-white hover:border-amber-400 transition-all cursor-pointer"
                      title="Picture in Picture"
                    >
                      <Tv className="w-4 h-4" />
                    </button>

                    {/* Fullscreen Button */}
                    <button
                      onClick={toggleFullscreen}
                      className="p-2 rounded-xl bg-zinc-900 border border-white/10 text-stone-300 hover:text-white hover:border-amber-400 transition-all cursor-pointer"
                      title="Toggle Fullscreen"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

