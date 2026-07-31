import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Ticket, CheckCircle, Sparkles, User, Phone, Mail, Users, Calendar, Utensils, QrCode, Download, ShieldCheck, HeartHandshake } from 'lucide-react';
import { EVENT_DETAILS, DAY_THEMES } from '../data/parayanData';
import { RsvpTicket } from '../types';
import { log } from 'node:console';

interface RsvpFormSectionProps {
  onOpenInvitation: () => void;
}

export const RsvpFormSection: React.FC<RsvpFormSectionProps> = ({ onOpenInvitation }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    mandalWing: 'No',
    guestCount: 0,
    daysAttending: ['Day 1', 'Day 2', 'Day 3'],
    comments: '',
  });

  const [submittedTicket, setSubmittedTicket] = useState<RsvpTicket | null>(() => {
    const saved = localStorage.getItem('yp2026_rsvp_ticket');
    return saved ? JSON.parse(saved) : null;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDayToggle = (dayName: string) => {
    setFormData((prev) => {
      const exists = prev.daysAttending.includes(dayName);
      if (exists) {
        return { ...prev, daysAttending: prev.daysAttending.filter((d) => d !== dayName) };
      } else {
        return { ...prev, daysAttending: [...prev.daysAttending, dayName] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert('Please provide your Full Name and WhatsApp Phone Number.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(async () => {

      const passNum = `YP26-${Math.floor(1000 + Math.random() * 9000)}`;

      const newTicket = {
        id: `ticket_${Date.now()}`,
        passNumber: passNum,
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        mandalWing: formData.mandalWing,
        guestCount: Number(formData.guestCount),
        daysAttending: formData.daysAttending,
        comments: formData.comments,
        createdAt: new Date().toLocaleDateString(),
      };

      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbyPoZp9eaSV5CY30Z0tKLIpneEGhfOeukVy3RRZJSgOP3BQEJpWt6DxpMs51sqcKlrMGA/exec",
          {
            method: "POST",
            body: JSON.stringify(newTicket),
          }
        );

        const result: {
          success: boolean;
          message: string;
        } = await response.json();

        if (result.success) {

          localStorage.setItem(
            "yp2026_rsvp_ticket",
            JSON.stringify(newTicket)
          );

          setSubmittedTicket(newTicket);

          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
          });

        } else {

          alert(result.message);


        }

      } catch (error) {

        console.error(error);

        alert("Network Error");

      }

      setIsSubmitting(false);

    }, 600);
  };

  return (
    <section id="rsvp" className="py-20 px-4 sm:px-6 bg-zinc-950 text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 text-xs font-semibold mb-3 uppercase tracking-wider"
          >
            <Ticket className="w-3.5 h-3.5" />
            Online Registration & RSVP
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-3"
          >
            Confirm Your <span className="text-amber-300 font-serif">Attendance</span>
          </motion.h2>

          <p className="text-stone-300 text-sm max-w-xl mx-auto leading-relaxed">
            Reserve your entry for Mahaprasad and Parayan Sabha. Bring your friends and family along to celebrate 25 Glorious Years!
          </p>
        </div>

        {/* IF SUBMITTED: SHOW DIGITAL CONFIRMATION PASS */}
        {submittedTicket ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-900 border-2 border-amber-400/60 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-center max-w-xl mx-auto"
          >
            <div className="absolute top-0 right-0 bg-amber-500 text-stone-950 text-[10px] font-extrabold uppercase px-4 py-1 rounded-bl-xl tracking-wider">
              CONFIRMED ENTRY PASS
            </div>

            <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>

            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              Pass ID: {submittedTicket.passNumber}
            </span>

            <h3 className="text-2xl font-serif font-bold text-white mt-1">
              {submittedTicket.fullName}
            </h3>

            <p className="text-xs text-amber-200/90 font-medium">
              {submittedTicket.mandalWing} • {submittedTicket.phone}
            </p>

            {/* Pass Details Breakdown */}
            <div className="my-6 p-4 rounded-2xl bg-zinc-950/80 border border-white/10 text-left space-y-2 text-xs text-stone-300">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-stone-400">Total Attendees:</span>
                <span className="font-bold text-white">{1 + submittedTicket.guestCount} Persons (1 + {submittedTicket.guestCount} Guests)</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-stone-400">Days Attending:</span>
                <span className="font-bold text-amber-300">{submittedTicket.daysAttending.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Venue:</span>
                <span className="font-bold text-white">Akshardham Complex, Malad (W)</span>
              </div>
            </div>

            {/* QR Code Graphic Placeholder */}
            <div className="p-4 rounded-2xl bg-white text-stone-950 flex flex-col items-center justify-center mb-6 max-w-xs mx-auto shadow-inner">
              <QrCode className="w-24 h-24 text-stone-900" />
              <p className="text-[10px] font-mono font-bold text-stone-600 mt-1">
                SCAN AT MANDIR ENTRY GATE
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onOpenInvitation}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>Download Invitation Card Pass</span>
              </button>

              <button
                onClick={() => setSubmittedTicket(null)}
                className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-zinc-800 text-stone-300 hover:text-white text-xs font-semibold"
              >
                Submit Another RSVP
              </button>
            </div>
          </motion.div>
        ) : (
          /* RSVP FORM */
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6"
          >
            {/* Full Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-amber-200 uppercase mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Priyesh Patel"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white text-xs sm:text-sm focus:border-amber-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-200 uppercase mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. 9820012345"
                  pattern="[6-9][1-9]{9}"
                  maxLength={10}
                  title="Please enter a valid 10-digit Indian mobile number"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white text-xs sm:text-sm focus:border-amber-400 outline-none"
                />
              </div>
            </div>

            {/* Email & Mandal/Wing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-300 uppercase mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white text-xs sm:text-sm focus:border-amber-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 uppercase mb-1.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  First time coming to this Yuva Parayan? *
                </label>
                <select
                  value={formData.mandalWing}
                  onChange={(e) => setFormData({ ...formData, mandalWing: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white text-xs sm:text-sm focus:border-amber-400 outline-none"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            {/* Friends & Family Count */}
            <div>
              <label className="block text-xs font-bold text-amber-200 uppercase mb-1.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                Number of Friends / Family Attending with You (+1s)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={formData.guestCount}
                  onChange={(e) => setFormData({ ...formData, guestCount: Math.max(0, parseInt(e.target.value) || 0) })}
                  className="w-24 px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-amber-300 font-bold text-center text-sm outline-none"
                />
                <span className="text-xs text-stone-400">
                  Total Seats Reserved: <strong className="text-white">{1 + Number(formData.guestCount)}</strong>
                </span>
              </div>
            </div>

            {/* Days Attending Checkboxes */}
            <div>
              <label className="block text-xs font-bold text-amber-200 uppercase mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                Days Attending (Select All That Apply)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {DAY_THEMES.map((theme) => {
                  const dayName = `Day ${theme.dayNumber}`;
                  const isChecked = formData.daysAttending.includes(dayName);
                  return (
                    <button
                      type="button"
                      key={theme.dayNumber}
                      onClick={() => handleDayToggle(dayName)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${isChecked
                        ? 'bg-amber-500/20 border-amber-400 text-white'
                        : 'bg-zinc-950 border-white/10 text-stone-400'
                        }`}
                    >
                      <div>
                        <span className="text-xs font-bold text-amber-300 block">
                          Day {theme.dayNumber}: {theme.gujaratiTheme}
                        </span>
                        <span className="text-[10px] text-stone-300">
                          {theme.dateString.split(' ')[0]} {theme.dateString.split(' ')[1]} ({theme.dressCodeTitle})
                        </span>
                      </div>
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] font-bold ${isChecked ? 'bg-amber-500 text-stone-950 border-amber-500' : 'border-stone-600'
                        }`}>
                        {isChecked ? '✓' : ''}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Special Comments */}
            <div>
              <label className="block text-xs font-bold text-stone-300 uppercase mb-1.5">
                Special Requests or Notes (Optional)
              </label>
              <textarea
                rows={2}
                value={formData.comments}
                onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                placeholder="Any seating assistance needed or notes for organizers..."
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white text-xs outline-none focus:border-amber-400"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              id="submit-rsvp-btn"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-stone-950 font-bold text-base shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Ticket className="w-5 h-5" />
              <span>{isSubmitting ? 'Generating Entry Pass...' : 'Confirm RSVP & Generate Pass'}</span>
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
};
