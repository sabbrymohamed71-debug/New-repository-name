import React, { useState } from 'react';
import { 
  X, Lock, Key, ShieldCheck, Plus, Trash2, Edit3, Save, 
  RotateCcw, Check, Phone, MessageSquare, Clock, MapPin, 
  DollarSign, Sparkles, Tag, ShoppingBag, Eye 
} from 'lucide-react';
import { MenuItem, Category, Order, RestaurantInfo, Review } from '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantInfo: RestaurantInfo;
  onUpdateRestaurantInfo: (info: RestaurantInfo) => void;
  menuItems: MenuItem[];
  onUpdateMenuItems: (items: MenuItem[]) => void;
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onDeleteOrder: (orderId: string) => void;
  reviews: Review[];
  onDeleteReview: (reviewId: string) => void;
  onResetDefaults: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  restaurantInfo,
  onUpdateRestaurantInfo,
  menuItems,
  onUpdateMenuItems,
  orders,
  onUpdateOrderStatus,
  onDeleteOrder,
  reviews,
  onDeleteReview,
  onResetDefaults
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'menu' | 'orders' | 'info' | 'offers' | 'reviews'>('menu');

  // Edit / Add Item States
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAddingItem, setIsAddingItem] = useState<boolean>(false);
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: '',
    category: 'grills',
    price: 100,
    unit: 'وجبة',
    description: '',
    image: '/assets/aistudio/image_6d21697c.png',
    isPopular: false,
    isOffer: false,
    available: true
  });

  // Local copy of restaurant info for editing
  const [infoForm, setInfoForm] = useState<RestaurantInfo>(restaurantInfo);
  const [infoSaveSuccess, setInfoSaveSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'negm2026' || passwordInput === '123456' || passwordInput === 'admin') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('كلمة المرور غير صحيحة (جرّب: negm2026)');
    }
  };

  // Menu item mutations
  const handleToggleAvailable = (id: string) => {
    const updated = menuItems.map((item) =>
      item.id === id ? { ...item, available: !item.available } : item
    );
    onUpdateMenuItems(updated);
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الصنف من المنيو؟')) {
      const updated = menuItems.filter((item) => item.id !== id);
      onUpdateMenuItems(updated);
    }
  };

  const handleSaveEditItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    const updated = menuItems.map((item) =>
      item.id === editingItem.id ? editingItem : item
    );
    onUpdateMenuItems(updated);
    setEditingItem(null);
  };

  const handleAddNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return;
    const created: MenuItem = {
      id: 'item-' + Date.now(),
      name: newItem.name,
      category: newItem.category || 'grills',
      price: Number(newItem.price),
      originalPrice: newItem.originalPrice ? Number(newItem.originalPrice) : undefined,
      unit: newItem.unit || 'وجبة',
      description: newItem.description || '',
      image: newItem.image || '/assets/aistudio/image_6d21697c.png',
      isPopular: !!newItem.isPopular,
      isOffer: !!newItem.isOffer,
      available: true
    };
    onUpdateMenuItems([created, ...menuItems]);
    setIsAddingItem(false);
    setNewItem({
      name: '',
      category: 'grills',
      price: 100,
      unit: 'وجبة',
      description: '',
      image: '/assets/aistudio/image_6d21697c.png',
      isPopular: false,
      isOffer: false,
      available: true
    });
  };

  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateRestaurantInfo(infoForm);
    setInfoSaveSuccess(true);
    setTimeout(() => setInfoSaveSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 animate-in fade-in">
      <div className="relative w-full max-w-5xl bg-stone-950 border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[90vh]">
        
        {/* Modal Top Bar */}
        <div className="p-4 border-b border-stone-800 bg-stone-900 flex items-center justify-between text-right">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                لوحة تحكم إدارة مطعم أولاد نجم
              </h2>
              <span className="text-xs text-stone-400">
                إدارة الأصناف، الأسعار، العروض، سجل الطلبات، وبيانات التواصل
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800"
            aria-label="إغلاق لوحة التحكم"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Check Screen */}
        {!isAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="max-w-sm w-full bg-stone-900/90 border border-stone-800 rounded-2xl p-6 text-center space-y-4 shadow-xl">
              <div className="w-14 h-14 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto">
                <Lock className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-white">تسجيل دخول الإدارة</h3>
              <p className="text-xs text-stone-400">
                أدخل كلمة مرور صاحب المطعم للوصول للوحة التحكم.
              </p>

              <form onSubmit={handleLogin} className="space-y-3 pt-2 text-right">
                <div>
                  <input
                    type="password"
                    autoFocus
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="كلمة المرور..."
                    className="w-full px-3 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-sm text-white focus:outline-none focus:border-amber-400 text-center tracking-widest"
                  />
                  <span className="text-[11px] text-amber-400/80 block mt-1 text-center">
                    كلمة المرور الافتراضية: <strong>negm2026</strong>
                  </span>
                </div>

                {authError && (
                  <p className="text-xs text-red-400 font-semibold text-center">{authError}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-all"
                >
                  دخول للوحة التحكم
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard Content */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Tabs Header */}
            <div className="bg-stone-900/80 border-b border-stone-800 px-4 py-2 flex items-center justify-between gap-3 overflow-x-auto text-right">
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => setActiveTab('menu')}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'menu'
                      ? 'bg-amber-500 text-stone-950'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800'
                  }`}
                >
                  إدارة المنيو والأسعار ({menuItems.length})
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'orders'
                      ? 'bg-amber-500 text-stone-950'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800'
                  }`}
                >
                  <span>سجل الطلبات</span>
                  {orders.length > 0 && (
                    <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                      {orders.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('offers')}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'offers'
                      ? 'bg-amber-500 text-stone-950'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800'
                  }`}
                >
                  العروض والخصومات
                </button>
                <button
                  onClick={() => setActiveTab('info')}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'info'
                      ? 'bg-amber-500 text-stone-950'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800'
                  }`}
                >
                  بيانات المطعم ورقم واتساب
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'reviews'
                      ? 'bg-amber-500 text-stone-950'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800'
                  }`}
                >
                  التقييمات ({reviews.length})
                </button>
              </div>

              {/* Reset to defaults button */}
              <button
                onClick={() => {
                  if (window.confirm('هل تريد استعادة البيانات الافتراضية الأصلية للمطعم؟')) {
                    onResetDefaults();
                    alert('تم استعادة البيانات الأصلية بنجاح!');
                  }
                }}
                className="text-[11px] text-stone-400 hover:text-amber-400 flex items-center gap-1 shrink-0"
                title="استعادة البيانات الافتراضية"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>استعادة الافتراضي</span>
              </button>
            </div>

            {/* Tab Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 text-right">
              
              {/* TAB 1: MENU & PRICES */}
              {activeTab === 'menu' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white">
                        قائمة أصناف المشويات والأسعار
                      </h3>
                      <p className="text-xs text-stone-400">
                        يمكنك تعديل الأسعار فوراً، أو إيقاف توفر صنف، أو إضافة أطباق جديدة.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsAddingItem(true)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs"
                    >
                      <Plus className="w-4 h-4" />
                      <span>إضافة صنف جديد</span>
                    </button>
                  </div>

                  {/* Menu Table */}
                  <div className="rounded-xl border border-stone-800 overflow-hidden bg-stone-900/50">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-right">
                        <thead className="bg-stone-900 text-stone-300 border-b border-stone-800">
                          <tr>
                            <th className="p-3">الصورة</th>
                            <th className="p-3">اسم الصنف</th>
                            <th className="p-3">القسم</th>
                            <th className="p-3">الكمية/الوحدة</th>
                            <th className="p-3">السعر (ج.م)</th>
                            <th className="p-3">الحالة</th>
                            <th className="p-3">إجراءات</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-800/80">
                          {menuItems.map((item) => (
                            <tr key={item.id} className="hover:bg-stone-900/80 transition-colors">
                              <td className="p-3">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  referrerPolicy="no-referrer"
                                  className="w-10 h-10 object-cover rounded-lg border border-stone-800"
                                />
                              </td>
                              <td className="p-3 font-bold text-white max-w-[200px] truncate">
                                {item.name}
                              </td>
                              <td className="p-3 text-stone-400">{item.category}</td>
                              <td className="p-3 text-stone-300">{item.unit}</td>
                              <td className="p-3 font-mono font-bold text-amber-400 text-sm">
                                {item.price} ج.م
                              </td>
                              <td className="p-3">
                                <button
                                  onClick={() => handleToggleAvailable(item.id)}
                                  className={`px-2 py-1 rounded text-[11px] font-bold ${
                                    item.available
                                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                      : 'bg-red-950 text-red-400 border border-red-800'
                                  }`}
                                >
                                  {item.available ? 'متاح للطلب' : 'غير متوفر'}
                                </button>
                              </td>
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => setEditingItem(item)}
                                    className="p-1.5 text-stone-300 hover:text-amber-400 rounded hover:bg-stone-800"
                                    title="تعديل"
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteItem(item.id)}
                                    className="p-1.5 text-stone-400 hover:text-red-400 rounded hover:bg-stone-800"
                                    title="حذف"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ORDERS TRACKING LOG */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-white">
                      سجل طلبات الواتساب الواردة من الموقع
                    </h3>
                    <p className="text-xs text-stone-400">
                      يتم تسجيل كل طلب يرسله العميل عبر واتساب لتتمكن من متابعة حالة التجهيز والتوصيل.
                    </p>
                  </div>

                  {orders.length === 0 ? (
                    <div className="py-16 text-center rounded-xl bg-stone-900 border border-stone-800 space-y-2">
                      <ShoppingBag className="w-8 h-8 text-stone-600 mx-auto" />
                      <p className="text-sm font-semibold text-stone-300">
                        لا توجد طلبات مسجلة حتى الآن
                      </p>
                      <p className="text-xs text-stone-500">
                        عندما يقوم أي عميل بتأكيد أوردر عبر واتساب سيظهر هنا تلقائياً.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {orders.map((ord) => (
                        <div
                          key={ord.id}
                          className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-3 text-xs"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800/80 pb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-amber-400 text-sm">
                                #{ord.id}
                              </span>
                              <span className="text-stone-400">({ord.createdAt})</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-stone-400">حالة الطلب:</span>
                              <select
                                value={ord.status}
                                onChange={(e) =>
                                  onUpdateOrderStatus(ord.id, e.target.value as Order['status'])
                                }
                                className="bg-stone-950 border border-stone-700 text-white rounded px-2 py-1 text-xs focus:outline-none"
                              >
                                <option value="pending">قيد الانتظار 🟡</option>
                                <option value="preparing">قيد الشواء والتجهيز 🟠</option>
                                <option value="delivered">تم التوصيل بنجاح 🟢</option>
                                <option value="cancelled">ملغي 🔴</option>
                              </select>

                              <button
                                onClick={() => onDeleteOrder(ord.id)}
                                className="p-1 text-stone-400 hover:text-red-400"
                                title="حذف السجل"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <div>
                              <span className="text-stone-500 block">العميل:</span>
                              <span className="font-bold text-white">{ord.customerName}</span>
                            </div>
                            <div>
                              <span className="text-stone-500 block">الهاتف:</span>
                              <a
                                href={`tel:${ord.customerPhone}`}
                                className="font-mono text-amber-400 hover:underline"
                              >
                                {ord.customerPhone}
                              </a>
                            </div>
                            <div>
                              <span className="text-stone-500 block">العنوان وطريقة الاستلام:</span>
                              <span className="text-stone-200">
                                {ord.deliveryType === 'delivery' ? 'دليفري' : 'استلام'} - {ord.address}
                              </span>
                            </div>
                          </div>

                          <div className="p-2.5 rounded bg-stone-950 border border-stone-800">
                            <span className="text-stone-400 block mb-1 font-semibold">
                              الأصناف المطلوبة:
                            </span>
                            <div className="space-y-1">
                              {ord.items.map((it, idx) => (
                                <div key={idx} className="flex justify-between text-stone-300">
                                  <span>
                                    {it.quantity} × {it.name} ({it.unit})
                                  </span>
                                  <span className="font-mono font-bold">
                                    {it.quantity * it.price} ج.م
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex justify-between items-center pt-1 font-bold text-sm">
                            <span className="text-stone-400">الإجمالي النهائي:</span>
                            <span className="text-amber-400 font-mono text-base">
                              {ord.totalAmount} جنيه مصري
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: RESTAURANT INFO & WHATSAPP */}
              {activeTab === 'info' && (
                <form onSubmit={handleSaveInfo} className="max-w-2xl space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-white">
                      تعديل بيانات المطعم ورقم واتساب ومواعيد العمل
                    </h3>
                    <p className="text-xs text-stone-400">
                      التعديل هنا يغير أرقام الاتصال وروابط واتساب والمواعيد في كامل الموقع فوراً.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-stone-300 block mb-1">اسم المطعم</label>
                      <input
                        type="text"
                        value={infoForm.name}
                        onChange={(e) => setInfoForm({ ...infoForm, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-800 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-stone-300 block mb-1">الوصف الفرعي</label>
                      <input
                        type="text"
                        value={infoForm.subTitle}
                        onChange={(e) => setInfoForm({ ...infoForm, subTitle: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-800 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-stone-300 block mb-1">
                        رقم واتساب المطعم (لاستقبال الطلبات) *
                      </label>
                      <input
                        type="text"
                        dir="ltr"
                        required
                        value={infoForm.whatsapp}
                        onChange={(e) => {
                          const val = e.target.value;
                          setInfoForm({
                            ...infoForm,
                            whatsapp: val,
                            whatsappLink: `https://wa.me/2${val.replace(/\D/g, '').replace(/^0/, '')}`
                          });
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-800 text-xs text-white focus:outline-none focus:border-amber-400 text-right font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-stone-300 block mb-1">
                        رقم الهاتف للاتصال المباشر
                      </label>
                      <input
                        type="text"
                        dir="ltr"
                        value={infoForm.phone}
                        onChange={(e) => setInfoForm({ ...infoForm, phone: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-800 text-xs text-white focus:outline-none focus:border-amber-400 text-right font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-stone-300 block mb-1">العنوان التفصيلي</label>
                    <input
                      type="text"
                      value={infoForm.address}
                      onChange={(e) => setInfoForm({ ...infoForm, address: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-800 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-stone-300 block mb-1">مواعيد العمل</label>
                      <input
                        type="text"
                        value={infoForm.openingHours}
                        onChange={(e) => setInfoForm({ ...infoForm, openingHours: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-800 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-stone-300 block mb-1">تنبيه وقت الإغلاق</label>
                      <input
                        type="text"
                        value={infoForm.closingTimeNotice}
                        onChange={(e) =>
                          setInfoForm({ ...infoForm, closingTimeNotice: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-800 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-stone-300 block mb-1">
                      رابط خرائط جوجل (Google Maps)
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={infoForm.googleMapsUrl}
                      onChange={(e) => setInfoForm({ ...infoForm, googleMapsUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-800 text-xs text-white focus:outline-none focus:border-amber-400 text-right font-mono"
                    />
                  </div>

                  {infoSaveSuccess && (
                    <div className="p-2.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-semibold">
                      تم حفظ التعديلات وتحديث الموقع بنجاح!
                    </div>
                  )}

                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs"
                  >
                    <Save className="w-4 h-4" />
                    <span>حفظ بيانات المطعم</span>
                  </button>
                </form>
              )}

              {/* TAB 4: OFFERS */}
              {activeTab === 'offers' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-white">إدارة العروض المميزة والخصومات</h3>
                    <p className="text-xs text-stone-400">
                      حدد الأصناف التي تود إظهارها في قسم العروض مع أسعارها المخفضة.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {menuItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 object-cover rounded-lg"
                          />
                          <div>
                            <span className="font-bold text-white block text-xs">{item.name}</span>
                            <span className="text-[11px] text-amber-400 font-mono">
                              {item.price} ج.م {item.originalPrice ? `(كان ${item.originalPrice})` : ''}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            const updated = menuItems.map((m) =>
                              m.id === item.id
                                ? {
                                    ...m,
                                    isOffer: !m.isOffer,
                                    originalPrice: !m.isOffer ? Math.round(m.price * 1.15) : undefined
                                  }
                                : m
                            );
                            onUpdateMenuItems(updated);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                            item.isOffer
                              ? 'bg-amber-500 text-stone-950'
                              : 'bg-stone-800 text-stone-400 hover:text-white'
                          }`}
                        >
                          {item.isOffer ? 'مدرج بالعروض ✓' : 'إضافة للعروض'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: REVIEWS */}
              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-white">إدارة مراجعات العملاء</h3>
                    <p className="text-xs text-stone-400">
                      يمكنك حذف المراجعات غير اللائقة أو مراجعة آراء الزوار المسجلة.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="p-3 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white">{rev.author}</span>
                            <span className="text-amber-400 font-mono">({rev.rating} نجوم)</span>
                            <span className="text-stone-500">{rev.date}</span>
                          </div>
                          <p className="text-stone-300 mt-1">"{rev.comment}"</p>
                        </div>

                        <button
                          onClick={() => onDeleteReview(rev.id)}
                          className="p-2 text-stone-400 hover:text-red-400 rounded hover:bg-stone-800 shrink-0"
                          title="حذف المراجعة"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>

      {/* Edit Item Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/85 p-4 animate-in fade-in">
          <div className="max-w-md w-full bg-stone-950 border border-amber-500/30 rounded-2xl p-5 text-right space-y-4">
            <div className="flex justify-between items-center border-b border-stone-800 pb-2">
              <h3 className="text-sm font-bold text-white">تعديل بيانات الصنف</h3>
              <button onClick={() => setEditingItem(null)} className="text-stone-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEditItem} className="space-y-3 text-xs">
              <div>
                <label className="text-stone-400 block mb-1">اسم الصنف</label>
                <input
                  type="text"
                  required
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-stone-900 border border-stone-800 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-stone-400 block mb-1">السعر (ج.م) *</label>
                  <input
                    type="number"
                    required
                    value={editingItem.price}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, price: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded bg-stone-900 border border-stone-800 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-stone-400 block mb-1">السعر الأصلي (اختياري)</label>
                  <input
                    type="number"
                    value={editingItem.originalPrice || ''}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        originalPrice: e.target.value ? Number(e.target.value) : undefined
                      })
                    }
                    className="w-full px-3 py-2 rounded bg-stone-900 border border-stone-800 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-stone-400 block mb-1">الوصف</label>
                <textarea
                  rows={2}
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-stone-900 border border-stone-800 text-white resize-none"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold"
                >
                  حفظ التعديلات
                </button>
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-3 py-2 rounded-lg bg-stone-900 text-stone-300"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New Item Modal */}
      {isAddingItem && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/85 p-4 animate-in fade-in">
          <div className="max-w-md w-full bg-stone-950 border border-amber-500/30 rounded-2xl p-5 text-right space-y-4">
            <div className="flex justify-between items-center border-b border-stone-800 pb-2">
              <h3 className="text-sm font-bold text-white">إضافة صنف جديد للمنيو</h3>
              <button onClick={() => setIsAddingItem(false)} className="text-stone-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddNewItem} className="space-y-3 text-xs">
              <div>
                <label className="text-stone-400 block mb-1">اسم الصنف *</label>
                <input
                  type="text"
                  required
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  placeholder="مثال: كفتة على الفحم بالخلطة"
                  className="w-full px-3 py-2 rounded bg-stone-900 border border-stone-800 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-stone-400 block mb-1">القسم</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-stone-900 border border-stone-800 text-white"
                  >
                    <option value="grills">مشويات لحوم</option>
                    <option value="poultry">دواجن وفراخ</option>
                    <option value="trays">صواني العزومات</option>
                    <option value="pigeon_tagines">حمام وطواجن</option>
                    <option value="sandwiches">سندوتشات</option>
                    <option value="sides">مقبلات وسلطات</option>
                  </select>
                </div>
                <div>
                  <label className="text-stone-400 block mb-1">السعر (ج.م) *</label>
                  <input
                    type="number"
                    required
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded bg-stone-900 border border-stone-800 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-stone-400 block mb-1">الكمية/الوحدة</label>
                <input
                  type="text"
                  value={newItem.unit}
                  onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                  placeholder="مثال: نصف كيلو / وجبة"
                  className="w-full px-3 py-2 rounded bg-stone-900 border border-stone-800 text-white"
                />
              </div>

              <div>
                <label className="text-stone-400 block mb-1">الوصف</label>
                <textarea
                  rows={2}
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  placeholder="مكونات الطبق والتقديم..."
                  className="w-full px-3 py-2 rounded bg-stone-900 border border-stone-800 text-white resize-none"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold"
                >
                  إضافة الصنف
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingItem(false)}
                  className="px-3 py-2 rounded-lg bg-stone-900 text-stone-300"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
