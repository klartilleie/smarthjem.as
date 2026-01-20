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

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private properties: Property[];
  private contactForms: ContactForm[];
  private bookingRequests: BookingRequest[];

  constructor() {
    this.users = new Map();
    this.properties = [];
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
