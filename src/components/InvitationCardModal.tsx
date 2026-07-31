import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Sparkles, FolderDown, Check, QrCode } from 'lucide-react';
import { EVENT_DETAILS, DAY_THEMES } from '../data/parayanData';

interface InvitationCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InvitationCardModal: React.FC<InvitationCardModalProps> = ({ isOpen, onClose }) => {
  const [guestName, setGuestName] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      const savedTicket = localStorage.getItem('yp2026_rsvp_ticket');
      if (savedTicket) {
        try {
          const parsed = JSON.parse(savedTicket);
          if (parsed.fullName) setGuestName(parsed.fullName);
        } catch {}
      }
    }
  }, [isOpen]);

  const generateAndDownloadPass = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas Size: 1000 x 1400 (High Resolution Portrait Pass)
    canvas.width = 1000;
    canvas.height = 1400;

    // Background Gradient: Deep Royal Maroon / Gold Slate
    const gradient = ctx.createLinearGradient(0, 0, 0, 1400);
    gradient.addColorStop(0, '#1c1917');
    gradient.addColorStop(0.5, '#292524');
    gradient.addColorStop(1, '#451a03');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1000, 1400);

    // Ornate Gold Border
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 12;
    ctx.strokeRect(30, 30, 940, 1340);

    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3;
    ctx.strokeRect(45, 45, 910, 1310);

    // Header Badge
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 28px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ 25 GLORIOUS YEARS OF KANDIVALI YUVA PARAYAN ✨', 500, 120);

    // Gujarati Title
    ctx.fillStyle = '#fde68a';
    ctx.font = 'bold 56px serif';
    ctx.fillText('📖 શ્રીહરિ લીલામૃતમ્', 500, 200);

    // Main Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'extrabold 64px sans-serif';
    ctx.fillText('YUVA PARAYAN 2026', 500, 280);

    // Divider Line
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(150, 320);
    ctx.lineTo(850, 320);
    ctx.stroke();

    // Attendee Guest Box
    ctx.fillStyle = '#1c1917';
    ctx.fillRect(100, 360, 800, 140);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.strokeRect(100, 360, 800, 140);

    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText('HONORED GUEST INVITATION PASS', 500, 400);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 42px sans-serif';
    ctx.fillText(guestName.trim() || 'Respected Devotee & Family', 500, 460);

    // Event Date & Time Box
    ctx.fillStyle = '#292524';
    ctx.fillRect(100, 530, 800, 150);

    ctx.fillStyle = '#fde68a';
    ctx.font = 'bold 32px sans-serif';
    ctx.fillText('🗓️ DATES: 18th, 19th & 20th AUGUST 2026', 500, 580);

    ctx.fillStyle = '#e7e5e4';
    ctx.font = '26px sans-serif';
    ctx.fillText('😋 Mahaprasad: 7:15 PM - 8:30 PM | 🕰️ Parayan Sabha: 8:30 PM - 10:30 PM', 500, 630);

    // 3 Daily Themes & Dress Code Section
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText('🌟 DAILY THEMES & DRESS CODE 🌟', 500, 730);

    const themes = [
      { day: 'Day 1 (18 Aug, Tue)', theme: 'Nishtha (નિષ્ઠા)', code: '🤍 White & White' },
      { day: 'Day 2 (19 Aug, Wed)', theme: 'Seva (સેવા)', code: '🖤🤍 Black & White' },
      { day: 'Day 3 (20 Aug, Thu)', theme: 'Tap (તપ)', code: '🪔 Traditional Wear' },
    ];

    themes.forEach((t, i) => {
      const yPos = 780 + i * 80;
      ctx.fillStyle = '#1c1917';
      ctx.fillRect(100, yPos, 800, 65);
      ctx.strokeStyle = '#78350f';
      ctx.strokeRect(100, yPos, 800, 65);

      ctx.fillStyle = '#fcd34d';
      ctx.font = 'bold 26px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(t.day, 130, yPos + 42);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 26px serif';
      ctx.fillText(t.theme, 400, yPos + 42);

      ctx.fillStyle = '#fef08a';
      ctx.font = 'bold 24px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(t.code, 870, yPos + 42);
    });

    ctx.textAlign = 'center';

    // Venue Details
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 30px sans-serif';
    ctx.fillText('📍 VENUE: BAPS Swaminarayan Mandir', 500, 1080);

    ctx.fillStyle = '#d6d3d1';
    ctx.font = '24px sans-serif';
    ctx.fillText('Akshardham Complex, S.V. Road, Malad (W), Mumbai – 400064', 500, 1120);

    // Footer Benefaction
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'italic 24px serif';
    ctx.fillText('Organized with devotion by BAPS Kandivali & Malad Yuva Mandal', 500, 1280);

    // Download PNG Link
    const link = document.createElement('a');
    link.download = `Yuva_Parayan_2026_Invitation_Pass.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-xl bg-zinc-900 border-2 border-amber-400/50 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-stone-300 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Title */}
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-2">
              <FolderDown className="w-3.5 h-3.5" />
              Digital Invitation Pass
            </span>
            <h3 className="text-2xl font-serif font-bold text-amber-300">
              Yuva Parayan 2026 Invitation Card
            </h3>
            <p className="text-xs text-stone-300 mt-1">
              Personalize with your name and download a high-resolution pass for your family & friends!
            </p>
          </div>

          {/* Name Input */}
          <div className="mb-6 space-y-2">
            <label className="block text-xs font-bold text-amber-200 uppercase">
              Attendee / Family Name on Pass:
            </label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Enter Name (e.g. Priyesh Patel & Family)"
              className="w-full px-4 py-3 rounded-2xl bg-zinc-950 border border-amber-500/30 text-white font-bold text-sm focus:border-amber-400 outline-none"
            />
          </div>

          {/* Pass Preview Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-stone-900 via-zinc-900 to-amber-950/80 border border-amber-500/30 text-center space-y-3 mb-6">
            <p className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              ✨ 25th Silver Jubilee Official Pass Preview ✨
            </p>
            <h4 className="text-xl font-serif font-bold text-white">
              {guestName.trim() || 'Respected Devotee'}
            </h4>
            <div className="text-xs text-amber-200 font-serif">
              📖 {EVENT_DETAILS.gujaratiTitle} • 18-20 August 2026
            </div>
            <p className="text-[11px] text-stone-300">
              BAPS Swaminarayan Mandir, Akshardham Complex, Malad (W)
            </p>
          </div>

          {/* Download CTA Button */}
          <button
            onClick={generateAndDownloadPass}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-stone-950 font-bold text-base shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-5 h-5 text-stone-950" />
                <span>Downloaded Successfully!</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Download Invitation Pass (PNG)</span>
              </>
            )}
          </button>

          {/* Hidden Canvas for High-Res PNG Generation */}
          <canvas ref={canvasRef} className="hidden" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
