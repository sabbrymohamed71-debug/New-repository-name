import { MenuItem, Category, Review, RestaurantInfo } from '../types';

export const initialRestaurantInfo: RestaurantInfo = {
  name: 'مطعم أولاد نجم',
  subTitle: 'لجميع أنواع المشويات على الفحم',
  phone: '01207744595',
  whatsapp: '01207744595',
  whatsappLink: 'https://wa.me/201207744595',
  address: 'كوبري المنشية، كرداسة، إمبابة، محافظة الجيزة',
  area: 'كرداسة - إمبابة',
  city: 'الجيزة 3557330',
  googleMapsUrl: 'https://maps.app.goo.gl/gvypC1NPHgH2PA6J6',
  rating: 4.3,
  reviewsCount: 109,
  priceRange: '1 - 200 ج.م للفرد',
  openingHours: 'يومياً من 11:00 صباحاً حتى 02:00 صباحاً',
  closingTimeNotice: 'يغلق الساعة 2 صباحاً'
};

export const initialCategories: Category[] = [
  { id: 'all', name: 'جميع الأصناف' },
  { id: 'trays', name: 'صواني العزومات واللمة' },
  { id: 'grills', name: 'مشويات اللحوم على الفحم' },
  { id: 'poultry', name: 'فراخ ودواجن مشوية' },
  { id: 'pigeon_tagines', name: 'حمام محشي وطواجن' },
  { id: 'sandwiches', name: 'سندوتشات المشويات' },
  { id: 'sides', name: 'مقبلات، سلطات وأرز' }
];

export const initialMenuItems: MenuItem[] = [
  // صواني العزومات
  {
    id: 'tray-1',
    name: 'صينية نجم الملكية الكبرى',
    category: 'trays',
    price: 1150,
    originalPrice: 1300,
    unit: 'صينية لـ 6-8 أفراد',
    description: 'صينية العزومات الفاخرة: فرخة مشوية على الفحم كاملة، مشكل كفتة وطرب بلدي، ورق عنب محشي، أرز بسمتي بالخلطة والمكسرات، خضار مشوي وسلطات مشكلة وطحينة وعيش.',
    image: '/assets/aistudio/image_770668b5.png',
    isPopular: true,
    isOffer: true,
    available: true
  },
  {
    id: 'tray-2',
    name: 'صينية اللمة العائلية',
    category: 'trays',
    price: 780,
    originalPrice: 890,
    unit: 'صينية لـ 4-5 أفراد',
    description: 'نصف كفتة بلدي مشوية، نصف طرب ضاني، نصف دجاجة شواية على الفحم، سرفيس أرز بسمتي بالخلطة، طحينة، سلطة خضراء، ومخلل بلدي.',
    image: '/assets/aistudio/image_6d21697c.png',
    isPopular: true,
    isOffer: true,
    available: true
  },
  {
    id: 'tray-3',
    name: 'صينية الحمام والمشويات المزدوجة',
    category: 'trays',
    price: 640,
    originalPrice: 720,
    unit: 'صينية لـ 3-4 أفراد',
    description: 'زوج حمام محشي أرز بالخلطة والكبد والقوانص مع نصف كيلو كفتة مشوية على الفحم وأرز بسمتي أصفر وخضار مشوي وسلطات.',
    image: '/assets/aistudio/image_b4a7f0f4.png',
    isPopular: false,
    isOffer: true,
    available: true
  },

  // مشويات اللحوم
  {
    id: 'grill-1',
    name: 'مشكل مشويات نجم الملوكي',
    category: 'grills',
    price: 320,
    originalPrice: 360,
    unit: 'وجبة نصف كيلو',
    description: 'تشكيلة فاخرة من الكفتة الكندوز البلدي، الطرب الضاني على الفحم، وشيش الكباب المتبل، تقدم مع طماطم وفلفل مشوي وسلطات وعيش بلدي ساخن.',
    image: '/assets/aistudio/image_6d21697c.png',
    isPopular: true,
    isOffer: true,
    available: true
  },
  {
    id: 'grill-2',
    name: 'كفتة مشوية بلدي على الفحم',
    category: 'grills',
    price: 240,
    unit: 'نصف كيلو',
    description: 'كفتة لحم بلدي طازج مفروم مع التوابل المصرية الأصيلة والبصل والبقدونس، مشوية على الفحم الحي ومقدمة مع العيش والطحينة والسلطة الخضراء.',
    image: '/assets/aistudio/image_6d21697c.png',
    isPopular: true,
    available: true
  },
  {
    id: 'grill-3',
    name: 'طرب ضاني مشوي على الفحم',
    category: 'grills',
    price: 290,
    unit: 'نصف كيلو',
    description: 'طرب ضاني ملفوف بعناية ومتبل بالخلطة السرية، مشوي على نار هادئة حتى القرمشة والنضج المثالي، يقدم مع الطحينة والسلطة.',
    image: '/assets/aistudio/image_6d21697c.png',
    isPopular: true,
    available: true
  },
  {
    id: 'grill-4',
    name: 'كباب بتلو بلدي متبل',
    category: 'grills',
    price: 360,
    unit: 'نصف كيلو',
    description: 'قطع كباب بتلو طازجة منتقاة بعناية ومشوية بأسياخ على الفحم لتعطي نكهة الشواء الأصيلة وطراوة لا مثيل لها.',
    image: '/assets/aistudio/image_6d21697c.png',
    isPopular: false,
    available: true
  },
  {
    id: 'grill-5',
    name: 'ريش ضاني مشوية على الفحم',
    category: 'grills',
    price: 390,
    unit: 'نصف كيلو',
    description: 'ريش ضاني بلدي بتتبيلة الأعشاب والليمون المشوية على الجمر، نكهة لا تقاوم لعشاق اللحم الضاني الأصلي.',
    image: '/assets/aistudio/image_6d21697c.png',
    isPopular: true,
    available: true
  },

  // دواجن وفراخ مشوية
  {
    id: 'poultry-1',
    name: 'دجاجة كاملة مشوية على أسياخ الفحم',
    category: 'poultry',
    price: 230,
    originalPrice: 260,
    unit: 'دجاجة كاملة',
    description: 'دجاج بلدي طازج مغسول ومنقوع في تتبيلة نجم السرية، مشوي على شواية الفحم الدوارة حتى تكتسب لوناً ذهبياً رائعاً، يقدم مع الأرز والعيش والطحينة والمخلل.',
    image: '/assets/aistudio/image_53f31f49.png',
    isPopular: true,
    isOffer: true,
    available: true
  },
  {
    id: 'poultry-2',
    name: 'نصف دجاجة مشوية على الفحم',
    category: 'poultry',
    price: 125,
    unit: 'نصف دجاجة',
    description: 'نصف دجاجة متبلة مشوية على الفحم الحي تقدم مع أرز بسمتي أصفر أو عيش وسلطة وطحينة.',
    image: '/assets/aistudio/image_53f31f49.png',
    isPopular: false,
    available: true
  },
  {
    id: 'poultry-3',
    name: 'شيش طاووق على الفحم',
    category: 'poultry',
    price: 190,
    unit: 'وجبة فردية مشبعة',
    description: 'شيش طاووق صدور وأوراك مخلية ومتبلة بالزبادي والزعتر والليمون مع فلفل ألوان وبصل مشوي، يقدم مع الأرز والسلطات.',
    image: '/assets/aistudio/image_53f31f49.png',
    isPopular: false,
    available: true
  },

  // حمام محشي وطواجن
  {
    id: 'pigeon-1',
    name: 'زوج حمام محشي أرز بالخلطة',
    category: 'pigeon_tagines',
    price: 260,
    originalPrice: 300,
    unit: 'زوج (2 فردة)',
    description: 'حمام مصري بلدي محشي أرز بالخلطة السرية والكبد والقوانص والمكسرات، محمر بسمنة بلدي مع أرز بسمتي بالخلطة وطماطم مشوية.',
    image: '/assets/aistudio/image_b4a7f0f4.png',
    isPopular: true,
    isOffer: true,
    available: true
  },
  {
    id: 'pigeon-2',
    name: 'فردة حمام محشي بالخلطة',
    category: 'pigeon_tagines',
    price: 135,
    unit: 'فردة واحدة',
    description: 'حمام بلدي ممتلئ بحشوة الأرز المعصفر والكبدة البلدي المحمرة بالسمن، يقدم مع أرز وسلطات وطحينة.',
    image: '/assets/aistudio/image_b4a7f0f4.png',
    isPopular: false,
    available: true
  },
  {
    id: 'tagine-1',
    name: 'طاجن لحمة بالبصل الأورما في الفرن',
    category: 'pigeon_tagines',
    price: 180,
    unit: 'طاجن فخار فردي',
    description: 'قطع لحم بقري بلدي طري مطهو ببطء في طاجن فخار مع بصل أورما وصوص بني مكرمل وتوابل شرقية غنية.',
    image: '/assets/aistudio/image_6d21697c.png',
    isPopular: false,
    available: true
  },
  {
    id: 'tagine-2',
    name: 'طاجن ورق عنب بالكوارع أو الكفتة',
    category: 'pigeon_tagines',
    price: 160,
    unit: 'طاجن فخار',
    description: 'أصابع ورق عنب متبلة بالليمون والنعناع ومخبوزة في الفرن الفلاحي حتى الذوبان، تقدم ساخنة وشهية.',
    image: '/assets/aistudio/image_770668b5.png',
    isPopular: false,
    available: true
  },

  // سندوتشات
  {
    id: 'sand-1',
    name: 'ساندوتش كفتة مشوية بلدي',
    category: 'sandwiches',
    price: 55,
    unit: 'رغيف بلدي / عيش فينو كبير',
    description: 'أصابع كفتة مشوية على الفحم في عيش بلدي ساخن مع سلطة طحينة خام، بقدونس مفروم ورشة سماق.',
    image: '/assets/aistudio/image_6d21697c.png',
    isPopular: true,
    available: true
  },
  {
    id: 'sand-2',
    name: 'ساندوتش طرب ضاني مشوي',
    category: 'sandwiches',
    price: 65,
    unit: 'رغيف كبير',
    description: 'طرب ضاني مقرمش وغني بالعصارة مع سلطة طحينة وخضار وبقدونس طازج في خبز بلدي سميك.',
    image: '/assets/aistudio/image_6d21697c.png',
    isPopular: true,
    available: true
  },
  {
    id: 'sand-3',
    name: 'ساندوتش شيش طاووق فحم',
    category: 'sandwiches',
    price: 50,
    unit: 'رغيف كبير',
    description: 'قطع شيش طاووق دجاج مشوي متبل مع صوص الثومية أو الطحينة وشرائح الخيار المخلل المقرمش.',
    image: '/assets/aistudio/image_53f31f49.png',
    isPopular: false,
    available: true
  },
  {
    id: 'sand-4',
    name: 'حواوشي نجم على الفحم',
    category: 'sandwiches',
    price: 45,
    unit: 'رغيف حواوشي كامل',
    description: 'لحم بلدي متبل مع فلفل حار وتوابل الحواوشي المخصوصة في عيش بلدي ومحمص على شواية الفحم.',
    image: '/assets/aistudio/image_6d21697c.png',
    isPopular: true,
    available: true
  },

  // مقبلات وسلطات
  {
    id: 'side-1',
    name: 'سرفيس أرز بسمتي بالخلطة والمكسرات',
    category: 'sides',
    price: 45,
    unit: 'طبق عائلي',
    description: 'أرز بسمتي حبة طويلة أصفر متبل بالهيل والزعفران، مزين بالزبيب والسوداني والخلطة السرية.',
    image: '/assets/aistudio/image_b4a7f0f4.png',
    isPopular: false,
    available: true
  },
  {
    id: 'side-2',
    name: 'سلطة طحينة خام نجم المميزة',
    category: 'sides',
    price: 20,
    unit: 'علبة وسط',
    description: 'طحينة سمسم طبيعية 100% متبلة بالخل والليمون والكمون وزيت الزيتون والشطة الهادئة.',
    image: '/assets/aistudio/image_6d21697c.png',
    isPopular: false,
    available: true
  },
  {
    id: 'side-3',
    name: 'سلطة بلدي خضراء بالدريسينج البلدي',
    category: 'sides',
    price: 20,
    unit: 'علبة وسط',
    description: 'طماطم، خيار، بقدونس، بصل، وفلفل رومي مع دقة الخل والليمون ومياه السلطة المصرية المشهورة.',
    image: '/assets/aistudio/image_6d21697c.png',
    isPopular: false,
    available: true
  },
  {
    id: 'side-4',
    name: 'طبق مخلل مشكل بلدي',
    category: 'sides',
    price: 15,
    unit: 'علبة',
    description: 'تشكيلة مخللات بلدية مقرمشة من الجزر واللفت والخيار والفلفل والزيتون.',
    image: '/assets/aistudio/image_6d21697c.png',
    isPopular: false,
    available: true
  },
  {
    id: 'side-5',
    name: 'شوربة لسان عصفور سخنة',
    category: 'sides',
    price: 25,
    unit: 'بولة',
    description: 'شوربة لحم بلدي غنية ومحمرة بلسان العصفور الساخن مع لمسة ليمون طازج.',
    image: '/assets/aistudio/image_770668b5.png',
    isPopular: false,
    available: true
  }
];

export const initialReviews: Review[] = [
  {
    id: 'rev-1',
    author: 'محمود عبد الفتاح',
    rating: 5,
    date: 'منذ أسبوعين',
    comment: 'ما شاء الله تبارك الله، أنضف وأطعم مشويات في كرداسة كلها! الكفتة بلدي أصلي ومفيهاش دهن كتير، والفراخ على الفحم تتبيلتها عالمية ومستوية على الهادي. جربت صينية العزومات وبيضت وشي قدام الضيوف.',
    dish: 'صينية نجم الملكية الكبرى',
    isVerified: true
  },
  {
    id: 'rev-2',
    author: 'د. أشرف الصاوي',
    rating: 5,
    date: 'منذ 3 أسابيع',
    comment: 'الحمام المحشي والأرز البسمتي ممتازين جداً، الأكل وصل سخن جداً في الميعاد. الطرب خطير ومقرمش مش ثقيل. خدمة الدليفري في إمبابة والجيزة سريعة ومعاملة في قمة الاحترام.',
    dish: 'حمام محشي أرز بالخلطة',
    isVerified: true
  },
  {
    id: 'rev-3',
    author: 'أمير النجار',
    rating: 4,
    date: 'منذ شهر',
    comment: 'مطعم محترم وأسعاره عادلة جداً مقارنة بجودة اللحم البلدي وحجم الوجبات. المنيو متنوع والأكل طازة كل يوم. بالتوفيق لأولاد نجم دائماً في الصدارة.',
    dish: 'مشكل مشويات نجم',
    isVerified: true
  },
  {
    id: 'rev-4',
    author: 'المهندس مصطفى عثمان',
    rating: 5,
    date: 'منذ شهر',
    comment: 'طلبنا عن طريق الواتساب والأوردر كان دقيق جداً بكل التفاصيل اللي طلبناها بدون أي غلطة. الفراخ المشوية على الفحم ريحتها وطعمها فحم حقيقي مش مجرد توابل.',
    dish: 'دجاجة كاملة مشوية على أسياخ الفحم',
    isVerified: true
  }
];

export const galleryItems = [
  {
    id: 'gal-1',
    title: 'فراخ مشوية على أسياخ الفحم الحي',
    subtitle: 'شواية الفحم المباشرة بتتبيلة نجم السرية المقرمشة',
    image: '/assets/aistudio/image_53f31f49.png',
    category: 'شواية الفحم'
  },
  {
    id: 'gal-2',
    title: 'مشكل مشويات نجم الملوكي',
    subtitle: 'كفتة بلدي، طرب ضاني، شيش وخضار مشوي على فرشة بقدونس',
    image: '/assets/aistudio/image_6d21697c.png',
    category: 'مشويات بلدي'
  },
  {
    id: 'gal-3',
    title: 'حمام محشي بالخلطة على أرز بسمتي',
    subtitle: 'محمر بالسمنة الفلاحي مع خلطة الأرز المعصفر والكبد',
    image: '/assets/aistudio/image_b4a7f0f4.png',
    category: 'حمام وطواجن'
  },
  {
    id: 'gal-4',
    title: 'صينية العزومات واللمة الكبرى',
    subtitle: 'صينية الولائم الفاخرة مع محشي ورق العنب والأرز والدواجن',
    image: '/assets/aistudio/image_770668b5.png',
    category: 'صواني العزومات'
  }
];
