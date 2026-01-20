# Design Guidelines - Smart Hjem AS (2026 Update)

## Design Approach
**Reference-Based:** Airbnb + Norgesbooking fusion with 2026 premium Scandinavian aesthetic. Glassmorphism-driven interface featuring floating cards, backdrop blur effects, and gradient overlays. Dark mode primary with sophisticated ambient lighting.

## Typography
- **Primary Font:** Inter (Google Fonts) - weights 400-700
- **Hero/Display:** text-5xl to text-7xl, weight 700, tight leading
- **Section Headings:** text-3xl to text-4xl, weight 600
- **Body:** text-base to text-lg, weight 400
- **Accents:** weight 500-600 for emphasis

## Layout System
**Spacing Units:** Tailwind 6, 8, 12, 16, 24, 32
- Sections: py-24 to py-32 (desktop), py-16 (mobile)
- Generous gaps: gap-8 to gap-12
- Container: max-w-7xl, px-6/8

## Page Structure

### Main Landing Page (7 sections)

**Hero Section (90vh)**
- Full-width premium Norwegian property image (modern architecture, dramatic lighting)
- Glassmorphic overlay card (backdrop-blur-xl, semi-transparent)
- Large display text: "Fremtidens Eiendomsløsninger"
- Subheading: Premium property services tagline
- Dual CTAs with blurred backgrounds
- Floating trust badges: client count, years in business

**Services Grid (3-column on desktop, stacked mobile)**
- Four service cards: Property Consulting, Office Rentals, Electrical Installations, Maintenance
- Each card: floating design with glassmorphic border, icon, title, 2-3 line description
- Subtle gradient accents on hover
- "Utforsk Tjeneste" link per card

**Featured Properties/Offices Showcase**
- 2-column asymmetric layout alternating image-left/text-right
- Large property images (aspect-ratio 16:9)
- Overlaid metadata cards with backdrop blur
- Property specs in icon grid format

**Why Choose Smart Hjem (Visual Timeline)**
- Horizontal scroll/grid showing 4-5 key differentiators
- Icon-led cards with bold numbers (01, 02, etc.)
- Short punchy value propositions
- Supporting imagery or illustrations

**Client Testimonials**
- 3-column card grid (2-column tablet, 1-column mobile)
- Customer photos, company logos, star ratings
- Quote cards with glassmorphic treatment
- "Verified Partner" badges

**Technology & Innovation Section**
- Split layout: Visual (smart home tech imagery) + Content
- Feature list with checkmark icons
- Integration badges (if applicable)
- "Future-Ready Solutions" messaging

**Contact & CTA Footer Section**
- Two-column split: Contact form (glassmorphic card) + Office info/map
- Form fields with floating labels
- Office hours, response guarantee
- Social links, trust certifications

### Services Detail Page (template for each service)

**Service Hero**
- Large image relevant to service (80vh)
- Overlaid title and description in glassmorphic container
- Breadcrumb navigation

**Service Benefits Grid**
- 3-4 column feature highlights
- Icon-driven cards with gradient accents

**Process/How It Works**
- Step-by-step cards with connecting visual flow
- Timeline-style layout with numbers

**Pricing Tiers (if applicable)**
- Side-by-side comparison cards
- Feature checkmark lists
- Prominent CTA buttons

**Case Studies/Portfolio**
- Grid of completed projects with before/after imagery
- Lightbox gallery functionality

**CTA Section**
- Full-width gradient background
- Centered call-to-action with form or contact button

## Component Library

**Navigation**
- Glassmorphic header with backdrop-blur
- Logo left, menu items center-right
- Sticky with subtle shadow on scroll
- Hamburger menu mobile with slide-in drawer

**Cards**
- Glassmorphic treatment: backdrop-blur-md, border with gradient
- Rounded-3xl corners
- Floating effect with subtle shadow
- Smooth transform on hover (scale-105 or lift)

**Buttons**
- Primary: Solid with gradient accent, rounded-full
- Secondary: Glassmorphic with border
- On images: backdrop-blur-lg with semi-transparent background
- Large touch targets (min-h-14)

**Forms**
- Glassmorphic input fields with subtle borders
- Floating labels
- Clear error/success states
- Grouped sections with dividers

**Modals**
- Centered with max-w-3xl
- Glassmorphic backdrop
- Slide-up animation
- Close button with backdrop-blur

## Images

**Hero:** Striking Norwegian property - modern architectural design with large windows, dramatic sunset/golden hour lighting, or premium office interior with city views. Ultra-high resolution, aspirational quality.

**Service Images:** Professional photos of technicians, consultants, modern office spaces, smart home technology installations. Clean, well-lit, professional.

**Property Showcase:** Mix of commercial and residential properties - contemporary Nordic architecture, interiors with natural light, outdoor spaces.

**Icons:** Heroicons throughout for UI consistency.

**Ambient Graphics:** Subtle gradient mesh backgrounds, abstract shapes for visual interest without distraction.

## Key Principles
- **Glassmorphism First:** Floating cards, backdrop blur, translucent layers create depth
- **Bold Typography:** Large display text creates immediate impact
- **Generous Whitespace:** py-24+ sections, breathing room between elements
- **Subtle Animation:** Hover lifts, smooth transitions - never distracting
- **Dark Mode Native:** Deep backgrounds with light text, gradient accents
- **Premium Feel:** High-quality imagery, sophisticated layouts, attention to micro-details
- **Mobile Optimization:** Touch-friendly, readable text, stackable cards
- **Accessibility:** Maintain contrast ratios in dark mode, clear focus states, semantic structure