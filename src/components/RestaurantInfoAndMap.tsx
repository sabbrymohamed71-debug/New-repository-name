import React from 'react';
import { MapPin, Phone, MessageSquare, Clock, Star, DollarSign, Navigation, ExternalLink } from 'lucide-react';
import { RestaurantInfo } from '../types';

interface RestaurantInfoAndMapProps {
  restaurantInfo: RestaurantInfo;
}

export const RestaurantInfoAndMap: React.FC<RestaurantInfoAndMapProps> = ({ restaurantInfo }) => {
  return (
    <section id="info-reviews" className="py-20 bg-stone-900/60 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-right max-w-2xl mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400">
            <MapPin className="w-3.5 h-3.5" />
            <span>زورونا في فرعنا أو اطلب دليفري</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            بيانات وموقع <span className="gold-gradient-text">{restaurantInfo.name}</span>
          </h2>
          <p className="text-stone-400 text-sm sm:text-base">
            موقع متميز بالقرب من كوبري المنشية يخدم مناطق كرداسة، إمبابة، ومحافظة الجيزة مع خدمة توصيل سريعة.
          </p>
        </div>

        {/* 2-Column Grid: Info Cards on Right, Interactive Map on Left */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Right Column: Key Restaurant Metrics & Details Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4 text-right">
            
            {/* Address Card */}
            <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800/80 hover:border-amber-500/30 transition-all shadow-lg space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-stone-400">العنوان الرسمي:</span>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    {restaurantInfo.address}
                  </h3>
                </div>
              </div>
              <p className="text-xs text-stone-300 pr-13">
                {restaurantInfo.area} - {restaurantInfo.city}
              </p>
            </div>

            {/* Phone & WhatsApp Card */}
            <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800/80 hover:border-amber-500/30 transition-all shadow-lg space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-stone-400">للاتصال والطلبات السريعة:</span>
                  <a
                    href={`tel:${restaurantInfo.phone}`}
                    className="text-base sm:text-lg font-black text-amber-400 hover:text-amber-300 block font-mono tabular-nums"
                  >
                    {restaurantInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-stone-900">
                <a
                  href={`tel:${restaurantInfo.phone}`}
                  className="flex-1 py-2 px-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-200 text-xs font-bold text-center border border-stone-800"
                >
                  اتصال هاتفي
                </a>
                <a
                  href={restaurantInfo.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 px-3 rounded-lg bg-emerald-700/60 hover:bg-emerald-600 text-white text-xs font-bold text-center border border-emerald-600/40 flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>واتساب مباشر</span>
                </a>
              </div>
            </div>

            {/* Hours & Average Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                  <Clock className="w-4 h-4" />
                  <span>مواعيد العمل</span>
                </div>
                <p className="text-xs text-white font-semibold">
                  {restaurantInfo.openingHours}
                </p>
                <span className="text-[11px] text-amber-300/80 block">
                  ({restaurantInfo.closingTimeNotice})
                </span>
              </div>

              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                  <DollarSign className="w-4 h-4" />
                  <span>متوسط الأسعار</span>
                </div>
                <p className="text-xs text-white font-bold font-mono tabular-nums">
                  {restaurantInfo.priceRange}
                </p>
                <span className="text-[11px] text-stone-400 block">
                  وفق البيانات الرسمية المتاحة
                </span>
              </div>
            </div>

            {/* Google Rating Card */}
            <div className="p-4 rounded-xl bg-stone-950 border border-amber-900/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-amber-500/20 text-amber-400">
                  <Star className="w-5 h-5 fill-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg font-black text-white font-mono tabular-nums">
                      {restaurantInfo.rating}
                    </span>
                    <span className="text-xs text-stone-400">من 5 نجوم</span>
                  </div>
                  <span className="text-xs text-amber-400/90 font-medium">
                    بناءً على {restaurantInfo.reviewsCount} مراجعة على خرائط جوجل
                  </span>
                </div>
              </div>
            </div>

            {/* Google Maps External Button */}
            <a
              href={restaurantInfo.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-500 text-stone-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all active:scale-95"
            >
              <Navigation className="w-4 h-4 text-stone-950" />
              <span>موقعنا على الخريطة (Google Maps)</span>
              <ExternalLink className="w-4 h-4 mr-1 opacity-70" />
            </a>

          </div>

          {/* Left Column: Interactive Map Embed Container */}
          <div className="lg:col-span-7 flex flex-col rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl bg-stone-950 min-h-[380px] lg:min-h-full">
            <div className="p-3.5 bg-stone-900 border-b border-stone-800 flex items-center justify-between text-right text-xs">
              <span className="font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>خريطة الوصول لمطعم أولاد نجم - كرداسة</span>
              </span>
              <a
                href={restaurantInfo.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="text-amber-400 hover:underline flex items-center gap-1"
              >
                <span>فتح بالخرائط</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Interactive embedded Map iframe centered at Kerdasa / Mansheya Bridge coordinates */}
            <div className="flex-1 w-full relative min-h-[350px]">
              <iframe
                title="موقع مطعم أولاد نجم على خرائط جوجل"
                src="https://www.openstreetmap.org/export/embed.html?bbox=31.1000%2C30.0200%2C31.1400%2C30.0600&amp;layer=mapnik&amp;marker=30.0400%2C31.1200"
                className="w-full h-full border-0 absolute inset-0 filter invert-[90%] hue-rotate-180 brightness-90 contrast-125"
                loading="lazy"
              />
              
              {/* Overlay card for quick directions */}
              <div className="absolute bottom-4 right-4 bg-stone-950/90 backdrop-blur-md p-3 rounded-xl border border-amber-500/40 shadow-xl max-w-xs text-right space-y-1">
                <p className="text-xs font-bold text-white">
                  مطعم أولاد نجم للمشويات
                </p>
                <p className="text-[11px] text-stone-300">
                  كوبري المنشية، كرداسة، إمبابة
                </p>
                <a
                  href={restaurantInfo.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-block text-[11px] font-bold text-amber-400 hover:text-amber-300"
                >
                  الحصول على الاتجاهات ↗
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
