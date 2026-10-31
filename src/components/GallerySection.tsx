import React, { useState } from 'react';
import { Eye, X, ChevronRight, ChevronLeft, ZoomIn, ZoomOut, Image as ImageIcon, Flame } from 'lucide-react';
import { galleryItems } from '../data/initialData';

interface GallerySectionProps {
  onOpenCart: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenCart }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'جميع الصور' },
    { id: 'شواية الفحم', name: 'شواية الفحم الحية' },
    { id: 'صواني العزومات', name: 'صواني العزومات واللمة' },
    { id: 'مشويات بلدي', name: 'كفتة وطرب ومشكل' },
    { id: 'حمام وطواجن', name: 'حمام محشي وأرز' }
  ];

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeFilter);

  const handleNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % galleryItems.length);
      setIsZoomed(false);
    }
  };

  const handlePrev = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (selectedImageIndex - 1 + galleryItems.length) % galleryItems.length
      );
      setIsZoomed(false);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-stone-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-right max-w-2xl mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400">
            <Flame className="w-3.5 h-3.5" />
            <span>صور حقيقية من داخل مطعم أولاد نجم</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            معرض صور <span className="gold-gradient-text">الأطباق والأجواء</span>
          </h2>
          <p className="text-stone-400 text-sm sm:text-base">
            شاهد صور المشويات الطازجة على الفحم وصواني العزومات الكبرى كما يتم تحضيرها يومياً لزبائننا الكرام.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8 text-right">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeFilter === cat.id
                  ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                  : 'bg-stone-900 text-stone-300 hover:text-white border border-stone-800'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => {
            const actualIndex = galleryItems.findIndex((g) => g.id === item.id);

            return (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedImageIndex(actualIndex);
                  setIsZoomed(false);
                }}
                className="group relative rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 hover:border-amber-500/50 cursor-pointer shadow-xl transition-all duration-300 aspect-[3/4]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Category Pill */}
                <div className="absolute top-3 right-3 bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-bold text-amber-300 border border-amber-500/30">
                  {item.category}
                </div>

                {/* Center view icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-amber-500/90 text-stone-950 flex items-center justify-center shadow-lg shadow-black/50 transform scale-75 group-hover:scale-100 transition-transform">
                    <Eye className="w-6 h-6" />
                  </div>
                </div>

                {/* Bottom text description */}
                <div className="absolute bottom-4 right-4 left-4 text-right space-y-1">
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-400 line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6 animate-in fade-in">
          
          {/* Close button */}
          <button
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-5 left-5 z-20 p-2.5 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white transition-colors border border-stone-700"
            aria-label="إغلاق العرض"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white transition-colors border border-stone-700"
            aria-label="الصورة السابقة"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white transition-colors border border-stone-700"
            aria-label="الصورة التالية"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image & Controls Container */}
          <div className="relative max-w-4xl w-full flex flex-col items-center max-h-[90vh]">
            
            <div
              className={`relative overflow-hidden rounded-2xl border border-amber-500/30 bg-stone-950 transition-all duration-300 ${
                isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img
                src={galleryItems[selectedImageIndex].image}
                alt={galleryItems[selectedImageIndex].title}
                referrerPolicy="no-referrer"
                className={`max-h-[70vh] w-auto object-contain transition-transform duration-300 ${
                  isZoomed ? 'scale-150' : 'scale-100'
                }`}
              />
            </div>

            {/* Lightbox Caption & Quick Order CTA */}
            <div className="w-full mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-stone-900/80 backdrop-blur-md p-4 rounded-xl border border-stone-800 text-right">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {galleryItems[selectedImageIndex].title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 mt-0.5">
                  {galleryItems[selectedImageIndex].subtitle}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="p-2 text-stone-300 hover:text-white rounded-lg bg-stone-800 text-xs flex items-center gap-1"
                >
                  {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
                  <span>{isZoomed ? 'تصغير' : 'تكبير'}</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedImageIndex(null);
                    onOpenCart();
                  }}
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs"
                >
                  اطلب الآن
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
