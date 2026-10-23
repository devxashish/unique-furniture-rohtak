# Design Direction & Anti-Slop Guidelines
## Unique Furniture Rohtak — Premium Custom Ecommerce Platform

### 1. Visual Manifesto: Architectural Luxury & Tactile Warmth
The design must convey the poise of high-end architectural furniture studios (e.g. *B&B Italia, West Elm, CB2, WoodenStreet Heritage Line*). The interface sits back and lets rich furniture textures (warm honey Sheesham, dark walnut, textured bouclé, brushed brass, fluted glass) be the undisputed heroes.

---

### 2. The Hallmark Anti-Slop Enforcement Matrix

| Anti-Pattern to Eradicate | Replacement Mandate |
|---|---|
| **Generic Purple / Blue AI Gradients** | Rich tactile architectural palette: Warm Alabaster (`#FAF8F5`), Deep Teak Charcoal (`#1B1917`), Sandstone Muted (`#E7E2DB`), and Antique Brass (`#C5A059`). |
| **Italicized Display Headers** (`Built to <em>think</em>`) | Upright, authoritative Roman typography (`font-style: normal`). Emphasis carried strictly by font weight and brass accent. |
| **Fake Generic Testimonials** | Real verified buyer reviews specifically localized to Rohtak neighborhoods (Model Town, Tilak Nagar, Delhi Road, Sector 1-4, Omaxe City). |
| **Synthetic Re-drawn Browser/Phone Frames** | Real architectural photography framed with refined hairlines (`1px solid var(--border)`). |
| **Generic 3-Column Card Grids** | Dynamic editorial rhythm: Asymmetric bento grids, full-bleed hero stories, split-screen material breakdowns. |
| **Dead Buttons / Fake Links** | 100% interactive flows: Working filter state, responsive cart drawer, real variant toggles, interactive room visualizer, live checkout, and functioning admin CRUD. |

---

### 3. Typography Hierarchy

```css
/* Display Headlines */
font-family: 'Playfair Display', Georgia, serif;
font-weight: 500;
letter-spacing: -0.02em;

/* Body, Interface, Navigation & Badges */
font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
font-weight: 400, 500, 600, 700;
letter-spacing: -0.01em;
```

---

### 4. Color Tokens Palette (`styles/tokens.css`)

```css
:root {
  /* Surfaces */
  --bg-primary: #FAF8F5;          /* Warm Alabaster Showroom Ground */
  --bg-surface: #FFFFFF;          /* Pure White Card Surface */
  --bg-subtle: #F3EFEA;           /* Sandstone Section Fill */
  --bg-elevated: #FFFFFF;         /* Modal & Drawer Background */
  --bg-dark: #1A1715;             /* Deep Teak Charcoal */

  /* Text Hierarchy */
  --text-primary: #1C1917;        /* Warm Black */
  --text-secondary: #57534E;      /* Architectural Slate Muted */
  --text-tertiary: #8C827A;       /* Subtle Metadata */
  --text-inverse: #FAF8F5;        /* Light on Dark */

  /* Accents */
  --accent-gold: #B88E2F;         /* Warm Antique Brass */
  --accent-gold-hover: #9E7724;   /* Deepened Brass */
  --accent-wood: #78350F;         /* Rich Sheesham Amber */

  /* Borders & Contours */
  --border-subtle: #E7E2DB;       /* Delicate Separator */
  --border-medium: #D1C7BA;       /* Form Input & Card Outline */
  --border-focus: #B88E2F;        /* Interactive Focus State */

  /* Functional */
  --success: #15803D;             /* In-Stock Green */
  --error: #B91C1C;               /* Low Stock / Error */
  --shadow-sm: 0 1px 3px rgba(28, 25, 23, 0.04);
  --shadow-md: 0 4px 16px rgba(28, 25, 23, 0.06);
  --shadow-lg: 0 12px 32px rgba(28, 25, 23, 0.08);
}
```
