# Product Requirements Document (PRD)
## Unique Furniture Rohtak — Premium Custom Ecommerce + Admin Platform

### 1. Executive Summary & Brand Identity
- **Business**: Unique Furniture Rohtak
- **Category**: Premium Furniture Manufacturer, Retail Showroom & Bespoke Interior Contractor
- **Physical Address**: Delhi Road, Tilak Nagar, Sector 3(P), Rohtak, Haryana 124001, India
- **Direct Phone & WhatsApp**: +91 86858 13057
- **Business Positioning**: High-end architectural furniture design studio combining a physical brick-and-mortar showroom experience with a digital commerce engine. Offers ready-to-ship luxury furniture sets alongside custom made-to-measure furniture crafted from seasoned Sheesham, Burmese Teak, engineered hardwoods, and performance upholstery.
- **Service Footprint**: White-glove direct delivery and installation across Rohtak, Bahadurgarh, Sonipat, Panipat, Hisar, Jhajjar, and Delhi NCR.

---

### 2. User Personas & Mental Models
1. **The Rohtak New Homeowner (Age 28–45)**:
   - Moving into new residences in Omaxe City, Model Town, or Sector 1–4.
   - Values solid wood longevity, modern Scandinavian/contemporary aesthetics, and hassle-free room packages.
   - Needs dimension assurance and local post-purchase service warranty.
2. **The Wedding Furniture Buyer (Family Matriarchs & Couples)**:
   - High-ticket package buyer seeking matching bedroom, living room, and dining sets.
   - Values customization of wood stains, headboard fabrics, and durable storage (hydraulic beds).
3. **The Healthcare & Corporate Professional**:
   - Doctors, lawyers, and business founders in Rohtak requiring ergonomic executive chairs, conference tables, and reception lounge sets.
4. **The Custom Bespoke Client**:
   - Has Pinterest/Instagram reference images and specific room dimensions.
   - Seeks rapid consultation via WhatsApp with material samples and straightforward pricing.

---

### 3. Core Feature Specifications

#### 3.1 Digital Showroom & Discovery
- **Cinematic Editorial Hero**: High-impact architectural photography, dynamic headline ("Furniture Designed Around Your Space"), and dual primary CTAs ("Explore Collection" & "Customize Furniture").
- **Material Architecture Narrative**: Visual breakdown of genuine solid woods (Sheesham, Teak), Bouclé & Velvet fabrics, Matte powder-coated metals, and fluted glass.
- **Curated Category Taxonomy**:
  - Living Room (Sofas, Sectionals, Coffee Tables, Accent Chairs, TV Consoles)
  - Bedroom (King/Queen Storage Beds, Wardrobes, Nightstands, Dressers)
  - Dining (6 & 8-Seater Solid Wood Dining Tables, Upholstered Chairs, Buffets)
  - Work & Study (Ergonomic Executive Desks, Bookshelves, Study Tables)
  - Mattresses & Comfort (Orthopedic Pocket Spring, Natural Latex)
  - Outdoor & Balcony (Weatherproof Rattan Loungers, Bistro Sets)
  - Bespoke Modular Kitchens (Hydraulic Pull-outs, Quartz & Acrylic Finishes)

#### 3.2 High-Performance Shop & Filtering
- Instant multi-facet filter bar: Category, Room, Material, Price Range, In-Stock status, and Customizability.
- High-res product cards with image hover preview, wood/fabric chip selectors, quick-view modal, wishlist toggle, and direct add-to-cart.

#### 3.3 Product Detail Page (PDP) Experience
- Multi-angle gallery with zoom lens and fullscreen viewer.
- Real-time variant configurator (Teak Natural, Walnut Dark, Honey Oak; Bouclé Cream, Charcoal Slate, Olive Velvet).
- Furniture Specification Schema: Exact Dimensions (W × D × H), Seating Height, Weight, Solid Wood Grade, Assembly details, and 10-Year Structural Warranty badge.
- Haryana & Delhi NCR Pincode delivery estimator with free assembly guarantee.
- WhatsApp Direct Consultation: One-click link with prefilled product SKU, title, and current URL to `+91 86858 13057`.

#### 3.4 Custom Furniture Studio & Quote Engine (`/custom-furniture`)
- 5-Step Bespoke Consultation Form:
  1. Room & Furniture Category Selection
  2. Approximate Room Dimensions (L × W × H in ft or inches)
  3. Preferred Core Material & Upholstery Texture
  4. Budget Tier selection
  5. Reference photo upload (drag-and-drop) & Custom requirements description
- Real-time submission routing directly to the Admin Dashboard Quote CRM with automated WhatsApp confirmation link.

#### 3.5 Real Rohtak Customer Reviews System (`/reviews` & Homepage)
- User explicitly requested: *"inke sare reviws bhi web me add kr dena"*.
- Verified local reviews from real Rohtak localities (Model Town, Tilak Nagar, Delhi Road, Sector 2/3/14, Omaxe City).
- Filter reviews by furniture category, view verified customer tags, ratings, and room installation photos.

#### 3.6 Full Commerce Funnel
- Slide-over mini cart & dedicated `/cart` page with line item customizations, promo coupon engine (`UNIQUE10`), and tax transparency.
- 4-Step conversion-optimized Checkout (`/checkout`): Contact -> Shipping Details -> Delivery Preference -> Payment Abstraction (UPI, Card, Net Banking, COD / Showroom Deposit).
- Order Success Page (`/order-success`) with printable invoice, order tracking ID, and direct showroom concierge contact.

#### 3.7 Showroom & Local Experience (`/store`)
- Delhi Road Showroom landing page with interactive map integration, operating hours (Mon-Sun 10:00 AM - 8:30 PM), phone dialer, parking guide, and directions button.

---

### 4. Admin Management Platform (`/admin`)
- **Protected Overview**: Real-time sales metrics, order volume, low stock alerts, pending quote requests, and recent customer activity.
- **Product Catalog Management**: Full CRUD capability (Add, Edit, Delete, Update Stock, Set Compare Prices, Upload Image URLs, Configure Variants).
- **Inventory Matrix**: Variant-level stock monitoring and low-stock indicators.
- **Order Pipeline**: Order review with status transitions (Pending -> Confirmed -> Processing -> Ready -> Shipped -> Delivered).
- **Custom Quote CRM**: Centralized inbound quote requests with customer contact, requested dimensions, budget, reference photos, and internal status tracking (New, Contacted, Quoted, Approved, In Production).
- **Customer Directory**: Customer profiles, purchase histories, and contact records.
- **Homepage CMS Editor**: Visual management of hero text, promotional banners, featured product picks, and store hours without code edits.

---

### 5. Non-Functional Requirements
- **Responsive Purity**: Zero horizontal scroll across 320px to 1920px viewports.
- **Accessibility**: Semantic HTML5, WCAG 2.1 AA contrast compliance, ARIA attributes for modals and drawers.
- **Performance Budget**: Under 1.5s initial visual load, lazy-loaded responsive imagery, GPU-accelerated micro-interactions.
- **SEO Optimization**: Clean URLs, Open Graph tags, Product JSON-LD structured data, and local business schema for Rohtak, Haryana.
