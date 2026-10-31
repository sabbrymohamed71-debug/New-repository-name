import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Send, MapPin, Phone, User, MessageSquare, CheckCircle, ArrowRight } from 'lucide-react';
import { CartItem, MenuItem, Order, RestaurantInfo } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  restaurantInfo: RestaurantInfo;
  onOrderSaved: (order: Order) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  restaurantInfo,
  onOrderSaved
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [alternatePhone, setAlternatePhone] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'takeaway'>('delivery');
  const [notes, setNotes] = useState('');
  const [submittedOrder, setSubmittedOrder] = useState<Order | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);
  const deliveryFee = deliveryType === 'delivery' ? (subtotal >= 600 ? 0 : 25) : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleSendWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (cart.length === 0) {
      setErrorMessage('سلة الطلبات فارغة، الرجاء اختيار أطباق أولاً');
      return;
    }

    if (!customerName.trim()) {
      setErrorMessage('الرجاء كتابة اسم العميل');
      return;
    }

    if (!customerPhone.trim() || customerPhone.trim().length < 8) {
      setErrorMessage('الرجاء إدخال رقم هاتف صحيح للتواصل');
      return;
    }

    if (deliveryType === 'delivery' && !address.trim()) {
      setErrorMessage('الرجاء كتابة العنوان بالتفصيل للتوصيل');
      return;
    }

    // Build the order object
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder: Order = {
      id: orderId,
      createdAt: new Date().toLocaleString('ar-EG'),
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      alternatePhone: alternatePhone.trim() || undefined,
      address: deliveryType === 'delivery' ? address.trim() : 'استلام من المطعم (كرداسة)',
      deliveryType,
      notes: notes.trim() || undefined,
      items: cart.map((c) => ({
        name: c.item.name,
        quantity: c.quantity,
        price: c.item.price,
        unit: c.item.unit
      })),
      totalAmount: grandTotal,
      status: 'pending'
    };

    // Save order internally for admin dashboard
    onOrderSaved(newOrder);

    // Format WhatsApp Message
    let messageText = `*طلب أوردر جديد - مطعم أولاد نجم للمشويات* 🌟\n`;
    messageText += `رقم الطلب: #${orderId}\n`;
    messageText += `---------------------------------\n`;
    messageText += `👤 *اسم العميل:* ${customerName.trim()}\n`;
    messageText += `📱 *رقم الهاتف:* ${customerPhone.trim()}\n`;
    if (alternatePhone.trim()) {
      messageText += `📞 *هاتف بديل:* ${alternatePhone.trim()}\n`;
    }
    messageText += `📍 *طريقة الاستلام:* ${
      deliveryType === 'delivery' ? '🛵 توصيل دليفري للمنزل' : '🛍️ استلام من فرع المطعم'
    }\n`;
    if (deliveryType === 'delivery') {
      messageText += `🏠 *العنوان بالتفصيل:* ${address.trim()}\n`;
    }
    messageText += `---------------------------------\n`;
    messageText += `📋 *تفاصيل الطلبات والأصناف:*\n`;

    cart.forEach((c, index) => {
      const itemTotal = c.item.price * c.quantity;
      messageText += `${index + 1}. ${c.item.name} (${c.item.unit})\n`;
      messageText += `   الكمية: ${c.quantity} × ${c.item.price} ج.م = *${itemTotal} ج.م*\n`;
    });

    messageText += `---------------------------------\n`;
    messageText += `💵 *المجموع الفرعي:* ${subtotal} ج.م\n`;
    if (deliveryType === 'delivery') {
      messageText += `🛵 *رسوم التوصيل:* ${deliveryFee === 0 ? 'مجاناً' : `${deliveryFee} ج.م`}\n`;
    }
    messageText += `💰 *الإجمالي النهائي المطلوب:* *${grandTotal} جنيه مصري*\n`;

    if (notes.trim()) {
      messageText += `---------------------------------\n`;
      messageText += `📝 *ملاحظات خاصة بالشواء والطلب:* ${notes.trim()}\n`;
    }

    messageText += `---------------------------------\n`;
    messageText += `يرجى تأكيد استلام الطلب وتأكيد وقت تجهيز المشويات والتوصيل. شكراً لكم!`;

    // Direct WhatsApp phone clean: 01207744595 -> 201207744595
    const cleanPhone = restaurantInfo.whatsapp.replace(/\D/g, '');
    const fullPhone = cleanPhone.startsWith('0') ? '2' + cleanPhone : cleanPhone;
    const whatsappUrl = `https://wa.me/${fullPhone}?text=${encodeURIComponent(messageText)}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    setSubmittedOrder(newOrder);
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex justify-start animate-in fade-in">
      <div className="relative w-full max-w-xl bg-stone-950 border-l border-amber-900/30 h-full flex flex-col shadow-2xl overflow-y-auto">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-stone-800 bg-stone-900/90 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2.5 text-right">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                سلة طلب المشويات
              </h2>
              <span className="text-xs text-amber-300 font-mono tabular-nums">
                {cart.length} أصناف محددة
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
            aria-label="إغلاق السلة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-4 sm:p-6 flex-1 space-y-6">
          
          {submittedOrder ? (
            /* Order Success View */
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle className="w-9 h-9" />
              </div>
              <h3 className="text-xl font-bold text-white">
                تم تجهيز الطلب وإرساله لواتساب المطعم!
              </h3>
              <p className="text-sm text-stone-300 max-w-md mx-auto leading-relaxed">
                رقم الطلب الخاص بك هو <strong className="text-amber-400 font-mono">#{submittedOrder.id}</strong>.
                إذا لم تفتح نافذة واتساب تلقائياً، يمكنك الضغط على الزر بالأسفل.
              </p>
              
              <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 text-right space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-400">الاسم:</span>
                  <span className="text-white font-bold">{submittedOrder.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">الهاتف:</span>
                  <span className="text-white font-mono">{submittedOrder.customerPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">الإجمالي:</span>
                  <span className="text-amber-400 font-bold font-mono">{submittedOrder.totalAmount} ج.م</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-2">
                <a
                  href={restaurantInfo.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>فتح محادثة واتساب المطعم الآن</span>
                </a>
                <button
                  onClick={() => {
                    setSubmittedOrder(null);
                    onClose();
                  }}
                  className="w-full py-2.5 rounded-xl bg-stone-800 text-stone-300 hover:text-white text-xs font-semibold"
                >
                  العودة للموقع
                </button>
              </div>
            </div>
          ) : cart.length === 0 ? (
            /* Empty Cart View */
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-900 text-stone-600 border border-stone-800 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">سلة الطلبات فارغة حالياً</h3>
              <p className="text-sm text-stone-400 max-w-xs mx-auto">
                تصفح قائمة المشويات والصواني الشهية وأضف أطباقك المفضلة إلى السلة.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs"
              >
                تصفح المنيو الآن
              </button>
            </div>
          ) : (
            /* Cart Items List & Checkout Form */
            <form onSubmit={handleSendWhatsAppOrder} className="space-y-6">
              
              {/* Selected Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span>الأصناف المختارة ({cart.length})</span>
                  <button
                    type="button"
                    onClick={onClearCart}
                    className="text-red-400 hover:text-red-300 flex items-center gap-1 font-semibold"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>تفريغ السلة</span>
                  </button>
                </div>

                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {cart.map((cartItem) => {
                    const itemTotal = cartItem.item.price * cartItem.quantity;

                    return (
                      <div
                        key={cartItem.item.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-stone-900/90 border border-stone-800 text-right gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={cartItem.item.image}
                            alt={cartItem.item.name}
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 rounded-lg object-cover border border-stone-700"
                          />
                          <div>
                            <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                              {cartItem.item.name}
                            </h4>
                            <span className="text-[11px] text-amber-400 font-mono tabular-nums">
                              {cartItem.item.price} ج.م ({cartItem.item.unit})
                            </span>
                          </div>
                        </div>

                        {/* Quantity Counter & Delete */}
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="flex items-center rounded-lg bg-stone-950 border border-stone-800 p-0.5">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(cartItem.item.id, cartItem.quantity - 1)}
                              className="w-5 h-5 flex items-center justify-center text-stone-400 hover:text-white"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-white font-mono tabular-nums">
                              {cartItem.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                              className="w-5 h-5 flex items-center justify-center text-stone-400 hover:text-white"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-xs font-bold text-white font-mono tabular-nums w-14 text-left">
                            {itemTotal} ج.م
                          </span>

                          <button
                            type="button"
                            onClick={() => onRemoveItem(cartItem.item.id)}
                            className="text-stone-500 hover:text-red-400 p-1"
                            title="حذف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Delivery or Pickup Segmented Control */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-300 block text-right">
                  طريقة الاستلام:
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-stone-900 border border-stone-800">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('delivery')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                      deliveryType === 'delivery'
                        ? 'bg-amber-500 text-stone-950 shadow-sm'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    توصيل للمنزل (دليفري) 🛵
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryType('takeaway')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                      deliveryType === 'takeaway'
                        ? 'bg-amber-500 text-stone-950 shadow-sm'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    استلام من المطعم (تيك أواي) 🛍️
                  </button>
                </div>
              </div>

              {/* Customer Info Form */}
              <div className="space-y-3.5 bg-stone-900/50 p-4 rounded-xl border border-stone-800 text-right">
                <h4 className="text-xs font-bold text-amber-400">
                  بيانات العميل لتأكيد الأوردر:
                </h4>

                <div>
                  <label className="text-xs text-stone-400 block mb-1">اسم العميل *</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="مثال: أحمد مصطفى"
                      className="w-full pr-9 pl-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-400"
                    />
                    <User className="w-4 h-4 text-stone-500 absolute right-2.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-stone-400 block mb-1">رقم الهاتف للتواصل *</label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        dir="ltr"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="012xxxxxxxx"
                        className="w-full pr-3 pl-9 py-2 rounded-lg bg-stone-950 border border-stone-800 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-400 text-right"
                      />
                      <Phone className="w-4 h-4 text-stone-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-stone-400 block mb-1">رقم هاتف بديل (اختياري)</label>
                    <input
                      type="tel"
                      dir="ltr"
                      value={alternatePhone}
                      onChange={(e) => setAlternatePhone(e.target.value)}
                      placeholder="رقم آخر إن وجد"
                      className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-400 text-right"
                    />
                  </div>
                </div>

                {deliveryType === 'delivery' && (
                  <div>
                    <label className="text-xs text-stone-400 block mb-1">العنوان بالتفصيل *</label>
                    <div className="relative">
                      <textarea
                        required
                        rows={2}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="المنطقة (كرداسة، إمبابة، الجيزة)، اسم الشارع، رقم العمارة، رقم الشقة"
                        className="w-full pr-9 pl-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-400 resize-none"
                      />
                      <MapPin className="w-4 h-4 text-stone-500 absolute right-2.5 top-3" />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-xs text-stone-400 block mb-1">
                    ملاحظات على الشواء والطلب (اختياري)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="مثال: تسوية زيادة، سلطة طحينة زيادة، بدون شطة، خبز سخن إضافي"
                      className="w-full pr-9 pl-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-400"
                    />
                    <MessageSquare className="w-4 h-4 text-stone-500 absolute right-2.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              {/* Price Calculation Summary */}
              <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-2 text-xs">
                <div className="flex justify-between text-stone-300">
                  <span>إجمالي الأصناف:</span>
                  <span className="font-mono tabular-nums font-bold">{subtotal} ج.م</span>
                </div>

                {deliveryType === 'delivery' && (
                  <div className="flex justify-between text-stone-300">
                    <span>رسوم التوصيل:</span>
                    <span className="font-mono tabular-nums font-bold text-amber-400">
                      {deliveryFee === 0 ? 'مجاناً (عرض العزومات)' : `${deliveryFee} ج.م`}
                    </span>
                  </div>
                )}

                <div className="pt-2 border-t border-stone-800 flex justify-between items-baseline text-sm font-black">
                  <span className="text-white">الإجمالي النهائي:</span>
                  <span className="text-xl text-amber-400 font-mono tabular-nums">
                    {grandTotal} <span className="text-xs font-bold text-stone-300">جنيه مصري</span>
                  </span>
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-lg bg-red-950/80 border border-red-800 text-red-200 text-xs font-semibold text-right">
                  {errorMessage}
                </div>
              )}

              {/* Confirm via WhatsApp CTA */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-400 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-emerald-950/50 flex items-center justify-center gap-2.5 transition-all transform active:scale-95"
              >
                <Send className="w-5 h-5 text-white" />
                <span>تأكيد الأوردر عبر واتساب الآن</span>
              </button>

              <p className="text-[11px] text-stone-400 text-center">
                بالضغط على الزر سيتم فتح محادثة واتساب الرسمية لمطعم أولاد نجم ({restaurantInfo.whatsapp}) مع تفاصيل الطلب كاملة.
              </p>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
