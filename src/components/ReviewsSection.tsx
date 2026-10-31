import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle, ThumbsUp, X, Sparkles } from 'lucide-react';
import { Review, RestaurantInfo } from '../types';

interface ReviewsSectionProps {
  reviews: Review[];
  restaurantInfo: RestaurantInfo;
  onAddReview: (review: Review) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  restaurantInfo,
  onAddReview
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [dish, setDish] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    const newReview: Review = {
      id: 'rev-' + Date.now(),
      author: author.trim(),
      rating,
      date: 'الآن',
      comment: comment.trim(),
      dish: dish.trim() || undefined,
      isVerified: true
    };

    onAddReview(newReview);
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setShowAddModal(false);
      setAuthor('');
      setComment('');
      setDish('');
      setRating(5);
    }, 1500);
  };

  return (
    <section className="py-20 bg-stone-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with 4.3 Rating Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-right">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 mb-2">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>تقييمات وآراء زبائننا المعتمدين</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              آراء زوار <span className="gold-gradient-text">مطعم أولاد نجم</span>
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-2">
              تقييم عام <strong className="text-amber-400 font-mono">{restaurantInfo.rating}</strong> من 5 نجوم بناءً على <strong className="text-white font-mono">{restaurantInfo.reviewsCount}</strong> مراجعة مسجلة.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="self-start md:self-auto flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 whitespace-nowrap"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>شاركنا رأيك وتجربتك</span>
          </button>
        </div>

        {/* Rating Summary Bar */}
        <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 mb-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center text-right">
          <div className="md:col-span-4 flex items-center gap-4">
            <div className="text-4xl sm:text-5xl font-black text-amber-400 font-mono tabular-nums">
              {restaurantInfo.rating}
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < 4
                        ? 'fill-amber-400 text-amber-400'
                        : i === 4
                        ? 'fill-amber-400/50 text-amber-400'
                        : 'text-stone-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-stone-400">
                إجمالي {restaurantInfo.reviewsCount} تقييم حقيقي على خرائط Google
              </span>
            </div>
          </div>

          <div className="md:col-span-8 grid grid-cols-3 gap-4 border-r md:border-r border-stone-800 pr-0 md:pr-6">
            <div className="space-y-1">
              <span className="text-xs text-stone-400">جودة الشواء</span>
              <div className="text-sm font-bold text-white">ممتاز 96%</div>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-stone-400">نظافة اللحوم</span>
              <div className="text-sm font-bold text-white">بلدي طازج 98%</div>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-stone-400">سرعة التوصيل</span>
              <div className="text-sm font-bold text-white">سريع وساخن</div>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-stone-900/50 border border-stone-800/80 hover:border-amber-500/30 transition-all text-right flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-bold text-sm">
                      {rev.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                        <span>{rev.author}</span>
                        {rev.isVerified && (
                          <span title="عميل موثق" className="inline-flex items-center">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                          </span>
                        )}
                      </h4>
                      <span className="text-[11px] text-stone-500">{rev.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              {rev.dish && (
                <div className="pt-3 border-t border-stone-800/60 flex items-center justify-between text-[11px]">
                  <span className="text-stone-500">الطبق المفضل:</span>
                  <span className="font-semibold text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-900/40">
                    {rev.dish}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* Add Review Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="relative w-full max-w-md bg-stone-950 border border-amber-500/30 rounded-2xl p-6 shadow-2xl text-right">
            
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>إضافة تقييم جديد لمطعم أولاد نجم</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submittedSuccess ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">شكراً لك على مشاركة تقييمك!</h4>
                <p className="text-xs text-stone-400">تم حفظ التقييم بنجاح وسيظهر فوراً في القائمة.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs text-stone-300 block mb-1">اسمك الكريم *</label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="مثال: محمد الشريف"
                    className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-800 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-stone-300 block mb-1">تقييمك بالنجوم (1 إلى 5) *</label>
                  <div className="flex items-center gap-2 justify-end py-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 text-amber-400 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating ? 'fill-amber-400 text-amber-400' : 'text-stone-700'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-stone-300 block mb-1">ما هو طبقك المفضل؟ (اختياري)</label>
                  <input
                    type="text"
                    value={dish}
                    onChange={(e) => setDish(e.target.value)}
                    placeholder="مثال: كفتة على الفحم / صينية العزومات / طرب"
                    className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-800 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-stone-300 block mb-1">رأيك وتجربتك في الأكل والخدمة *</label>
                  <textarea
                    required
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="اكتب تعليقك الصادق عن طعم المشويات وسرعة التوصيل..."
                    className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-800 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs"
                  >
                    نشر التقييم الآن
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-stone-900 text-stone-400 hover:text-white text-xs"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
