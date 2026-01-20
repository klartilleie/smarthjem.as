import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const propertySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  location: z.string(),
  beds: z.number(),
  bathrooms: z.number(),
  maxGuests: z.number(),
  pricePerNight: z.number(),
  images: z.array(z.string()),
  amenities: z.array(z.string()),
  available: z.boolean(),
});

export type Property = z.infer<typeof propertySchema>;

export const bookingRequestSchema = z.object({
  propertyId: z.string(),
  checkIn: z.string(),
  checkOut: z.string(),
  guests: z.number().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(8),
  specialRequests: z.string().optional(),
});

export type BookingRequest = z.infer<typeof bookingRequestSchema>;

export const contactFormSchema = z.object({
  name: z.string().min(1, "Navn er påkrevd"),
  email: z.string().email("Ugyldig e-postadresse"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Emne er påkrevd"),
  message: z.string().min(10, "Meldingen må være minst 10 tegn"),
});

export type ContactForm = z.infer<typeof contactFormSchema>;

export const availabilitySchema = z.object({
  propertyId: z.string(),
  date: z.string(),
  available: z.boolean(),
  price: z.number().optional(),
});

export type Availability = z.infer<typeof availabilitySchema>;
