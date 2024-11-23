export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrls: string[];
  features: string[];
  sizes: string[];
  colors: string[];
  temperatureSettings: number[];
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

export const PRODUCTS: Product[] = [
  {
    id: 'cozy-comfort-deluxe',
    name: 'Cozy Comfort Deluxe Heated Blanket',
    description: 'Experience ultimate warmth with our premium heated blanket featuring advanced temperature control and soft microfiber fabric.',
    price: 129.99,
    imageUrls: [
      '/Subject 3.png',
      '/Subject 3.png',
      '/Subject 3.png'
    ],
    features: [
      'Multiple temperature settings',
      'Auto shut-off safety feature',
      'Machine washable',
      'Extra soft microfiber material'
    ],
    sizes: ['Twin', 'Queen', 'King'],
    colors: ['Charcoal Gray', 'Midnight Blue', 'Warm Taupe'],
    temperatureSettings: [1, 2, 3, 4, 5],
    inStock: true,
    rating: 4.7,
    reviewCount: 342
  },
  {
    id: 'warmtech-pro-elite',
    name: 'WarmTech Pro Elite Heated Blanket',
    description: 'Advanced heating technology meets luxurious comfort. Perfect for cold nights and ultimate relaxation.',
    price: 159.99,
    imageUrls: [
      '/Subject 3.png',
      '/Subject 3.png',
      '/Subject 3.png'
    ],
    features: [
      'Dual-zone temperature control',
      'Rapid heat-up technology',
      'Waterproof controller',
      'Energy-efficient design'
    ],
    sizes: ['Queen', 'King'],
    colors: ['Deep Forest Green', 'Rich Burgundy'],
    temperatureSettings: [1, 2, 3, 4, 5, 6],
    inStock: true,
    rating: 4.9,
    reviewCount: 218
  },
  {
    id: 'snuggle-smart-heated-throw',
    name: 'Snuggle Smart Heated Throw Blanket',
    description: 'Compact, portable heated throw perfect for home, office, or travel. Smart temperature control via mobile app.',
    price: 89.99,
    imageUrls: [
      '/Subject 3.png',
      '/Subject 3.png',
      '/Subject 3.png'
    ],
    features: [
      'Bluetooth mobile app control',
      'Lightweight and portable',
      'Quick heating elements',
      'Soft sherpa lining'
    ],
    sizes: ['50" x 60"'],
    colors: ['Cloud White', 'Soft Sage', 'Heather Gray'],
    temperatureSettings: [1, 2, 3, 4],
    inStock: true,
    rating: 4.5,
    reviewCount: 276
  }
];
