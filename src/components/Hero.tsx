import React from 'react';
import { Star, Flame, Utensils, Clock, ChevronDown, CheckCircle2 } from 'lucide-react';
import { RestaurantInfo } from '../types';

interface HeroProps {
  restaurantInfo: RestaurantInfo;
  onOpenCart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ restaurantInfo, onOpenCart }) => {
  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-stone-950">
      {/* Ambient background with warm grill ember textures & gradient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 right-1/4 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] bg-red-800/15 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/20 via-stone-950/90 to-stone-950" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Right Column (Text in RTL): Headline, description, CTA */}
          <div className="lg:col-span-7 text-right space-y-6">
            
            {/* Trust badge kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold backdrop-blur-sm">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>مشويات بلدي 100% على الفحم الطبيعي</span>
              <span className="text-amber-500/50">·</span>
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-mono tabular-nums">{restaurantInfo.rating}</span>
                <span className="text-stone-400 text-xs font-normal">({restaurantInfo.reviewsCount} تقييم)</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.25] text-balance">
              الطعم الأصيل..{' '}
              <br className="hidden sm:inline" />
              <span className="gold-gradient-text drop-shadow-sm">والمشويات على أصولها!</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-stone-300 leading-relaxed max-w-2xl font-medium">
              استمتع بأشهى أنواع المشويات الطازجة، بأجود المكونات وأفضل مذاق. كفتة، طرب ضاني، فراخ مشوية، حمام محشي وصواني العزومات في الجيزة وكرداسة.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenCart}
                className="px-8 py-3.5 rounded-xl font-bold text-stone-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 text-base sm:text-lg flex items-center justify-center gap-2 transform active:scale-95"
              >
                <span>اطلب أوردر الآن</span>
                <span className="text-xl">←</span>
              </button>

              <a
                href="#menu"
                className="px-7 py-3.5 rounded-xl font-bold text-amber-200 bg-stone-900/90 hover:bg-stone-800 border border-amber-500/30 hover:border-amber-400 transition-all text-base sm:text-lg flex items-center justify-center gap-2"
              >
                <Utensils className="w-4 h-4 text-amber-400" />
                <span>شاهد المنيو</span>
              </a>
            </div>

            {/* Key trust bullets */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-stone-300 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>لحوم ودواجن بلدي يومياً</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>تتبيلة نجم السرية الأصلية</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>مفتوح حتى 2:00 صباحاً</span>
              </div>
            </div>

          </div>

          {/* Left Column (Images in RTL): High-fidelity authentic restaurant photography */}
          <div className="lg:col-span-5 relative">
            
            {/* Main Featured Photo: Charcoal rotisserie grill chickens */}
            <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl shadow-black/80 bg-stone-900 group">
              <img
                src="/assets/aistudio/image_53f31f49.png"
                alt="أسياخ الفراخ المشوية على الفحم الحي في مطعم أولاد نجم"
                referrerPolicy="no-referrer"
                className="w-full h-[360px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
              
              {/* Badge on main image */}
              <div className="absolute top-4 right-4 bg-stone-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>شواية الفحم الحية</span>
              </div>

              {/* Bottom caption */}
              <div className="absolute bottom-4 right-4 left-4 text-right">
                <p className="text-white font-extrabold text-lg sm:text-xl drop-shadow">
                  فراخ مشوية على أسياخ الفحم
                </p>
                <p className="text-amber-200/90 text-xs sm:text-sm">
                  تتبيلة خاصة ونكهة فحم أصيلة تدوب في الفم
                </p>
              </div>
            </div>

            {/* Overlapping secondary real photo: The feast platter */}
            <div className="hidden sm:block absolute -bottom-8 -left-6 w-48 sm:w-56 rounded-xl overflow-hidden border-2 border-amber-400/40 shadow-2xl bg-stone-900 transform hover:scale-105 transition-transform duration-300">
              <img
                src="/assets/aistudio/image_770668b5.png"
                alt="صينية العزومات والولائم في مطعم أولاد نجم"
                referrerPolicy="no-referrer"
                className="w-full h-32 sm:h-36 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                <span className="text-[11px] font-bold text-amber-300">
                  صواني العزومات واللمة ✨
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Subtle scroll down indicator */}
      <a
        href="#popular"
        className="absolute bottom-3 left-1/2 -translate-x-1/2 text-stone-500 hover:text-amber-400 transition-colors animate-bounce p-2"
        aria-label="الانتقال إلى أشهر الأطباق"
      >
        <ChevronDown className="w-5 h-5" />
      </a>
    </section>
  );
};
