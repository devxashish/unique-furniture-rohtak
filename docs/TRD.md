# Technical Requirements Document (TRD)
## Unique Furniture Rohtak — Premium Custom Ecommerce + Admin Platform

### 1. Architecture Stack & Technical Rationale

| Layer | Technology Selected | Rationale |
|---|---|---|
| **Core Architecture** | Semantic HTML5 + Vanilla ES6 Modular Architecture | Unmatched runtime performance, zero bundler bloat, 100% stable execution across all devices, zero hydration lag. |
| **Styling & Design Tokens** | CSS Custom Properties (`styles/tokens.css`) + CSS Grid/Flexbox | Precision control over architectural luxury aesthetics, instant theming, zero CSS framework overhead. |
| **Icons** | Lucide Icon System | Industry standard, unified 24px/20px geometric stroke weight, zero visual dissonance. |
| **Typography** | Google Fonts (`Plus Jakarta Sans` & `Playfair Display`) | Modern high-end editorial contrast; sans-serif legibility paired with refined serif display headlines. |
| **Smooth Motion** | Lenis Scroll Engine + CSS GPU Accelerated Animations | Buttery smooth momentum scrolling that respects `prefers-reduced-motion`. |
| **Interactive 3D / Spatial Engine** | HTML5 Canvas 3D Spatial Visualizer & Room Scale Simulator | Interactive room placement and dimension calculator without heavy WebGL memory leaks on mobile. |
| **State Management** | Event-Driven Reactive Store (`js/store.js`) | Centralized state container with LocalStorage persistence for Cart, Wishlist, Compare, Orders, Custom Quotes, CMS, and Catalog. |
| **Commerce Backend Abstraction** | Headless Adapter Pattern (`js/commerce-adapter.js`) | Plug-and-play architecture enabling immediate local execution, with clean drop-in bindings for Shopify Storefront API, Supabase, or custom REST backends. |
| **Testing & Quality Assurance** | Playwright Multi-Viewport Test Engine | Automated visual screenshot audits and DOM integrity checks across Mobile (375px/390px), Tablet (768px), and Desktop (1440px). |

---

### 2. Directory Structure Specification

```
unique-furniture-rohtak/
├── index.html                 # Digital Showroom Homepage & Discovery
├── shop.html                  # Full Catalogue & Multi-facet Filter System
├── product.html               # Deep-dive PDP with Variant Engine & Schematics
├── custom-furniture.html      # Bespoke Furniture Studio & Custom Quote Builder
├── cart.html                  # Dedicated Cart & Order Calculation
├── checkout.html              # 4-Step Frictionless Checkout System
├── order-success.html         # Rich Confirmation & Showroom Concierge
├── wishlist.html              # Persistent Saved Items Page
├── compare.html               # Product Comparison Matrix
├── store.html                 # Delhi Road Showroom Experience & Map
├── reviews.html               # Dedicated Rohtak Verified Customer Reviews Hub
├── admin/
│   └── index.html             # Enterprise Administration Dashboard
├── styles/
│   ├── tokens.css             # Architectural Luxury Tokens & Typography
│   ├── main.css               # Storefront Styling & Layout Grid
│   └── admin.css              # Protected Admin Theme & Analytics UI
├── js/
│   ├── store.js               # Reactive State Container & LocalStorage Sync
│   ├── commerce-adapter.js    # Shopify / Headless API abstraction
│   ├── app.js                 # Storefront UI Controllers, Navigation, Modals
│   ├── shop.js                # Faceted Filtering, Sort & Search Engine
│   ├── product.js             # Variant Swatches, Gallery, Dimension Schematics
│   ├── custom-quote.js        # Multi-step Bespoke Consultation Logic
│   ├── checkout.js            # Validation, Step Progression & Order Processing
│   ├── visualizer.js          # Interactive 3D/Spatial Dimension Helper
│   └── admin.js               # Admin CRUD, Inventory, CRM, CMS Controllers
├── data/
│   ├── products.json          # Master Furniture Catalogue Seed
│   ├── categories.json        # Configurable Taxonomies & Collections
│   ├── reviews.json           # Authentic Rohtak Verified Customer Reviews
│   └── cms-content.json       # Homepage CMS Editable Content Seed
└── docs/
    ├── PRD.md                 # Product Requirements Document
    ├── TRD.md                 # Technical Requirements Document
    ├── ARCHITECTURE.md        # System & Router Architecture
    ├── DATA-MODEL.md          # Entity Relationships & Data Schemas
    ├── DESIGN-DIRECTION.md    # Art Direction & Anti-Slop Guidelines
    ├── COMPONENT-REGISTRY.md  # Curated UI Blocks & Interaction Registry
    ├── RESEARCH.md            # Business & Competitor Research Audit
    ├── QA-REPORT.md           # Multi-viewport Playwright Test Results
    └── FINAL-AUDIT.md         # Final Acceptance Criteria Checklist
```

---

### 3. State Management & Data Flow Architecture

The `CommerceStore` is a single-source-of-truth reactive engine with synchronous broadcast:
1. **Initial Hydration**:
   - Fetches base seed data (`products.json`, `reviews.json`, `categories.json`, `cms-content.json`).
   - Checks `localStorage` for any admin mutations, cart additions, or user quote submissions. If present, overlays user delta onto base data.
2. **Event Dispatching**:
   - Standard events: `cart:updated`, `wishlist:updated`, `compare:updated`, `product:updated`, `order:placed`, `quote:submitted`, `cms:updated`.
   - Any UI component can subscribe via `store.subscribe(event, callback)`.
3. **Cart & Pricing Engine**:
   - Currency: Indian Rupee (`₹` / INR).
   - Line Item calculation: `(base_price + variant_delta) * quantity`.
   - Free delivery applied for orders over ₹20,000 (standard furniture threshold).
   - Tax: 18% GST calculation clearly itemized for business invoicing.
   - Coupon Validation: Active coupons (`UNIQUE10` for 10% first-order discount).

---

### 4. Admin Security & Authentication Model
- Protected route gate on `/admin/`.
- Session token stored in browser session storage (`unique_admin_session`).
- Pre-configured secure credential authentication with clean password validation.
- Sanitized input validation on all CRUD forms to prevent HTML injection.

---

### 5. SEO & Structured Data Implementation
- Dynamic Open Graph tags (`og:title`, `og:image`, `og:description`, `og:url`).
- Google Local Business Schema:
```json
{
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  "name": "Unique Furniture Rohtak",
  "image": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
  "telephone": "+918685813057",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Delhi Road, Tilak Nagar, Sector 3(P)",
    "addressLocality": "Rohtak",
    "addressRegion": "Haryana",
    "postalCode": "124001",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 28.8955,
    "longitude": 76.6066
  },
  "priceRange": "₹₹ - ₹₹₹₹"
}
```
