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

export async function fetchBeds24Properties(): Promise<Property[]> {
  const token = await getAccessToken();
  
  if (!token) {
    return [];
  }

  try {
    const propertiesResponse = await fetch(`${BEDS24_API_URL}/properties`, {
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

    const roomsResponse = await fetch(`${BEDS24_API_URL}/inventory/rooms`, {
      headers: {
        "accept": "application/json",
        "token": token,
      },
    });

    if (!roomsResponse.ok) {
      console.error("Failed to fetch BEDS24 rooms:", await roomsResponse.text());
      return [];
    }

    const rooms: Beds24Room[] = await roomsResponse.json();

    const mappedProperties: Property[] = rooms.map((room) => {
      const property = properties.find((p) => p.id === room.propertyId);
      
      return {
        id: room.id,
        name: room.name || "Ukjent eiendom",
        description: room.description || property?.description || "Ingen beskrivelse tilgjengelig.",
        location: property?.address?.city || "Norge",
        beds: room.numBedrooms || 2,
        bathrooms: room.numBathrooms || 1,
        maxGuests: room.maxGuests || 4,
        pricePerNight: 2000,
        images: room.photos && room.photos.length > 0 
          ? room.photos 
          : ["/stock_images/luxury_vacation_cabi_fd229fff.jpg"],
        amenities: ["WiFi", "Smart Lås", "Rengjøring"],
        available: true,
      };
    });

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
  const token = await getAccessToken();
  
  if (!token) {
    return { success: false, error: "API not configured" };
  }

  try {
    const response = await fetch(`${BEDS24_API_URL}/bookings`, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
        "token": token,
      },
      body: JSON.stringify({
        roomId: booking.roomId,
        arrival: booking.checkIn,
        departure: booking.checkOut,
        numAdult: booking.numAdults,
        firstName: booking.firstName,
        lastName: booking.lastName,
        email: booking.email,
        mobile: booking.phone,
        notes: booking.notes,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to create BEDS24 booking:", errorText);
      return { success: false, error: errorText };
    }

    const result = await response.json();
    return { success: true, bookingId: result.id };
  } catch (error) {
    console.error("Error creating BEDS24 booking:", error);
    return { success: false, error: String(error) };
  }
}

export function isBeds24Configured(): boolean {
  return !!process.env.BEDS24_REFRESH_TOKEN;
}
