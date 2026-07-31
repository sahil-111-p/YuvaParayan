import React from 'react';
import { Sparkles, MapPin, Phone, FolderDown, Share2, ArrowUp, ExternalLink, Heart } from 'lucide-react';
import { EVENT_DETAILS } from '../data/parayanData';

interface FooterProps {
  onNavigate: (id: string) => void;
  onOpenRsvp: () => void;
  onOpenInvitation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenRsvp, onOpenInvitation }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShareWhatsApp = () => {
    const text = `🌸 Join us for Yuva Parayan 2026 - Celebrating 25 Glorious Years of Kandivali Yuva Parayan! 📖 Shri Hari Leelamrutam (18-20 August 2026 at Akshardham Complex, Malad). Register RSVP online & download your pass here: ${window.location.href}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <footer className="bg-stone-950 text-white pt-16 pb-12 px-4 sm:px-6 border-t border-amber-500/20 relative">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Top Branding Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-white/10">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center text-stone-950 font-bold text-sm">
                25Y
              </div>
              <div>
                <h3 className="text-base font-bold text-amber-300 uppercase tracking-wider">
                  {EVENT_DETAILS.title}
                </h3>
                <p className="text-xs text-stone-400 font-serif">
                  📖 {EVENT_DETAILS.gujaratiTitle}
                </p>
              </div>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              {EVENT_DETAILS.subtitle}. Dedicated to inspiring youth in Satsang, Seva, and Sanskar.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase text-amber-400 tracking-wider mb-3">
              Quick Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-stone-300">
              <button onClick={() => onNavigate('about')} className="hover:text-amber-300 text-left">
                • About 25 Years
              </button>
              <button onClick={() => onNavigate('timeline')} className="hover:text-amber-300 text-left">
                • 3-Day Schedule
              </button>
              <button onClick={() => onNavigate('videos')} className="hover:text-amber-300 text-left">
                • Video Reels
              </button>
              <button onClick={() => onNavigate('gallery')} className="hover:text-amber-300 text-left">
                • Photo Globe
              </button>
              <button onClick={() => onNavigate('venue')} className="hover:text-amber-300 text-left">
                • Venue & Directions
              </button>
              <button onClick={() => onNavigate('faq')} className="hover:text-amber-300 text-left">
                • FAQs & Guidelines
              </button>
            </div>
          </div>

          {/* Contact & Drive Link */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase text-amber-400 tracking-wider">
              Organizers & Drive Resources
            </h4>
            <p className="text-xs text-stone-300">
              {EVENT_DETAILS.organizers}
            </p>

            <a
              href={EVENT_DETAILS.driveFolderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-semibold hover:bg-amber-500/30 transition-all"
            >
              <FolderDown className="w-4 h-4 text-amber-400" />
              <span>Google Drive Event Folder</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <div className="pt-2">
              <button
                onClick={handleShareWhatsApp}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Event on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Rights & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© 2026 BAPS Swaminarayan Mandir - Kandivali & Malad Yuva Mandal. All Rights Reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-amber-300 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
