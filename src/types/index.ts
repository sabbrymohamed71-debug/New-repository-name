export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  unit: string;
  isPopular?: boolean;
  isOffer?: boolean;
  available: boolean;
}

export interface Category {
  id: string;
  name: string;
  iconName?: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
}

export interface Order {
  id: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  alternatePhone?: string;
  address: string;
  deliveryType: 'delivery' | 'takeaway';
  notes?: string;
  items: {
    name: string;
    quantity: number;
    price: number;
    unit: string;
  }[];
  totalAmount: number;
  status: 'pending' | 'preparing' | 'delivered' | 'cancelled';
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  dish?: string;
  isVerified?: boolean;
}

export interface RestaurantInfo {
  name: string;
  subTitle: string;
  phone: string;
  whatsapp: string;
  whatsappLink: string;
  address: string;
  area: string;
  city: string;
  googleMapsUrl: string;
  rating: number;
  reviewsCount: number;
  priceRange: string;
  openingHours: string;
  closingTimeNotice: string;
}
