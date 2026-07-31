import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Ticket, FolderDown, MapPin, X } from 'lucide-react';
import { ambientSynth } from '../lib/audioSynth';

interface RekorderNavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenRsvp: () => void;
  onOpenInvitation: () => void;
  activeDay: number;
}

export const RekorderNavbar: React.FC<RekorderNavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenRsvp,
  onOpenInvitation,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    const playing = ambientSynth.toggle();
    setIsAudioPlaying(playing);
  };

  const navLinks = [
    { id: 'hero', label: 'HOME', desc: 'Main Cover & Timer' },
    { id: 'about', label: 'ABOUT', desc: '25-Year Legacy & Pillars' },
    { id: 'timeline', label: '3-DAY SCHEDULE', desc: 'Nishtha, Seva, Tap' },
    { id: 'gallery', label: 'GALLERY', desc: '25-Year Photo Wall' },
    { id: 'venue', label: 'VENUE', desc: 'Malad Mandir Map' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none px-3 sm:px-6 py-4">
        <div className="w-full max-w-xl pointer-events-auto relative">
          {/* REKORDER STYLE MAIN CAPSULE BAR */}
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className={`w-full rounded-[28px] overflow-hidden transition-all duration-300 shadow-2xl ${
              scrolled
                ? 'bg-black/90 border border-amber-500/40 backdrop-blur-2xl shadow-amber-950/40'
                : 'bg-[#121212]/95 border border-amber-500/30 backdrop-blur-xl shadow-black/80'
            }`}
          >
            {/* Top Bar Trigger (Always Visible) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-full px-6 py-3.5 flex items-center justify-between cursor-pointer group text-left transition-colors hover:bg-white/5"
            >
              {/* Brand Typography in Rekorder Style (Bold Italic Display in Amber/Orange) */}
              <div className="flex items-center gap-3">
                <span className="font-serif italic font-black text-2xl sm:text-3xl tracking-tight text-white group-hover:text-amber-300 transition-colors">
                  Yuva<span className="text-amber-400 not-italic font-sans font-extrabold ml-1">Parayan</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold tracking-widest uppercase hidden sm:inline-block">
                  25Y Jubilee
                </span>
              </div>

              {/* Right Side Status & Trigger Dot */}
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono uppercase tracking-widest text-amber-300/80 hidden sm:inline-block">
                  {menuOpen ? 'CLOSE MENU' : navLinks.find((l) => l.id === activeSection)?.label || 'MENU'}
                </span>

                <div className="w-9 h-9 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold shadow-lg shadow-amber-400/20 group-hover:scale-110 transition-transform">
                  {menuOpen ? (
                    <X className="w-5 h-5 text-black" />
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full bg-black block animate-pulse" />
                  )}
                </div>
              </div>
            </button>

            {/* EXPANDED MENU GRID (Rekorder Popover Style) */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="border-t border-white/10 p-5 sm:p-6 bg-[#0E0E0E]"
                >
                  {/* Micro Address / Info Header in Rekorder Monospace Style */}
                  <div className="flex items-start justify-between pb-4 mb-5 border-b border-white/10 text-stone-400 text-[11px] font-mono">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={toggleAudio}
                        className={`p-2 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                          isAudioPlaying
                            ? 'bg-amber-400 text-black border-amber-300 font-bold'
                            : 'bg-zinc-900 text-stone-300 border-white/10 hover:text-white'
                        }`}
                      >
                        {isAudioPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                        <span>{isAudioPlaying ? 'MUTE' : 'AUDIO'}</span>
                      </button>
                    </div>
                  </div>

                  {/* 2-Column Menu Grid matching Rekorder screenshot */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {navLinks.map((link) => {
                      const isActive = activeSection === link.id;
                      return (
                        <button
                          key={link.id}
                          onClick={() => handleLinkClick(link.id)}
                          className={`p-3.5 sm:p-4 rounded-2xl flex flex-col items-center justify-center text-center transition-all cursor-pointer relative group ${
                            isActive
                              ? 'bg-amber-400 text-black font-extrabold shadow-lg shadow-amber-400/20 scale-[1.02]'
                              : 'bg-zinc-900/90 text-stone-200 border border-white/10 hover:border-amber-400/50 hover:bg-zinc-800'
                          }`}
                        >
                          {/* Top Center Dot matching Rekorder design */}
                          <span
                            className={`w-2.5 h-2.5 rounded-full mb-2 block ${
                              isActive ? 'bg-black' : 'bg-amber-400 group-hover:scale-125 transition-transform'
                            }`}
                          />

                          <span className="text-xs sm:text-sm font-mono font-bold tracking-widest uppercase">
                            {link.label}
                          </span>

                          <span
                            className={`text-[10px] mt-0.5 line-clamp-1 ${
                              isActive ? 'text-black/70 font-medium' : 'text-stone-400'
                            }`}
                          >
                            {link.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Bottom Quick Action CTAs */}
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        onOpenInvitation();
                      }}
                      className="py-3 px-4 rounded-xl bg-zinc-900 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold flex items-center justify-center gap-2 hover:bg-black transition-all cursor-pointer"
                    >
                      <FolderDown className="w-4 h-4 text-amber-400" />
                      <span>PASS PASS</span>
                    </button>

                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        onOpenRsvp();
                      }}
                      className="py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black text-xs font-mono font-black flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-all cursor-pointer"
                    >
                      <Ticket className="w-4 h-4" />
                      <span>RSVP NOW</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </header>

      {/* Backdrop overlay when menu is open */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
    </>
  );
};

