# Data Model & Schema Specification
## Unique Furniture Rohtak — Premium Custom Ecommerce + Admin Platform

### 1. Entity Relationship Diagram (Conceptual)

```
[ Category ] 1 ──< [ Product ] 1 ──< [ Variant ]
                         │
                         ├──< [ Review ]
                         │
                         ├──< [ CartItem ] >── 1 [ Cart ]
                         │
                         └──< [ OrderItem ] >── 1 [ Order ] >── 1 [ Customer ]

[ CustomQuoteRequest ] >── 1 [ Customer ]
[ CMSContent ] (Singleton Global Configuration)
[ StoreSettings ] (Singleton Business Information)
```

---

### 2. Detailed Data Schemas

#### 2.1 Product Schema (`products.json`)
```typescript
interface Product {
  id: string;                      // e.g. "prod-001"
  slug: string;                    // e.g. "royal-sheesham-hydraulic-storage-bed"
  name: string;                    // e.g. "The Royal Sheesham Hydraulic Bed"
  tagline: string;                 // e.g. "Handcrafted Solid Teak with Concealed Gas-Lift Storage"
  category: string;                // "bedroom" | "living-room" | "dining" | "office" | "mattresses" | "outdoor" | "modular-kitchen"
  subcategory: string;             // "beds" | "sofas" | "dining-tables" | "wardrobes"
  price: number;                   // In INR e.g. 48500
  comparePrice?: number;           // In INR e.g. 58000
  rating: number;                  // e.g. 4.9
  reviewCount: number;             // e.g. 38
  sku: string;                     // e.g. "UF-BED-001"
  inStock: boolean;
  stockQuantity: number;
  featured: boolean;
  isCustomizable: boolean;
  leadTime: string;                // e.g. "Ready to dispatch in 48 hours" or "7-10 days custom"
  dimensions: {
    width: string;                 // e.g. "76 inches (193 cm)"
    depth: string;                 // e.g. "84 inches (213 cm)"
    height: string;                // e.g. "48 inches (122 cm)"
    seatingHeight?: string;        // e.g. "18 inches (45 cm)"
    weight: string;                // e.g. "98 kg"
  };
  materials: {
    primaryWood: string;           // e.g. "Grade-A Seasoned Sheesham (Indian Rosewood)"
    finish: string;                // e.g. "Natural Walnut Satin Polyurethane"
    hardware: string;              // e.g. "German Hydraulic Gas-Lifts (EBCO)"
    upholstery?: string;           // e.g. "Premium Velvet Cushion Headrest"
  };
  warranty: string;                // e.g. "10-Year Termite & Structural Warranty"
  images: string[];                // Array of high-res image URLs
  variants: {
    finishes: { name: string; hex: string; priceDelta: number }[];
    sizes: { name: string; priceDelta: number }[];
    fabrics?: { name: string; hex: string; priceDelta: number }[];
  };
  features: string[];
  careInstructions: string[];
}
```

#### 2.2 Custom Quote Request Schema
```typescript
interface CustomQuoteRequest {
  id: string;                      // e.g. "QUOTE-2026-041"
  timestamp: string;               // ISO date
  customer: {
    name: string;
    phone: string;
    email?: string;
    locality: string;              // e.g. "Model Town, Rohtak"
  };
  furnitureType: string;           // e.g. "L-Shape Modular Sofa"
  roomDimensions: string;          // e.g. "14 ft x 18 ft"
  preferredMaterial: string;       // e.g. "Teak Wood + Stain-resistant Bouclé"
  budgetTier: string;              // "₹25k - ₹50k" | "₹50k - ₹1 Lakh" | "₹1 Lakh+"
  referenceImageUrl?: string;
  notes: string;
  status: "New" | "Contacted" | "Designing" | "Quoted" | "Approved" | "In Production" | "Delivered";
  adminNotes?: string;
}
```

#### 2.3 Verified Customer Review Schema (`reviews.json`)
```typescript
interface CustomerReview {
  id: string;
  customerName: string;
  locality: string;                // e.g. "Tilak Nagar, Rohtak"
  rating: number;                  // 5
  date: string;                    // e.g. "August 2026"
  productPurchased: string;        // e.g. "Solid Sheesham 6-Seater Dining Set"
  category: string;                // "dining" | "bedroom" | "living-room" | "office" | "custom"
  reviewText: string;
  verifiedBuyer: boolean;
  deliveryCity: string;            // "Rohtak" | "Bahadurgarh" | "Sonipat" | "Delhi NCR"
}
```

#### 2.4 Order & OrderItem Schema
```typescript
interface Order {
  orderId: string;                 // e.g. "UF-ORD-9821"
  createdAt: string;
  customer: {
    fullName: string;
    phone: string;
    email: string;
    shippingAddress: {
      addressLine: string;
      locality: string;
      city: string;
      state: string;               // "Haryana"
      pincode: string;             // e.g. "124001"
    };
  };
  items: {
    productId: string;
    productName: string;
    variantSummary: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  pricing: {
    subtotal: number;
    discount: number;
    shippingFee: number;
    gstAmount: number;
    grandTotal: number;
  };
  paymentMethod: "UPI" | "Credit/Debit Card" | "Net Banking" | "Showroom Deposit / COD";
  paymentStatus: "Pending" | "Paid" | "Authorized";
  orderStatus: "Confirmed" | "Processing" | "Ready for Dispatch" | "Out for Delivery" | "Delivered";
}
```

#### 2.5 CMS Content Schema (`cms-content.json`)
```typescript
interface CMSContent {
  announcementBar: {
    text: string;
    badge: string;
    active: boolean;
  };
  hero: {
    tagline: string;
    headline: string;
    subheading: string;
    primaryCtaText: string;
    secondaryCtaText: string;
    backgroundImage: string;
  };
  showroom: {
    address: string;
    phone: string;
    hours: string;
    googleMapsEmbedUrl: string;
  };
  promotions: {
    title: string;
    description: string;
    couponCode: string;
    discountPercent: number;
  };
}
```
