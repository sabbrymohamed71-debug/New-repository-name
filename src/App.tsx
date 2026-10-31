import React, { useState, useEffect } from 'react';
import { 
  initialMenuItems, 
  initialCategories, 
  initialRestaurantInfo, 
  initialReviews 
} from './data/initialData';
import { MenuItem, CartItem, Order, RestaurantInfo, Review } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PopularDishes } from './components/PopularDishes';
import { SpecialOffers } from './components/SpecialOffers';
import { MenuSection } from './components/MenuSection';
import { GallerySection } from './components/GallerySection';
import { RestaurantInfoAndMap } from './components/RestaurantInfoAndMap';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { AdminDashboard } from './components/AdminDashboard';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ShoppingBag } from 'lucide-react';

export default function App() {
  // Persistent restaurant info
  const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInfo>(() => {
    try {
      const saved = localStorage.getItem('negm_restaurant_info');
      return saved ? JSON.parse(saved) : initialRestaurantInfo;
    } catch {
      return initialRestaurantInfo;
    }
  });

  // Persistent menu items
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem('negm_menu_items');
      return saved ? JSON.parse(saved) : initialMenuItems;
    } catch {
      return initialMenuItems;
    }
  });

  // Persistent reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('negm_reviews');
      return saved ? JSON.parse(saved) : initialReviews;
    } catch {
      return initialReviews;
    }
  });

  // Persistent orders log
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('negm_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('negm_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('negm_restaurant_info', JSON.stringify(restaurantInfo));
  }, [restaurantInfo]);

  useEffect(() => {
    localStorage.setItem('negm_menu_items', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('negm_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('negm_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('negm_cart', JSON.stringify(cart));
  }, [cart]);

  // Cart Handlers
  const handleAddToCart = (item: MenuItem, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((c) => c.item.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prevCart, { item, quantity }];
    });
  };

  const handleUpdateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(itemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((c) => (c.item.id === itemId ? { ...c, quantity } : c))
    );
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((c) => c.item.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Order Handlers
  const handleOrderSaved = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  // Review Handlers
  const handleAddReview = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  const handleDeleteReview = (reviewId: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
  };

  // Reset all data to defaults
  const handleResetDefaults = () => {
    setRestaurantInfo(initialRestaurantInfo);
    setMenuItems(initialMenuItems);
    setReviews(initialReviews);
    setOrders([]);
    setCart([]);
    localStorage.removeItem('negm_restaurant_info');
    localStorage.removeItem('negm_menu_items');
    localStorage.removeItem('negm_reviews');
    localStorage.removeItem('negm_orders');
    localStorage.removeItem('negm_cart');
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartAmount = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-['Cairo',sans-serif] selection:bg-amber-600 selection:text-white">
      {/* Navigation Top Bar */}
      <Navbar
        cartCount={totalCartCount}
        cartTotal={totalCartAmount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero
          restaurantInfo={restaurantInfo}
          onOpenCart={() => setIsCartOpen(true)}
        />

        <PopularDishes
          items={menuItems}
          onAddToCart={handleAddToCart}
          onOpenCart={() => setIsCartOpen(true)}
        />

        <SpecialOffers
          items={menuItems}
          onAddToCart={handleAddToCart}
        />

        <MenuSection
          items={menuItems}
          categories={initialCategories}
          onAddToCart={handleAddToCart}
          onOpenCart={() => setIsCartOpen(true)}
        />

        <GallerySection
          onOpenCart={() => setIsCartOpen(true)}
        />

        <RestaurantInfoAndMap
          restaurantInfo={restaurantInfo}
        />

        <ReviewsSection
          reviews={reviews}
          restaurantInfo={restaurantInfo}
          onAddReview={handleAddReview}
        />
      </main>

      {/* Footer */}
      <Footer
        restaurantInfo={restaurantInfo}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp
        restaurantInfo={restaurantInfo}
      />

      {/* Mobile Sticky Order Bar (only when items are in cart) */}
      {totalCartCount > 0 && !isCartOpen && (
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-stone-900/95 border-t border-amber-500/30 backdrop-blur-lg shadow-2xl animate-in slide-in-from-bottom">
          <div className="flex items-center justify-between gap-3">
            <div className="text-right">
              <span className="text-[11px] text-stone-400 block">السلة ({totalCartCount} أصناف)</span>
              <span className="text-base font-bold text-amber-400 font-mono tabular-nums">
                {totalCartAmount} ج.م
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-stone-950" />
              <span>متابعة الطلب عبر واتساب</span>
            </button>
          </div>
        </div>
      )}

      {/* Cart & WhatsApp Ordering Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        restaurantInfo={restaurantInfo}
        onOrderSaved={handleOrderSaved}
      />

      {/* Admin Dashboard Modal */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        restaurantInfo={restaurantInfo}
        onUpdateRestaurantInfo={setRestaurantInfo}
        menuItems={menuItems}
        onUpdateMenuItems={setMenuItems}
        orders={orders}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onDeleteOrder={handleDeleteOrder}
        reviews={reviews}
        onDeleteReview={handleDeleteReview}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  );
}
