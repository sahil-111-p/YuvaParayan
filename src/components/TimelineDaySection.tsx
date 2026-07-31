import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Utensils, MapPin, Sparkles, Shirt, Star, BookOpen, ChevronRight, Layers } from 'lucide-react';
import { DAY_THEMES, EVENT_DETAILS } from '../data/parayanData';

interface TimelineDaySectionProps {
  onOpenRsvp: () => void;
  activeDay: number;
  setActiveDay: (dayNum: number) => void;
}

// Casual, warm & engaging descriptions for each day card
const CASUAL_DAY_INFO: Record<number, {
  casualDesc: string;
  dressCode: string;
  dressIcon: string;
  specialAttraction: string;
  scripture: string;
  vibeTag: string;
}> = {
  1: {
    casualDesc: "Get ready for an epic start to our 25th Silver Jubilee! Join us for an energetic evening filled with soul-stirring kirtans, inspiring youth drama, and uplifting katha by Pujya Swamis. Bring your squad along for a great time!",
    dressCode: "White & White Traditional",
    dressIcon: "🤍",
    specialAttraction: "25-Year Opening Symphony & Youth Drama",
    scripture: "Shri Hari Leelamrutam - Kalash 1 & 2",
    vibeTag: "Spiritual Kickoff & High Energy",
  },
  2: {
    casualDesc: "Day 2 is all about youth energy, togetherness, and service! We're diving into acoustic music jams, releasing our exclusive 25-Year documentary film, and sharing practical, real-world inspiration for everyday life.",
    dressCode: "Black & White Formals / Casuals",
    dressIcon: "🖤🤍",
    specialAttraction: "Soulful Kirtan Aradhana & 25-Year Movie",
    scripture: "Shri Hari Leelamrutam - Kalash 3 & 4",
    vibeTag: "Musical Night & Seva Fellowship",
  },
  3: {
    casualDesc: "The grand finale celebration you definitely can't miss! An action-packed night of traditional dance performances, honoring 25 years of memories, flower rain celebrations, and divine blessings. Let's make history together!",
    dressCode: "Traditional Ethnic Kurta / Chaniya Choli",
    dressIcon: "🪔",
    specialAttraction: "Grand Samapan, Ras & Flower Rain",
    scripture: "Shri Hari Leelamrutam - Grand Finale Kalash",
    vibeTag: "Grand Finale & Celebration",
  },
};

export const TimelineDaySection: React.FC<TimelineDaySectionProps> = ({
  activeDay,
  setActiveDay,
}) => {
  const currentDayData = DAY_THEMES.find((d) => d.dayNumber === activeDay) || DAY_THEMES[0];

  return (
    <section id="timeline" className="py-20 px-4 sm:px-6 bg-[#0B0A09] text-white relative overflow-x-clip">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* SECTION HEADER */}
        <div className="text-center mb-10 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold uppercase tracking-widest"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            03 • 3-DAY SCHEDULE & PROGRAM EVENTS
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-white"
          >
            The 3-Day <span className="text-amber-300 italic">Parayan Gathering</span>
          </motion.h2>

          {/* TIMING DETAILS BANNER (MAHAPRASAD & SABHA TIMING) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto bg-zinc-900/90 border border-amber-500/30 rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-2xl flex flex-col sm:flex-row items-center justify-around gap-4 text-center sm:text-left"
          >
            <div className="flex w-full items-center justify-center gap-15">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Utensils className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-[10px] font-mono font-bold uppercase text-amber-400">MAHAPRASAD TIMING</p>
                <p className="text-sm sm:text-base font-bold text-white">{EVENT_DETAILS.timing.mahaprasad}</p>
              </div>
            </div>

            <div className="hidden sm:block w-px h-10 bg-white/10" />

            <div className="flex w-full justify-center items-center gap-12">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Clock className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-[10px] font-mono font-bold uppercase text-amber-400">SABHA & KATHA TIMING</p>
                <p className="text-sm sm:text-base font-bold text-white">{EVENT_DETAILS.timing.sabha}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* STACKING CARDS ON SCROLL CONTAINER */}
        <div className="my-12 space-y-12 sm:space-y-16 relative">

          {DAY_THEMES.map((theme, idx) => {
            const isSelected = activeDay === theme.dayNumber;
            const casualInfo = CASUAL_DAY_INFO[theme.dayNumber] || CASUAL_DAY_INFO[1];

            // Incremental sticky top offsets and z-indexes so cards stack naturally on top of each other on scroll
            const stickyTopClasses = [
              'sticky top-20 sm:top-24 z-10',
              'sticky top-28 sm:top-32 z-20',
              'sticky top-36 sm:top-40 z-30',
            ];

            return (
              <div
                key={theme.dayNumber}
                onClick={() => setActiveDay(theme.dayNumber)}
                className={`${stickyTopClasses[idx % 3]} cursor-pointer`}
              >
                <div
                  className={`w-full rounded-3xl sm:rounded-[36px] overflow-hidden border-2 shadow-[0_25px_60px_rgba(0,0,0,0.95)] ${isSelected
                    ? 'bg-[#151311] border-amber-400 ring-2 ring-amber-400/40'
                    : 'bg-[#12100E]/95 border-amber-500/30 backdrop-blur-2xl'
                    }`}
                >
                  {/* CARD TOP HEADER STRIP */}
                  <div className="px-6 py-3.5 bg-gradient-to-r from-amber-950/80 via-zinc-900 to-zinc-950 border-b border-amber-500/20 flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center justify-between w-full gap-3">
                      <span className="px-3 py-1 rounded-full bg-amber-400 text-black text-xs font-extrabold font-mono uppercase tracking-wider shadow-md">
                        DAY {theme.dayNumber} • {theme.dayOfWeek}
                      </span>
                      <span className="text-xs font-mono text-stone-300">
                        {theme.dateString}
                      </span>
                    </div>
                  </div>

                  {/* CARD BODY CONTENT */}
                  <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">

                    {/* LEFT SIDE: Cover Image */}
                    <div className="md:col-span-5 relative rounded-2xl overflow-hidden aspect-16/10 md:aspect-4/3 bg-black border border-white/10">
                      <img
                        src={theme.visualImage}
                        alt={theme.themeTitle}
                        className="w-full h-full object-cover filter brightness-95"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-4">
                        <span className="text-xs font-mono font-bold text-amber-300 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg border border-amber-500/30 inline-block w-fit">
                          {casualInfo.vibeTag}
                        </span>
                      </div>
                    </div>

                    {/* RIGHT SIDE: Casual Info & Highlights */}
                    <div className="md:col-span-7 space-y-4 text-left">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                          <h3 className="text-2xl sm:text-3xl font-serif font-black text-white">
                            Day {theme.dayNumber}: {theme.themeTitle}
                          </h3>
                        </div>

                        {isSelected ? (
                          <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400 text-xs font-mono font-bold flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                            <span>Selected</span>
                          </span>
                        ) : (
                          <span className="text-xs font-mono text-stone-400">
                            Click to Select
                          </span>
                        )}
                      </div>

                      {/* Casual Description */}
                      <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-sans">
                        {casualInfo.casualDesc}
                      </p>

                      {/* DAY-WISE INFORMATION GRID (DRESS CODE, SCRIPTURE, ATTRACTIONS) */}
                      {/* Dress Code Box */}
                      <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2.5">
                        <Shirt className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] font-mono font-bold uppercase text-amber-400 block">DRESS CODE</span>
                          <span className="text-xs font-bold text-white">{casualInfo.dressCode} {casualInfo.dressIcon}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};
