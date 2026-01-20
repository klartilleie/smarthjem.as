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

const sampleProperties: Property[] = [
  {
    id: "prop-1",
    name: "Fjellhytte Deluxe",
    description: "En spektakulær fjellhytte med panoramautsikt over de norske fjellene. Moderne fasiliteter kombinert med tradisjonell norsk arkitektur. Perfekt for familier som ønsker ro og naturopplevelser. Hytta har stor stue med peis, fullt utstyrt kjøkken og terrasse med grill.",
    location: "Hemsedal",
    beds: 6,
    bathrooms: 2,
    maxGuests: 10,
    pricePerNight: 3500,
    images: [
      "/stock_images/luxury_vacation_cabi_fd229fff.jpg",
      "/stock_images/modern_norwegian_cab_f192c4c2.jpg",
      "/stock_images/modern_norwegian_cab_9cd3e605.jpg",
    ],
    amenities: ["WiFi", "Smart Lås", "Rengjøring", "Parkering", "Badstue", "Peis", "Ski-in/Ski-out"],
    available: true,
  },
  {
    id: "prop-2",
    name: "Sjøhytta Premium",
    description: "Luksushytte ved sjøkanten med egen brygge og fantastisk utsikt. Moderne interiør med store vinduer som gir deg følelsen av å være ett med naturen. Inkluderer robåt og fiskeutstyr. Perfekt for de som elsker hav og sjøliv.",
    location: "Kristiansand",
    beds: 4,
    bathrooms: 2,
    maxGuests: 8,
    pricePerNight: 2800,
    images: [
      "/stock_images/luxury_vacation_cabi_824e5b19.jpg",
      "/stock_images/modern_norwegian_cab_9cd3e605.jpg",
    ],
    amenities: ["WiFi", "Smart Lås", "Rengjøring", "Brygge", "Robåt", "Terrasse", "Havutsikt"],
    available: true,
  },
  {
    id: "prop-3",
    name: "Skogstua Luksus",
    description: "Koselig skogshytte omgitt av vakker natur. Idyllisk beliggenhet med turløyper rett utenfor døra. Moderne komfort i tradisjonell ramme. Hytta har hot tub på terrassen og er perfekt for romantiske weekender eller familieopphold.",
    location: "Trysil",
    beds: 5,
    bathrooms: 2,
    maxGuests: 10,
    pricePerNight: 3200,
    images: [
      "/stock_images/luxury_vacation_cabi_906cf2af.jpg",
      "/stock_images/modern_norwegian_cab_f192c4c2.jpg",
    ],
    amenities: ["WiFi", "Smart Lås", "Rengjøring", "Hot Tub", "Ski-oppbevaring", "Peis", "Parkering"],
    available: true,
  },
  {
    id: "prop-4",
    name: "Moderne Fjordhytte",
    description: "Arkitekttegnet hytte med minimalistisk design og fantastisk fjordutsikt. Åpen planløsning med store glassflater. Perfekt for de som setter pris på moderne design og naturskjønne omgivelser. Egen badeplass og kajakker tilgjengelig.",
    location: "Hardanger",
    beds: 3,
    bathrooms: 1,
    maxGuests: 6,
    pricePerNight: 2500,
    images: [
      "/stock_images/luxury_vacation_cabi_c472c070.jpg",
      "/stock_images/modern_norwegian_cab_9cd3e605.jpg",
    ],
    amenities: ["WiFi", "Smart Lås", "Rengjøring", "Kajakk", "Fjordutsikt", "Badeplass"],
    available: true,
  },
  {
    id: "prop-5",
    name: "Villmarkshytta",
    description: "Autentisk villmarkshytte for de som ønsker å oppleve ekte norsk natur. Beliggende langt fra allfarvei med fantastiske muligheter for jakt, fiske og friluftsliv. Rustikk sjarm med moderne fasiliteter.",
    location: "Røros",
    beds: 4,
    bathrooms: 1,
    maxGuests: 8,
    pricePerNight: 2200,
    images: [
      "/stock_images/luxury_vacation_cabi_fd229fff.jpg",
      "/stock_images/modern_norwegian_cab_f192c4c2.jpg",
    ],
    amenities: ["WiFi", "Smart Lås", "Rengjøring", "Fiskeutstyr", "Vedovn", "Naturnært"],
    available: true,
  },
  {
    id: "prop-6",
    name: "Strandperlen",
    description: "Sjarmerende strandhytte med direkte tilgang til sandstrand. Lyse, luftige rom med maritime detaljer. Perfekt for sommerferie med familien. Inkluderer SUP-brett og strandutstyr.",
    location: "Hvaler",
    beds: 5,
    bathrooms: 2,
    maxGuests: 10,
    pricePerNight: 3800,
    images: [
      "/stock_images/luxury_vacation_cabi_824e5b19.jpg",
      "/stock_images/modern_norwegian_cab_9cd3e605.jpg",
    ],
    amenities: ["WiFi", "Smart Lås", "Rengjøring", "Strand", "SUP-brett", "Utekjøkken", "Parkering"],
    available: false,
  },
];

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private properties: Property[];
  private contactForms: ContactForm[];
  private bookingRequests: BookingRequest[];

  constructor() {
    this.users = new Map();
    this.properties = sampleProperties;
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
