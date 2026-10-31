import React from 'react';
import { MessageSquare, PhoneCall } from 'lucide-react';
import { RestaurantInfo } from '../types';

interface FloatingWhatsAppProps {
  restaurantInfo: RestaurantInfo;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ restaurantInfo }) => {
  const quickMessage = encodeURIComponent(
    'السلام عليكم مطعم أولاد نجم، أود الاستفسار عن المشويات والعروض المتاحة اليوم.'
  );
  
  // Format clean phone number
  const cleanPhone = restaurantInfo.whatsapp.replace(/\D/g, '');
  const fullPhone = cleanPhone.startsWith('0') ? '2' + cleanPhone : cleanPhone;
  const directLink = `https://wa.me/${fullPhone}?text=${quickMessage}`;

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-center gap-2 select-none">
      {/* Tooltip bubble on desktop */}
      <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900/95 border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-xl backdrop-blur-md animate-bounce">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        <span>واتساب أولاد نجم 💬</span>
      </div>

      {/* Main WhatsApp Floating Action Button */}
      <a
        href={directLink}
        target="_blank"
        rel="noreferrer"
        aria-label="تواصل مع مطعم أولاد نجم عبر واتساب"
        className="relative group w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-green-400 text-white flex items-center justify-center shadow-2xl shadow-emerald-950/60 hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-emerald-300/40"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping pointer-events-none" />
        <MessageSquare className="w-7 h-7 fill-white text-emerald-600 drop-shadow" />
      </a>
    </div>
  );
};
