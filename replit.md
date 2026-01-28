# Smart Hjem AS - Property Rental Management Platform

## Overview

Smart Hjem AS is a Norwegian property rental management platform that provides turnkey rental solutions for cabin and property owners. The platform handles everything from cleaning and booking management to keyless access and internet setup. Built as a full-stack TypeScript application with a React frontend and Express backend, it features property listings, booking requests, and contact form functionality with optional Beds24 channel manager integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack Query for server state, React Context for theme and language
- **Internationalization**: Multi-language support (Norwegian, English, German) via LanguageContext
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming (light/dark mode support)
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite with HMR support

The frontend follows a component-based architecture with pages (`Home`, `Booking`) composed of reusable sections (`Hero`, `Services`, `PropertyShowcase`, etc.). The design system is Airbnb-inspired with Nordic minimalism, using a golden/amber primary color palette.

### Internationalization (i18n)

- **Languages Supported**: Norwegian (no), English (en), German (de)
- **Translation System**: Custom context-based approach using `LanguageContext`
- **Key Files**:
  - `client/src/lib/translations.ts` - All translation strings
  - `client/src/contexts/LanguageContext.tsx` - Language state management
  - `client/src/components/LanguageSelector.tsx` - Language dropdown in header
- **Persistence**: Language preference stored in localStorage
- **Components Translated**: Hero, Services, Contact, Footer, Header, Booking page

### Backend Architecture

- **Framework**: Express 5 on Node.js
- **Language**: TypeScript with ES modules
- **API Design**: RESTful JSON APIs under `/api/*` prefix
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Validation**: Zod schemas shared between frontend and backend via `@shared/*` path alias

Key API endpoints:
- `GET /api/properties` - Fetch property listings
- `GET /api/properties/:id` - Fetch single property
- `POST /api/contact` - Submit contact form
- `POST /api/bookings` - Submit booking request

Admin API endpoints (require authentication):
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/session` - Check admin session
- `POST /api/admin/properties` - Add new property
- `PUT /api/admin/properties/:id` - Update property
- `DELETE /api/admin/properties/:id` - Delete property

### Admin System

- **Access**: Admin link in footer → /admin/login → /admin dashboard
- **Credentials**: Configurable via ADMIN_EMAIL and ADMIN_PASSWORD environment variables (defaults: Kundeservice@smarthjem.as / Admin2026)
- **Session**: Express-session with httpOnly cookies, SameSite=lax, 24-hour expiry
- **Features**: Property CRUD operations (add, edit, delete properties)
- **Key Files**:
  - `client/src/pages/AdminLogin.tsx` - Login page
  - `client/src/pages/Admin.tsx` - Dashboard with property management

### Data Storage

- **Database**: PostgreSQL (configured via `DATABASE_URL` environment variable)
- **ORM**: Drizzle ORM with schema defined in `shared/schema.ts`
- **Migrations**: Drizzle Kit for schema migrations (`drizzle-kit push`)
- **Fallback**: In-memory storage with sample property data when database unavailable

Current schema includes:
- Users table (id, username, password)
- Properties, bookings, and contacts handled via Zod schemas (storage layer abstraction)

### Build System

- **Development**: Vite dev server with Express middleware integration
- **Production Build**: 
  - Frontend: Vite builds to `dist/public`
  - Backend: esbuild bundles server to `dist/index.cjs`
  - Selective dependency bundling for optimized cold starts

## External Dependencies

### Third-Party Integrations

- **Beds24 API V2**: Channel manager integration for syncing properties and creating bookings
  - Configured via `BEDS24_REFRESH_TOKEN` environment variable (permanent token, does not expire)
  - Token was exchanged from invite code using `/v2/authentication/setup` endpoint
  - Falls back to local sample data with Booking.com photos if API unavailable
  - Supports: Property listings, room data, feature codes, availability checking

### Property Data

- 73 vacation rental properties managed by Smart Hjem AS:
  - 12 Beds24-integrated properties with Booking.com images (Southern Norway)
  - 28 norges-ferie.no properties with external URL references (Southern Norway)
  - 19 holidaysinspain4u.com properties (Costa Blanca, Spain)
  - 14 furrehytter.no cabins (Sjernarøy island near Stavanger)
- Property data includes: names, locations (city), beds/bathrooms counts, amenities
- Properties with `externalUrl` link to original listings
- **Pricing**: Norwegian properties show "Kontakt for priser", Spain properties have per-night rates
- Properties listed on multiple platforms: Booking.com, Airbnb, VRBO, Finn.no, norges-ferie.no, holidaysinspain4u.com, furrehytter.no

### Email Notifications (Resend)

- **Provider**: Resend (configured via `Resend_API` secret)
- **From**: booking@smarthjem.as
- **To**: kundeservice@smarthjem.as
- **Trigger**: Booking requests for properties without Beds24 integration
- Properties with Beds24 links use Beds24 API for booking creation
- All other properties send email notification to customer service

### Key NPM Packages

- **UI**: Radix UI primitives, Lucide icons, Embla Carousel
- **Data**: TanStack Query, Drizzle ORM, Zod
- **Forms**: React Hook Form with `@hookform/resolvers`
- **Utilities**: date-fns, clsx, tailwind-merge

### Environment Variables

- `DATABASE_URL` - PostgreSQL connection string (required for database features)
- `BEDS24_REFRESH_TOKEN` - Optional Beds24 API authentication

### Asset Management

- Static images served from `/stock_images/` in public assets
- Company logo imported from `@assets/` path alias
- Google Fonts (Inter, DM Sans, Geist Mono) loaded via CDN