import React, { useState, useMemo } from 'react';
import { Search, Plus, Minus, ShoppingBag, Check, Eye, X, BookOpen, AlertCircle } from 'lucide-react';
import { MenuItem, Category } from '../types';

interface MenuSectionProps {
  items: MenuItem[];
  categories: Category[];
  onAddToCart: (item: MenuItem, quantity: number) => void;
  onOpenCart: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  categories,
  onAddToCart,
  onOpenCart
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  
  // State for original menu sheets modal
  const [showOriginalMenuModal, setShowOriginalMenuModal] = useState<boolean>(false);
  const [activeMenuImageIndex, setActiveMenuImageIndex] = useState<number>(0);

  // Original menu photos provided from restaurant
  const originalMenuImages = [
    {
      title: 'صواني العزومات والمشويات والولائم الكبرى',
      src: '/assets/aistudio/image_770668b5.png',
      desc: 'صواني اللمة، الدواجن والمشويات على الفحم مع الأرز البسمتي بالخلطة والمحاشي'
    },
    {
      title: 'مشويات اللحوم، الكفتة البلدي، الطرب الضاني والشيش',
      src: '/assets/aistudio/image_6d21697c.png',
      desc: 'كفتة مشوية بلدي، طرب، كباب بتلو، ريش على الفحم مع الخضار المشوي'
    },
    {
      title: 'شواية الفحم الحية - فراخ مشوية ومسحبة',
      src: '/assets/aistudio/image_53f31f49.png',
      desc: 'دجاج بلدي كامل ونصف دجاجة على شواية الفحم بتتبيلة أولاد نجم'
    },
    {
      title: 'قسم الحمام المحشي والأرز البسمتي الفاخر',
      src: '/assets/aistudio/image_b4a7f0f4.png',
      desc: 'حمام محشي أرز بالخلطة والكبد والقوانص بالسمنة البلدي'
    }
  ];

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

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  return (
    <section id="menu" className="py-20 bg-stone-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 text-right">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>منيو مطعم أولاد نجم الأصلية</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              قائمة الطعام <span className="gold-gradient-text">والمشويات</span>
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-2 max-w-2xl">
              جميع الأسعار بالجنيه المصري، نحرص على تقديم اللحوم والدواجن البلدية الطازجة يومياً بأعلى معايير النظافة والطهي على الفحم.
            </p>
          </div>

          {/* Button to open Original Menu Pages Modal */}
          <button
            onClick={() => setShowOriginalMenuModal(true)}
            className="self-start md:self-auto flex items-center gap-2 px-5 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 border border-amber-500/30 hover:border-amber-400 text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95 whitespace-nowrap"
          >
            <Eye className="w-4 h-4 text-amber-400" />
            <span>عرض صور صفحات المنيو الأصلية مكبرة</span>
          </button>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="space-y-6 mb-12">
          {/* Search Input */}
          <div className="relative max-w-md mx-auto sm:mr-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن صنفك المفضل (كفتة، فراخ، طرب، حمام...)"
              className="w-full pl-4 pr-11 py-3 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-400 text-stone-100 placeholder-stone-500 text-sm focus:outline-none transition-colors"
            />
            <Search className="w-5 h-5 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Categories Tab Strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-right">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 transition-all ${
                    isActive
                      ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                      : 'bg-stone-950 text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-800'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center rounded-2xl bg-stone-950/60 border border-stone-800 p-8 space-y-3">
            <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">لم يتم العثور على أصناف تطابق بحثك</h3>
            <p className="text-sm text-stone-400">
              جرّب كتابة كلمة أخرى أو تصفح باقي أقسام المنيو.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-2 text-xs font-bold text-amber-400 hover:underline"
            >
              عرض جميع الأصناف
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const qty = getQuantity(item.id);
              const isAdded = addedIds[item.id];

              return (
                <div
                  key={item.id}
                  className="flex flex-col justify-between rounded-2xl bg-stone-950 border border-stone-800/80 hover:border-amber-500/30 transition-all duration-300 overflow-hidden shadow-lg group"
                >
                  <div className="p-4 sm:p-5 flex gap-4">
                    {/* Item Image */}
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-stone-900 shrink-0 border border-stone-800">
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {item.isPopular && (
                        <div className="absolute top-1 right-1 bg-amber-500 text-stone-950 text-[10px] font-black px-1.5 py-0.5 rounded shadow">
                          مطلوب
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between text-right">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                            {item.name}
                          </h3>
                        </div>
                        <span className="text-[11px] text-amber-400/90 font-medium block mt-0.5">
                          {item.unit}
                        </span>
                        <p className="text-xs text-stone-400 line-clamp-2 mt-1.5 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Price in card */}
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-base sm:text-lg font-black text-amber-400 font-mono tabular-nums">
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
                  </div>

                  {/* Bottom Action Strip */}
                  <div className="px-4 py-3 bg-stone-900/60 border-t border-stone-800/80 flex items-center justify-between gap-3">
                    {/* Quantity controls */}
                    <div className="flex items-center rounded-lg bg-stone-950 border border-stone-800 p-1">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="w-6 h-6 flex items-center justify-center text-stone-400 hover:text-white rounded hover:bg-stone-800"
                        aria-label="إنقاص"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center text-xs font-bold text-white font-mono tabular-nums">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="w-6 h-6 flex items-center justify-center text-stone-400 hover:text-white rounded hover:bg-stone-800"
                        aria-label="زيادة"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Add to Order Button */}
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
                          <span>تمت الإضافة للطلب</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>أضف للأوردر</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Modal: View original restaurant menu sheets in high resolution */}
      {showOriginalMenuModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 animate-in fade-in">
          <div className="relative w-full max-w-5xl bg-stone-950 border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-stone-800 bg-stone-900/90 text-right">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <h3 className="text-base sm:text-lg font-bold text-white">
                  صور المنيو الأصلية والكتالوج لمطعم أولاد نجم
                </h3>
              </div>
              <button
                onClick={() => setShowOriginalMenuModal(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content: Selected Image with high-resolution view */}
            <div className="flex-1 overflow-auto p-4 flex flex-col items-center justify-center bg-stone-900/40">
              <div className="relative max-h-[60vh] rounded-xl overflow-hidden border border-stone-800 shadow-2xl">
                <img
                  src={originalMenuImages[activeMenuImageIndex].src}
                  alt={originalMenuImages[activeMenuImageIndex].title}
                  referrerPolicy="no-referrer"
                  className="max-h-[60vh] w-auto object-contain"
                />
              </div>

              <div className="mt-4 text-center space-y-1">
                <h4 className="text-base font-bold text-amber-400">
                  {originalMenuImages[activeMenuImageIndex].title}
                </h4>
                <p className="text-xs text-stone-300">
                  {originalMenuImages[activeMenuImageIndex].desc}
                </p>
              </div>
            </div>

            {/* Thumbnails strip for switching sheets */}
            <div className="p-3 bg-stone-950 border-t border-stone-800 flex items-center justify-center gap-3 overflow-x-auto">
              {originalMenuImages.map((sheet, index) => (
                <button
                  key={index}
                  onClick={() => setActiveMenuImageIndex(index)}
                  className={`flex items-center gap-2 p-1.5 rounded-lg border transition-all text-xs text-right ${
                    activeMenuImageIndex === index
                      ? 'border-amber-400 bg-amber-950/40 text-amber-200'
                      : 'border-stone-800 hover:border-stone-700 text-stone-400'
                  }`}
                >
                  <img
                    src={sheet.src}
                    alt={sheet.title}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 object-cover rounded"
                  />
                  <span className="hidden sm:inline font-semibold line-clamp-1 max-w-[150px]">
                    صفحة {index + 1}
                  </span>
                </button>
              ))}
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
