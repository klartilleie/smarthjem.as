# Design Guidelines - Smart Hjem AS

## Design Approach
**Reference-Based:** Airbnb-inspired hospitality design with Nordic minimalism. Clean, trustworthy aesthetic that emphasizes property quality and seamless service delivery.

## Typography
- **Primary Font:** Inter (Google Fonts) - modern, professional
- **Headings:** 600-700 weight, sizes: text-4xl/5xl/6xl
- **Body:** 400 weight, text-base/lg
- **Accents:** 500 weight for CTAs and highlights

## Layout System
**Spacing Units:** Tailwind 4, 6, 8, 12, 16, 24 for consistent rhythm
- Sections: py-16 to py-24 (desktop), py-12 (mobile)
- Component spacing: gap-6 to gap-8
- Container: max-w-7xl with px-4/6

## Page Structure

### Main Landing Page (6-7 sections)

**Hero Section (100vh)**
- Full-width hero image showcasing premium Norwegian property
- Centered content overlay with blurred-background button container
- H1: "Nøkkelfri Utleie – Vi Tar Oss av Alt" 
- Subheading explaining turnkey concept
- Primary CTA: "Se Våre Eiendommer" + Secondary: "Hvordan Det Fungerer"
- Trust indicator: "200+ fornøyde utleiere"

**Services Overview (3-column grid on desktop)**
- Icon + title + description cards for: Rengjøring, Booking & Administrasjon, Teknisk Support
- Each card includes "Alt inkludert" badge
- Soft shadows, rounded-xl corners

**Property Showcase (Masonry/Grid Layout)**
- 2-3 column grid of featured properties
- Large property images with overlay info (location, beds, price)
- "Vis Alle" CTA leading to booking page

**How It Works (Timeline/Steps Section)**
- 4-step visual process: Registrering → Oppsett → Vi Håndterer Alt → Du Mottar Inntekt
- Icon-driven with connecting lines/flow

**Testimonials (2-column layout)**
- Customer photos with quotes
- Star ratings and property types
- "Verified lessor" badges

**Pricing/Package Comparison**
- Side-by-side cards showing service tiers
- Clear feature lists with checkmarks
- "Kontakt Oss" CTAs

**Contact/CTA Section**
- Split layout: Contact form (left) + Quick info/map (right)
- Office hours, response time guarantee
- Alternative contact methods (phone, email)

### Booking Page

**Search/Filter Bar (Sticky)**
- Date range picker
- Guest count selector
- Location filter
- "BEDS24 Powered" subtle badge

**Property Grid (Card-based)**
- 2-3 column responsive grid
- Each card: Large image, title, location, capacity, nightly rate
- Quick view overlay on hover
- "Book Now" primary action

**Property Detail Modal/Page**
- Image gallery (main + thumbnails)
- Full property details from BEDS24
- Amenities icons grid
- Calendar availability view
- Booking form integration
- Review section

## Component Library

**Navigation**
- Transparent header on hero, solid white on scroll
- Logo left, menu center/right
- Sticky behavior
- Mobile: Hamburger menu

**Cards**
- Rounded-2xl corners
- Subtle shadow (shadow-sm hover:shadow-lg transition)
- Image aspect ratio: 4:3 for properties

**Buttons**
- Primary: Solid with hover lift effect
- Secondary: Outline style
- On images: backdrop-blur-md bg-white/30 treatment
- Large touch targets (min h-12)

**Forms**
- Floating labels
- Clear validation states
- Grouped related fields
- Prominent submit buttons

**Modals/Overlays**
- Dark backdrop (bg-black/50)
- Centered, max-w-4xl
- Smooth slide-up animation
- Close button top-right

## Images

**Hero Image:** Stunning Norwegian cabin/property exterior at golden hour or interior with large windows showing nature views. Professional, aspirational quality.

**Property Images:** High-quality interior and exterior shots of various rental properties (modern cabins, apartments, houses). Bright, welcoming, clean aesthetic.

**Service Icons:** Use Heroicons for service indicators, amenities, and UI elements throughout.

**Lifestyle Images:** Families/couples enjoying properties, local Norwegian nature/activities for testimonial and "why choose us" sections.

## Key Principles
- **Trust & Transparency:** Clear pricing, verified reviews, professional imagery
- **Scandinavian Aesthetic:** Clean lines, ample whitespace, nature-inspired without being rustic
- **Mobile-First:** Booking flow optimized for mobile users
- **Performance:** Lazy-load property images, optimize for fast load times
- **Accessibility:** High contrast ratios, clear focus states, semantic HTML