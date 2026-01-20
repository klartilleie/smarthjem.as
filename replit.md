# Smart Hjem AS - Property Rental Management Platform

## Overview

Smart Hjem AS is a Norwegian property rental management platform that provides turnkey rental solutions for cabin and property owners. The platform handles everything from cleaning and booking management to keyless access and internet setup. Built as a full-stack TypeScript application with a React frontend and Express backend, it features property listings, booking requests, and contact form functionality with optional Beds24 channel manager integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack Query for server state, React Context for theme
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming (light/dark mode support)
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite with HMR support

The frontend follows a component-based architecture with pages (`Home`, `Booking`) composed of reusable sections (`Hero`, `Services`, `PropertyShowcase`, etc.). The design system is Airbnb-inspired with Nordic minimalism, using a golden/amber primary color palette.

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

- **Beds24 API**: Optional channel manager integration for syncing properties and creating bookings. Configured via `BEDS24_REFRESH_TOKEN` environment variable. Falls back to local sample data if not configured.

### Property Data

- All 16 properties are real vacation rentals managed by Smart Hjem AS
- Property data (names, locations, descriptions, amenities, images) sourced from Booking.com
- 3 properties marked as unavailable (404 on Booking.com): Flott hytte skjærgård Lindesnes, Flott hytte ved Bjellandsveien, Flott Ferieleilighet - Øyslebø
- 13 active properties with real photos and descriptions
- **Pricing**: Prices are dynamic and vary by season/dates on booking platforms. UI shows "Se priser" or "Kontakt for priser" instead of static prices
- Properties listed on multiple platforms: Booking.com, Airbnb, VRBO, Finn.no

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