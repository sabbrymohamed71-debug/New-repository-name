import React from 'react';
import { Phone, MessageSquare, MapPin, Clock, Star, ShieldAlert } from 'lucide-react';
import { Logo } from './Logo';
import { RestaurantInfo } from '../types';

interface FooterProps {
  restaurantInfo: RestaurantInfo;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ restaurantInfo, onOpenAdmin }) => {
  return (
    <footer className="bg-stone-950 border-t border-amber-900/20 text-stone-300 pt-16 pb-12 text-right relative overflow-hidden">
      {/* Decorative subtle ambient lights */}
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-red-900/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand & Intro (Cols 1-5) */}
          <div className="lg:col-span-5 space-y-4">
            <Logo size="lg" />
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-md mt-3 font-medium">
              أصالة المشويات المصرية على أصولها. نقدم لحوم ودواجن بلدي طازجة يومياً، مشوية على الفحم الحي بأعلى معايير الجودة، مع خدمة توصيل سريعة لكرداسة وإمبابة والجيزة.
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" />
              <span className="font-bold">{restaurantInfo.rating} من 5 نجوم</span>
              <span className="text-stone-500">·</span>
              <span className="text-stone-400">109 مراجعة على خرائط Google</span>
            </div>
          </div>

          {/* Quick Links (Cols 6-8) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white border-b border-stone-800 pb-2">
              أقسام الموقع
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#hero" className="hover:text-amber-400 transition-colors">
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="#popular" className="hover:text-amber-400 transition-colors">
                  أشهر الأطباق
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-amber-400 transition-colors">
                  قائمة الطعام الكاملة
                </a>
              </li>
              <li>
                <a href="#offers" className="hover:text-amber-400 transition-colors">
                  عروض العزومات والتوفير
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-amber-400 transition-colors">
                  معرض الصور والأجواء
                </a>
              </li>
              <li>
                <a href="#info-reviews" className="hover:text-amber-400 transition-colors">
                  العنوان والآراء
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Hours (Cols 9-12) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white border-b border-stone-800 pb-2">
              بيانات التواصل والمواعيد
            </h4>
            <div className="space-y-2.5 text-xs text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{restaurantInfo.address} - {restaurantInfo.city}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`tel:${restaurantInfo.phone}`}
                  className="font-mono text-amber-300 hover:underline"
                >
                  {restaurantInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={restaurantInfo.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-amber-300 hover:underline"
                >
                  {restaurantInfo.whatsapp} (واتساب للطلبات)
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{restaurantInfo.openingHours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            جميع الحقوق محفوظة © {new Date().getFullYear()} مطعم أولاد نجم للمشويات.
          </p>

          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 text-stone-400 hover:text-amber-400 transition-colors py-1 px-2.5 rounded bg-stone-900 border border-stone-800"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>لوحة تحكم الإدارة</span>
          </button>
        </div>

      </div>
    </footer>
  );
};
