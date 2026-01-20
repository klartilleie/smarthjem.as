import type { Property } from "@shared/schema";

const BEDS24_API_URL = "https://beds24.com/api/v2";

interface Beds24TokenResponse {
  token: string;
  expiresIn: number;
  refreshToken: string;
}

interface Beds24Property {
  id: string;
  name: string;
  description?: string;
  address?: {
    city?: string;
    country?: string;
  };
}

interface Beds24Room {
  id: string;
  propertyId: string;
  name: string;
  description?: string;
  maxGuests?: number;
  numBedrooms?: number;
  numBathrooms?: number;
  photos?: string[];
}

interface Beds24RoomOffer {
  roomId: string;
  price: number;
  available: boolean;
}

let accessToken: string | null = null;
let tokenExpiry: Date | null = null;
let bookingAccessToken: string | null = null;
let bookingTokenExpiry: Date | null = null;

// Convert invite code to refresh token and access token
async function exchangeInviteCode(inviteCode: string): Promise<{ token: string; refreshToken: string } | null> {
  try {
    const response = await fetch(`${BEDS24_API_URL}/authentication/setup`, {
      method: "GET",
      headers: {
        "accept": "application/json",
        "code": inviteCode,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to exchange invite code:", errorText);
      return null;
    }

    const data: Beds24TokenResponse = await response.json();
    return { token: data.token, refreshToken: data.refreshToken };
  } catch (error) {
    console.error("Error exchanging invite code:", error);
    return null;
  }
}

async function getAccessToken(): Promise<string | null> {
  const refreshToken = process.env.BEDS24_REFRESH_TOKEN;
  
  if (!refreshToken) {
    console.log("BEDS24_REFRESH_TOKEN not configured");
    return null;
  }

  if (accessToken && tokenExpiry && new Date() < tokenExpiry) {
    return accessToken;
  }

  try {
    // Check if this looks like an invite code (very long base64) vs refresh token
    const isInviteCode = refreshToken.length > 150;
    
    if (isInviteCode) {
      // Try to exchange invite code first
      console.log("Attempting to exchange invite code for tokens...");
      const result = await exchangeInviteCode(refreshToken);
      if (result) {
        accessToken = result.token;
        tokenExpiry = new Date(Date.now() + 82800 * 1000); // 23 hours
        console.log("Successfully exchanged invite code!");
        return accessToken;
      }
    }
    
    // Standard refresh token flow
    const response = await fetch(`${BEDS24_API_URL}/authentication/token`, {
      method: "GET",
      headers: {
        "accept": "application/json",
        "refreshToken": refreshToken,
      },
    });

    if (!response.ok) {
      console.error("Failed to get BEDS24 access token:", await response.text());
      return null;
    }

    const data: Beds24TokenResponse = await response.json();
    accessToken = data.token;
    tokenExpiry = new Date(Date.now() + (data.expiresIn - 300) * 1000);
    return accessToken;
  } catch (error) {
    console.error("Error getting BEDS24 token:", error);
    return null;
  }
}

// Separate token getter for booking operations (write access)
async function getBookingAccessToken(): Promise<string | null> {
  const bookingRefreshToken = process.env.BEDS24_BOOKING_REFRESH_TOKEN;
  
  if (!bookingRefreshToken) {
    console.log("BEDS24_BOOKING_REFRESH_TOKEN not configured, using main token");
    return getAccessToken();
  }

  if (bookingAccessToken && bookingTokenExpiry && new Date() < bookingTokenExpiry) {
    return bookingAccessToken;
  }

  try {
    // Check if this looks like an invite code
    const isInviteCode = bookingRefreshToken.length > 150;
    
    if (isInviteCode) {
      console.log("Attempting to exchange booking invite code for tokens...");
      const result = await exchangeInviteCode(bookingRefreshToken);
      if (result) {
        bookingAccessToken = result.token;
        bookingTokenExpiry = new Date(Date.now() + 82800 * 1000);
        console.log("Successfully exchanged booking invite code!");
        return bookingAccessToken;
      }
    }
    
    const response = await fetch(`${BEDS24_API_URL}/authentication/token`, {
      method: "GET",
      headers: {
        "accept": "application/json",
        "refreshToken": bookingRefreshToken,
      },
    });

    if (!response.ok) {
      console.error("Failed to get BEDS24 booking access token:", await response.text());
      return null;
    }

    const data: Beds24TokenResponse = await response.json();
    bookingAccessToken = data.token;
    bookingTokenExpiry = new Date(Date.now() + (data.expiresIn - 300) * 1000);
    return bookingAccessToken;
  } catch (error) {
    console.error("Error getting BEDS24 booking token:", error);
    return null;
  }
}

export async function fetchBeds24Properties(): Promise<Property[]> {
  const token = await getAccessToken();
  
  if (!token) {
    return [];
  }

  try {
    // Use the correct endpoint with includeAllRooms parameter
    const propertiesResponse = await fetch(`${BEDS24_API_URL}/properties?includeAllRooms=true`, {
      headers: {
        "accept": "application/json",
        "token": token,
      },
    });

    if (!propertiesResponse.ok) {
      console.error("Failed to fetch BEDS24 properties:", await propertiesResponse.text());
      return [];
    }

    const properties: Beds24Property[] = await propertiesResponse.json();
    console.log("BEDS24 properties fetched:", JSON.stringify(properties, null, 2));

    // Map properties directly since rooms are included
    const mappedProperties: Property[] = [];
    
    for (const property of properties) {
      // Each property has roomTypes array containing rooms
      const roomTypes = (property as any).roomTypes || [];
      
      if (roomTypes.length > 0) {
        for (const room of roomTypes) {
          mappedProperties.push({
            id: String(room.id || property.id),
            name: room.name || property.name || "Ukjent eiendom",
            description: room.description || property.description || "Ingen beskrivelse tilgjengelig.",
            location: property.address?.city || "Norge",
            beds: room.numBedrooms || 2,
            bathrooms: room.numBathrooms || 1,
            maxGuests: room.maxGuests || 4,
            pricePerNight: 0, // Dynamic pricing - shown as "Se priser" 
            images: room.photos && room.photos.length > 0 
              ? room.photos 
              : ["/stock_images/luxury_vacation_cabi_fd229fff.jpg"],
            amenities: ["WiFi", "Smart Lås", "Rengjøring"],
            available: true,
          });
        }
      } else {
        // Add property without rooms as single listing
        mappedProperties.push({
          id: String(property.id),
          name: property.name || "Ukjent eiendom",
          description: property.description || "Ingen beskrivelse tilgjengelig.",
          location: property.address?.city || "Norge",
          beds: 2,
          bathrooms: 1,
          maxGuests: 4,
          pricePerNight: 0,
          images: ["/stock_images/luxury_vacation_cabi_fd229fff.jpg"],
          amenities: ["WiFi", "Smart Lås", "Rengjøring"],
          available: true,
        });
      }
    }

    console.log(`BEDS24: Mapped ${mappedProperties.length} properties`);
    return mappedProperties;
  } catch (error) {
    console.error("Error fetching BEDS24 properties:", error);
    return [];
  }
}

export async function checkBeds24Availability(
  roomId: string,
  checkIn: string,
  checkOut: string,
  numGuests: number
): Promise<Beds24RoomOffer | null> {
  const token = await getAccessToken();
  
  if (!token) {
    return null;
  }

  try {
    const response = await fetch(
      `${BEDS24_API_URL}/inventory/rooms/offers?roomId=${roomId}&checkIn=${checkIn}&checkOut=${checkOut}&numAdults=${numGuests}`,
      {
        headers: {
          "accept": "application/json",
          "token": token,
        },
      }
    );

    if (!response.ok) {
      console.error("Failed to check BEDS24 availability:", await response.text());
      return null;
    }

    const offers: Beds24RoomOffer[] = await response.json();
    return offers.find((o) => o.roomId === roomId) || null;
  } catch (error) {
    console.error("Error checking BEDS24 availability:", error);
    return null;
  }
}

export async function createBeds24Booking(booking: {
  roomId: string;
  checkIn: string;
  checkOut: string;
  numAdults: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes?: string;
}): Promise<{ success: boolean; bookingId?: string; error?: string }> {
  const token = await getBookingAccessToken();
  
  if (!token) {
    return { success: false, error: "API not configured" };
  }

  try {
    // Beds24 API v2 booking format
    const bookingPayload = [{
      roomId: parseInt(booking.roomId, 10) || booking.roomId,
      arrival: booking.checkIn,
      departure: booking.checkOut,
      numAdult: booking.numAdults,
      firstName: booking.firstName,
      lastName: booking.lastName,
      email: booking.email,
      mobile: booking.phone,
      notes: booking.notes || "",
      status: "confirmed",
    }];

    console.log("Creating BEDS24 booking:", JSON.stringify(bookingPayload, null, 2));

    const response = await fetch(`${BEDS24_API_URL}/bookings`, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
        "token": token,
      },
      body: JSON.stringify(bookingPayload),
    });

    const responseText = await response.text();
    console.log("BEDS24 booking response:", response.status, responseText);

    if (!response.ok) {
      console.error("Failed to create BEDS24 booking:", responseText);
      return { success: false, error: responseText };
    }

    let result;
    try {
      result = JSON.parse(responseText);
    } catch {
      result = { id: "unknown" };
    }
    
    const bookingId = Array.isArray(result) && result.length > 0 ? result[0].id : result.id;
    console.log("BEDS24 booking created successfully, ID:", bookingId);
    return { success: true, bookingId: String(bookingId) };
  } catch (error) {
    console.error("Error creating BEDS24 booking:", error);
    return { success: false, error: String(error) };
  }
}

export function isBeds24Configured(): boolean {
  return !!process.env.BEDS24_REFRESH_TOKEN;
}
