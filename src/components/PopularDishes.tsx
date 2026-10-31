import React, { useState } from 'react';
import { Plus, Minus, ShoppingBag, Check, Flame } from 'lucide-react';
import { MenuItem } from '../types';

interface PopularDishesProps {
  items: MenuItem[];
  onAddToCart: (item: MenuItem, quantity: number) => void;
  onOpenCart: () => void;
}

export const PopularDishes: React.FC<PopularDishesProps> = ({
  items,
  onAddToCart,
  onOpenCart
}) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  // Filter the signature popular items
  const popularItems = items.filter((item) => item.isPopular).slice(0, 4);

  const getQuantity = (id: string) => quantities[id] || 1;

  const handleQuantityChange = (id: string, delta: number) => {
    const current = getQuantity(id);
    const next = Math.max(1, current + delta);
    setQuantities((prev) => ({ ...prev, [id]: next }));
  };

  const handleAdd = (item: MenuItem) => {
    const qty = getQuantity(item.id);
    onAddToCart(item, qty);
    setAddedIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1800);
  };

  return (
    <section id="popular" className="py-20 bg-stone-900/60 border-t border-b border-stone-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 text-right">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 mb-2">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>الأكثر طلباً وتفضيلاً لدى زبائننا</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              أشهر أطباق <span className="gold-gradient-text">مطعم أولاد نجم</span>
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-2 max-w-xl">
              أطباق تم إعدادها بوصفاتنا السرية الخاصة، من اللحوم البلدية الطازجة والمشوية على الفحم الحي مباشرة.
            </p>
          </div>

          <button
            onClick={onOpenCart}
            className="self-start md:self-auto text-xs sm:text-sm font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
          >
            <span>عرض سلة الطلبات</span>
            <span className="text-base">←</span>
          </button>
        </div>

        {/* 4 Featured Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularItems.map((item) => {
            const qty = getQuantity(item.id);
            const isAdded = addedIds[item.id];

            return (
              <div
                key={item.id}
                className="group flex flex-col justify-between rounded-2xl bg-stone-950 border border-stone-800 hover:border-amber-500/40 transition-all duration-300 overflow-hidden shadow-xl shadow-black/40"
              >
                {/* Image Container with 4:3 aspect ratio */}
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-900">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
                  
                  {/* Unit badge / price tag */}
                  <div className="absolute bottom-2.5 right-2.5 bg-stone-900/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-semibold text-stone-300 border border-stone-700/60">
                    {item.unit}
                  </div>

                  {item.isOffer && (
                    <div className="absolute top-2.5 right-2.5 bg-red-600/90 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow">
                      عرض خاص
                    </div>
                  )}
                </div>

                {/* Content Area */}
                <div className="p-5 flex-1 flex flex-col justify-between text-right space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Price & Quantity & Add Button */}
                  <div className="pt-2 border-t border-stone-800/80 space-y-3">
                    {/* Price display */}
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-stone-400">السعر:</span>
                      <div className="flex items-baseline gap-2">
                        {item.originalPrice && (
                          <span className="text-xs text-stone-500 line-through font-mono tabular-nums">
                            {item.originalPrice} ج.م
                          </span>
                        )}
                        <span className="text-lg font-black text-amber-400 font-mono tabular-nums">
                          {item.price}{' '}
                          <span className="text-xs font-bold text-stone-300">جنيه</span>
                        </span>
                      </div>
                    </div>

                    {/* Stepper + Add to Cart */}
                    <div className="flex items-center gap-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center rounded-lg bg-stone-900 border border-stone-800 p-1">
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="w-6 h-6 flex items-center justify-center text-stone-400 hover:text-white rounded hover:bg-stone-800 transition-colors"
                          aria-label="تقليل الكمية"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-white font-mono tabular-nums">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="w-6 h-6 flex items-center justify-center text-stone-400 hover:text-white rounded hover:bg-stone-800 transition-colors"
                          aria-label="زيادة الكمية"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Add Button */}
                      <button
                        type="button"
                        onClick={() => handleAdd(item)}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-amber-500 hover:bg-amber-400 text-stone-950'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>تمت الإضافة</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>أضف للطلب</span>
                          </>
                        )}
                      </button>
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
