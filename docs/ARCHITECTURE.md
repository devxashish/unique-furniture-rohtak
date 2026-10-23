# System Architecture Specification
## Unique Furniture Rohtak — Premium Custom Ecommerce + Admin Platform

### 1. Architectural Principles
1. **Separation of Concerns**: UI presentation, Commerce state management, and Headless backend adapters operate in decoupled layers.
2. **Deterministic State Synchronization**: All shopping cart, wishlist, product comparisons, orders, custom quote requests, and CMS customizations sync deterministically with persistent browser storage.
3. **Graceful Fallbacks & Offline Resilience**: Product catalogues and image assets load progressively with blur/solid skeleton states and native error handling.
4. **Adapter-Driven Headless Flexibility**: The platform can run standalone locally or bind directly to Shopify Storefront API / GraphQL endpoints with zero template rewriting.

---

### 2. Layered Component Architecture

```
+-------------------------------------------------------------------------+
|                              PRESENTATION LAYER                         |
|  - Digital Showroom (index.html)     - Product Deep-Dive (product.html) |
|  - Shop & Filter Hub (shop.html)     - Custom Furniture Studio (custom) |
|  - Bag & Checkout (cart, checkout)   - Real Verified Reviews (reviews)  |
|  - Showroom Locator (store.html)     - Admin Operations Hub (/admin)    |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                           UI CONTROLLERS & SERVICES                     |
|  - app.js (Global Navigation, Mini-Cart Drawer, Modal Engine, Search)  |
|  - shop.js (Faceted Multi-Filter, Quick View, Dynamic Pagination)       |
|  - product.js (Gallery Zoom, Variant Swatches, Schematic Accordion)     |
|  - custom-quote.js (Step Wizard, Dimension Calculator, Photo Uploader)  |
|  - checkout.js (Multi-Step Form, Address Verification, Order Generator) |
|  - visualizer.js (3D Spatial Placement & Room Scale Dimension Helper)   |
|  - admin.js (Product CRUD, Inventory Matrix, Order CRM, Quote Pipeline) |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                        COMMERCE STATE CONTAINER                         |
|                     (js/store.js - Single Source of Truth)              |
|  - State: Products, Cart, Wishlist, Compare, Orders, Quotes, CMS Config |
|  - Subscriptions: Pub/Sub Event Hub ('cart:updated', 'quote:new', etc.) |
|  - Persistence: LocalStorage Hydration + Mutation Synchronizer          |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                       COMMERCE ADAPTER INTERFACE                        |
|                        (js/commerce-adapter.js)                         |
|  [ Local Mock Engine ]   <--->   [ Shopify API ]   <--->   [ Supabase ] |
+-------------------------------------------------------------------------+
```

---

### 3. URL Routing Strategy
The system uses clean, human-readable routes with direct hash and query param support:
- `/index.html` -> Digital Showroom Homepage
- `/shop.html` -> Full catalogue (Supports `?category=living-room&material=sheesham`)
- `/shop.html?search=sofa` -> Instant live search results
- `/product.html?slug=royal-sheesham-hydraulic-bed` -> Unique product detail page
- `/custom-furniture.html` -> Bespoke made-to-measure furniture consultation
- `/cart.html` -> Shopping bag review
- `/checkout.html` -> Secure 4-step order checkout
- `/order-success.html?orderId=UF-8921` -> Live order confirmation & tracking
- `/wishlist.html` -> Saved wishlist items
- `/compare.html` -> Technical comparison grid
- `/store.html` -> Delhi Road, Rohtak physical showroom locator & directions
- `/reviews.html` -> Verified Rohtak buyer testimonials hub
- `/admin/index.html` -> Secure enterprise administration portal
