import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema, bookingRequestSchema } from "@shared/schema";
import { fetchBeds24Properties, createBeds24Booking, isBeds24Configured } from "./beds24";
import { Resend } from "resend";

const resend = process.env.Resend_API ? new Resend(process.env.Resend_API) : null;

async function sendBookingEmail(booking: {
  propertyId: string;
  propertyName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  specialRequests?: string;
}) {
  if (!resend) {
    console.log("Resend not configured, skipping email notification");
    return { success: false, error: "Resend not configured" };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Smart Hjem Booking <booking@smarthjem.as>",
      to: ["kundeservice@smarthjem.as"],
      replyTo: booking.email,
      subject: `Ny bookingforespørsel: ${booking.propertyName}`,
      html: `
        <h2>Ny bookingforespørsel</h2>
        <h3>Eiendom</h3>
        <p><strong>${booking.propertyName}</strong> (ID: ${booking.propertyId})</p>
        
        <h3>Gjesteinformasjon</h3>
        <ul>
          <li><strong>Navn:</strong> ${booking.firstName} ${booking.lastName}</li>
          <li><strong>E-post:</strong> ${booking.email}</li>
          <li><strong>Telefon:</strong> ${booking.phone}</li>
        </ul>
        
        <h3>Oppholdsdetaljer</h3>
        <ul>
          <li><strong>Innsjekk:</strong> ${booking.checkIn}</li>
          <li><strong>Utsjekk:</strong> ${booking.checkOut}</li>
          <li><strong>Antall gjester:</strong> ${booking.guests}</li>
        </ul>
        
        ${booking.specialRequests ? `
        <h3>Spesielle ønsker</h3>
        <p>${booking.specialRequests}</p>
        ` : ""}
        
        <hr>
        <p><em>Denne e-posten ble sendt automatisk fra Smart Hjem AS bookingsystem.</em></p>
      `,
    });

    if (error) {
      console.error("Resend email error:", error);
      return { success: false, error: error.message };
    }

    console.log("Booking email sent successfully:", data?.id);
    return { success: true, emailId: data?.id };
  } catch (error) {
    console.error("Failed to send booking email:", error);
    return { success: false, error: String(error) };
  }
}

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

      const property = await storage.getProperty(result.data.propertyId);
      const propertyName = property?.name || result.data.propertyId;
      const hasBeds24Link = property?.bookingUrl && property.bookingUrl.includes("beds24");

      if (hasBeds24Link && isBeds24Configured()) {
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
      } else {
        const emailResult = await sendBookingEmail({
          propertyId: result.data.propertyId,
          propertyName,
          firstName: result.data.firstName,
          lastName: result.data.lastName,
          email: result.data.email,
          phone: result.data.phone,
          checkIn: result.data.checkIn,
          checkOut: result.data.checkOut,
          guests: result.data.guests,
          specialRequests: result.data.specialRequests,
        });

        if (!emailResult.success) {
          console.warn("Email notification failed:", emailResult.error);
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
