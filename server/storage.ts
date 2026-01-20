import { type User, type InsertUser, type Property, type ContactForm, type BookingRequest } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getProperties(): Promise<Property[]>;
  getProperty(id: string): Promise<Property | undefined>;
  setProperties(properties: Property[]): Promise<void>;
  saveContactForm(form: ContactForm): Promise<void>;
  saveBookingRequest(booking: BookingRequest): Promise<void>;
}

// Real property from Smart Hjem AS portfolio
const realProperties: Property[] = [
  {
    id: "smolasen-tjorhom",
    name: "Flott hytte på Smølåsen Tjørhom",
    description: "Flott hytte på Smølåsen Tjørhom i Fidjeland med tre soverom og ett bad. Eiendommen inkluderer et fullt utstyrt kjøkken med kjøleskap, ovn, komfyr, kaffetrakter og vaskemaskin. Gjester kan nyte hage og terrasse med hageutsikt. Hytta har gratis WiFi, balkong og gratis privat parkering. Stavanger flyplass er 100 km unna. Perfekt for vintersport og naturopplevelser.",
    location: "Fidjeland",
    beds: 4,
    bathrooms: 1,
    maxGuests: 6,
    pricePerNight: 0,
    images: [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/613901486.jpg?k=2328dadd869a32aa286eb06af0fb982a8566c5d237111932ac12ed014ef91365&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max500/613901527.jpg?k=5f1b5279508bffb8776050991e836d1f6be8bb3255019a9d0d4c5de0cd6bc769&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max500/613901506.jpg?k=1113d67643b5fc7377636c4d6cb35fd22c7e1f83bc15c4c97aab757b19f6f16b&o=",
    ],
    amenities: ["WiFi", "Gratis Parkering", "Balkong", "Terrasse", "Hage", "Kjøkken", "TV", "Grill", "Vaskemaskin"],
    available: true,
  },
];

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private properties: Property[];
  private contactForms: ContactForm[];
  private bookingRequests: BookingRequest[];

  constructor() {
    this.users = new Map();
    this.properties = realProperties;
    this.contactForms = [];
    this.bookingRequests = [];
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProperties(): Promise<Property[]> {
    return this.properties;
  }

  async getProperty(id: string): Promise<Property | undefined> {
    return this.properties.find((p) => p.id === id);
  }

  async setProperties(properties: Property[]): Promise<void> {
    this.properties = properties;
  }

  async saveContactForm(form: ContactForm): Promise<void> {
    this.contactForms.push(form);
  }

  async saveBookingRequest(booking: BookingRequest): Promise<void> {
    this.bookingRequests.push(booking);
  }
}

export const storage = new MemStorage();
