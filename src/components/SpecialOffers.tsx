import React, { useState } from 'react';
import { Tag, Sparkles, Check, ShoppingBag, Clock } from 'lucide-react';
import { MenuItem } from '../types';

interface SpecialOffersProps {
  items: MenuItem[];
  onAddToCart: (item: MenuItem, quantity: number) => void;
}

export const SpecialOffers: React.FC<SpecialOffersProps> = ({ items, onAddToCart }) => {
  const offerItems = items.filter((item) => item.isOffer);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const handleAddOffer = (item: MenuItem) => {
    onAddToCart(item, 1);
    setAddedIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1800);
  };

  if (offerItems.length === 0) return null;

  return (
    <section id="offers" className="py-20 bg-stone-950 relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-950/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-amber-950/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/60 border border-red-800/40 text-red-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>عروض التوفير ولمة العائلة</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            عروض مميزة وخصومات <span className="text-amber-400">حصرية</span>
          </h2>
          <p className="text-stone-400 text-sm sm:text-base">
            استمتع بأفضل أسعار للمشويات في كرداسة والجيزة، صواني ووجبات تكفي كل الحبايب بأعلى جودة.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offerItems.map((item) => {
            const savings = item.originalPrice ? item.originalPrice - item.price : 0;
            const isAdded = addedIds[item.id];

            return (
              <div
                key={item.id}
                className="relative flex flex-col justify-between rounded-2xl bg-gradient-to-b from-stone-900/90 to-stone-950 border border-amber-900/30 hover:border-amber-500/50 p-5 transition-all duration-300 shadow-xl group"
              >
                {/* Savings Tag */}
                {savings > 0 && (
                  <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-red-600 to-amber-600 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 font-mono tabular-nums">
                    <Tag className="w-3 h-3" />
                    <span>وفر {savings} ج.م</span>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Photo with subtle border */}
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-stone-900 border border-stone-800">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 right-2.5 text-stone-200 text-xs font-semibold bg-stone-950/80 px-2 py-0.5 rounded border border-stone-800">
                      {item.unit}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="text-right space-y-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-stone-400 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Price and Action */}
                <div className="mt-5 pt-4 border-t border-stone-800/80 flex items-center justify-between">
                  <div className="text-right">
                    <span className="text-[11px] text-stone-500 block">السعر بعد الخصم:</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-amber-400 font-mono tabular-nums">
                        {item.price}{' '}
                        <span className="text-xs font-bold text-stone-300">ج.م</span>
                      </span>
                      {item.originalPrice && (
                        <span className="text-xs text-stone-500 line-through font-mono tabular-nums">
                          {item.originalPrice} ج.م
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddOffer(item)}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-amber-500/20'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>تمت الإضافة</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>اطلب العرض</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
