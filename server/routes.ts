import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema, bookingRequestSchema } from "@shared/schema";
import { fetchBeds24Properties, createBeds24Booking, isBeds24Configured } from "./beds24";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get("/api/properties", async (req, res) => {
    try {
      // Always use the Booking.com fallback data which has images and descriptions
      // Beds24 API doesn't provide photos, so we rely on the curated Booking.com data
      const properties = await storage.getProperties();
      res.json(properties);
    } catch (error) {
      console.error("Error fetching properties:", error);
      res.status(500).json({ error: "Failed to fetch properties" });
    }
  });

  app.get("/api/properties/:id", async (req, res) => {
    try {
      const property = await storage.getProperty(req.params.id);
      if (!property) {
        return res.status(404).json({ error: "Property not found" });
      }
      res.json(property);
    } catch (error) {
      console.error("Error fetching property:", error);
      res.status(500).json({ error: "Failed to fetch property" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const result = contactFormSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: result.error.issues });
      }

      await storage.saveContactForm(result.data);
      
      console.log("Contact form received:", result.data);

      res.json({ success: true, message: "Message received" });
    } catch (error) {
      console.error("Error saving contact form:", error);
      res.status(500).json({ error: "Failed to save contact form" });
    }
  });

  app.post("/api/bookings", async (req, res) => {
    try {
      const result = bookingRequestSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: result.error.issues });
      }

      await storage.saveBookingRequest(result.data);

      if (isBeds24Configured()) {
        const beds24Result = await createBeds24Booking({
          roomId: result.data.propertyId,
          checkIn: result.data.checkIn,
          checkOut: result.data.checkOut,
          numAdults: result.data.guests,
          firstName: result.data.firstName,
          lastName: result.data.lastName,
          email: result.data.email,
          phone: result.data.phone,
          notes: result.data.specialRequests,
        });

        if (!beds24Result.success) {
          console.warn("BEDS24 booking failed:", beds24Result.error);
        }
      }

      console.log("Booking request received:", result.data);

      res.json({ 
        success: true, 
        message: "Booking request received",
        bookingId: `BK-${Date.now()}`
      });
    } catch (error) {
      console.error("Error processing booking:", error);
      res.status(500).json({ error: "Failed to process booking" });
    }
  });

  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok",
      beds24Configured: isBeds24Configured()
    });
  });

  return httpServer;
}
