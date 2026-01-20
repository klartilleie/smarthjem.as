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

// Real properties from Smart Hjem AS portfolio - data from Booking.com
const realProperties: Property[] = [
  {
    id: "smolasen-tjorhom",
    name: "Flott hytte på Smølåsen Tjørhom",
    description: "Flott hytte på Smølåsen Tjørhom i Fidjeland med tre soverom og ett bad. Eiendommen inkluderer et fullt utstyrt kjøkken med kjøleskap, ovn, komfyr, kaffetrakter og vaskemaskin. Gjester kan nyte hage og terrasse med hageutsikt. Hytta har gratis WiFi, balkong og gratis privat parkering. Perfekt for vintersport og naturopplevelser.",
    location: "Fidjeland, Sirdal",
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
  {
    id: "monesstranda-mandal",
    name: "Monesstranda ved Mandal A07",
    description: "Komfortabel feriebolig på Monesstranda med to soverom og ett bad. Gjester nyter gratis WiFi, balkong med hageutsikt, fullt utstyrt kjøkken og vaskemaskin. Eiendommen tilbyr gratis privat parkering og tillater kjæledyr. Lindesnes fyr er 37 km unna, Universitetet i Agder 43 km, og Kristiansand Kjevik flyplass 56 km fra eiendommen.",
    location: "Rugland, Mandal",
    beds: 3,
    bathrooms: 1,
    maxGuests: 6,
    pricePerNight: 0,
    images: [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/736507024.jpg?k=cc4d042ddeea5b0dd49f8782847cd156f68c848ade5c098ad49f02da291f0bab&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max500/736507018.jpg?k=e0d54d15f75469aaf83b94535260bf126b5195cd53866113ee3367fcf7fd2549&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max500/736507005.jpg?k=d67a43df5d54c6ca32a17d3db7ec5a62e362f59ff486f778d4b6db38e3caef87&o=",
    ],
    amenities: ["WiFi", "Gratis Parkering", "Balkong", "Kjøkken", "TV", "Vaskemaskin", "Kjæledyr Tillatt"],
    available: true,
  },
  {
    id: "great-white-bygland",
    name: "Great white cottage in Bygland",
    description: "Koselig feriebolig i Bygland med ett soverom og ett bad. Gjester kan slappe av på terrassen og nyte hageutsikt. Eiendommen har fullt utstyrt kjøkken, TV og gratis WiFi. Gratis privat parkering tilgjengelig. Kjæledyr er velkomne uten ekstra kostnader. 106 km fra Kristiansand Kjevik flyplass.",
    location: "Bygland",
    beds: 1,
    bathrooms: 1,
    maxGuests: 5,
    pricePerNight: 0,
    images: [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/719171922.jpg?k=f9f20d7e2ab786538397400f8eb5c826f1ef8dda406705e32fa22c3326991d35&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max500/719172389.jpg?k=968cf2cbe50a18ceb283bd1399f2bbf5160abfeffb78bad69f7a12481afd2323&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max500/719172254.jpg?k=64d16210df6cb5e4254027a6dc35f053148b5a64fbb84f648474e925d4b41d10&o=",
    ],
    amenities: ["WiFi", "Gratis Parkering", "Terrasse", "Kjøkken", "TV", "Kjæledyr Tillatt"],
    available: true,
  },
  {
    id: "lind-046-lindesnes",
    name: "Lind 046 - 6 voksne 2 barn",
    description: "Feriebolig i Lindesnes med ett soverom og ett bad. Gjester nyter gratis privat parkering, fullt utstyrt kjøkken, vaskemaskin og TV. Eiendommen har hage med vakker utsikt. Sandvikstranna strand er 17 minutters gange unna, mens Lindesnes fyr ligger 12 km fra ferieboligen. Kristiansand Kjevik flyplass er 80 km unna.",
    location: "Spangereid, Lindesnes",
    beds: 3,
    bathrooms: 1,
    maxGuests: 6,
    pricePerNight: 0,
    images: [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/697230514.jpg?k=80b90bb78f00b6723657113f98a00a4fbee50615219a21297556870c70d4b362&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max500/697230541.jpg?k=d55d100a6de5f33e9efc506db466a657314d6d58c89621bd472e955deef67d6d&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max500/697230677.jpg?k=d4de73f3f45d047ad59e8a925d56a4d992f396d4c77779bafeade06b7631b6bc&o=",
    ],
    amenities: ["Gratis Parkering", "Hage", "Kjøkken", "TV", "Vaskemaskin", "Grill", "Utsikt", "Kjæledyr Tillatt"],
    available: true,
  },
  {
    id: "flott-hytte-bygland",
    name: "Flott hytte på Bygland",
    description: "Koselig feriebolig i Bygland med to soverom og ett bad. Gjester nyter gratis WiFi og fullt utstyrt kjøkken. Eiendommen har balkong med hageutsikt. Gratis privat parkering tilgjengelig. Kjæledyr tillatt mot forespørsel. 75 km fra Kristiansand Kjevik flyplass.",
    location: "Bygland",
    beds: 6,
    bathrooms: 1,
    maxGuests: 6,
    pricePerNight: 0,
    images: [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/679348174.jpg?k=566b7a8b5d5a96fee0c1262be31b927fa66c56d2e666668fc0b8c94d0e3e35f5&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max500/679347957.jpg?k=7757344247a797e802fe20124f95b92e74b3ba81e4bf92d5b58afcf8c2f0472a&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max500/679347986.jpg?k=e250fcf14be672c87a6717fe5feced966240f3755f992883449f0d4869d3f92c&o=",
    ],
    amenities: ["WiFi", "Gratis Parkering", "Balkong", "Kjøkken", "TV", "Utsikt", "Kjæledyr Tillatt"],
    available: true,
  },
  {
    id: "feriehus-sogne",
    name: "Flott feriehus Søgne",
    description: "Feriebolig i Kristiansand med tre soverom og ett bad. Gjester kan nyte hage og terrasse med sjøutsikt. Boligen har fullt utstyrt kjøkken med kjøleskap, mikrobølgeovn, ovn, komfyr og vannkoker. Eiendommen inkluderer TV, bad eller dusj og gratis WiFi. 38 km fra Kristiansand Kjevik flyplass.",
    location: "Søgne, Kristiansand",
    beds: 5,
    bathrooms: 1,
    maxGuests: 6,
    pricePerNight: 0,
    images: [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/585588418.jpg?k=bdf64ea1f37a428d701092d99a2c982ce79525fec0fac235cc43becb528f4e11&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max500/585588707.jpg?k=a64e1c86435285bea3ea5b9f0544e7bd182ff6a47f5ed2fd941a8dec87b9de49&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max500/585588459.jpg?k=3ec2e200aba6d048f464408a08f94b77a41aa69a155df98787c0f9847fea430a&o=",
    ],
    amenities: ["WiFi", "Sjøutsikt", "Terrasse", "Hage", "Kjøkken", "TV", "Familievennlig", "Kjæledyr Tillatt"],
    available: true,
  },
  {
    id: "koselig-oggevatn",
    name: "Koselig feriehus Oggevatn",
    description: "Romslig feriebolig i Birkenes med fire soverom og stue. Eiendommen inkluderer fullt utstyrt kjøkken, vaskemaskin og koselig peis. Gjester kan nyte vakker hage og utendørs sitteområde. Gratis WiFi tilgjengelig. Gratis privat parkering og flyplasstransport mot betaling. 27 km fra Kristiansand Kjevik flyplass.",
    location: "Birkenes",
    beds: 4,
    bathrooms: 1,
    maxGuests: 8,
    pricePerNight: 0,
    images: [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/572699655.jpg?k=c6f1a74d06b4b806a0dae8ebf213f7b7f587d19b6228519768a7cddf2e42ce54&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max500/576208876.jpg?k=21c2387a3f9559ab85cee0b4623a2fbd6eaafd350036cf7833398f6d8c11825b&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max500/576208855.jpg?k=21bd0c824b792a6c350a79a63a5359b916dacdac80b91937afc4438e3be5c290&o=",
    ],
    amenities: ["WiFi", "Gratis Parkering", "Flyplasstransport", "Hage", "Kjøkken", "TV", "Peis", "Vaskemaskin", "Familievennlig", "Grill"],
    available: true,
  },
  {
    id: "flott-hytte-skjargard",
    name: "Flott hytte skjærgård Lindesnes",
    description: "Vakker hytte i skjærgården i Lindesnes. Nyt freden og roen ved kysten med fantastisk utsikt over sjøen. Perfekt for familier som ønsker en avslappende ferie ved havet.",
    location: "Øverststranda, Lindesnes",
    beds: 4,
    bathrooms: 1,
    maxGuests: 6,
    pricePerNight: 0,
    images: [],
    amenities: ["WiFi", "Gratis Parkering", "Sjøutsikt", "Kjøkken", "TV"],
    available: true,
  },
  {
    id: "flott-hytte-bjellandsveien",
    name: "Flott hytte ved Bjellandsveien",
    description: "Koselig hytte ved Bjellandsveien i Vennesla. Perfekt beliggenhet for naturopplevelser og avslapping. Moderne fasiliteter kombinert med naturskjønne omgivelser.",
    location: "Vennesla",
    beds: 4,
    bathrooms: 1,
    maxGuests: 6,
    pricePerNight: 0,
    images: [],
    amenities: ["WiFi", "Gratis Parkering", "Kjøkken", "TV"],
    available: true,
  },
  {
    id: "feriehus-oksnevik",
    name: "Feriehus - Øksnevik Lindesnes",
    description: "Feriehus i Øksnevik, Lindesnes. Flott beliggenhet nær kysten med vakker natur rundt. Ideelt for familier som ønsker en rolig ferie.",
    location: "Ytre Marisli, Lindesnes",
    beds: 4,
    bathrooms: 1,
    maxGuests: 6,
    pricePerNight: 0,
    images: [],
    amenities: ["WiFi", "Gratis Parkering", "Kjøkken", "TV"],
    available: true,
  },
  {
    id: "feriehus-arendal",
    name: "Feriehus - Arendal ved sjøen",
    description: "Feriehus ved sjøen i Arendal. Nyt utsikten over havet og slapp av i rolige omgivelser. Perfekt for de som elsker sjølivet.",
    location: "Sandvigsveien, Arendal",
    beds: 4,
    bathrooms: 1,
    maxGuests: 6,
    pricePerNight: 0,
    images: [],
    amenities: ["WiFi", "Gratis Parkering", "Sjøutsikt", "Kjøkken", "TV"],
    available: true,
  },
  {
    id: "ferieleilighet-oyslebo",
    name: "Flott Ferieleilighet - Øyslebø",
    description: "Moderne ferieleilighet i Øyslebø, Lindesnes. Komfortabel og godt utstyrt for en behagelig ferie.",
    location: "Eilsaveien, Lindesnes",
    beds: 4,
    bathrooms: 1,
    maxGuests: 6,
    pricePerNight: 0,
    images: [],
    amenities: ["WiFi", "Gratis Parkering", "Kjøkken", "TV"],
    available: true,
  },
  {
    id: "vakker-spindfjorden",
    name: "Vakker ferie ved Spindfjorden",
    description: "Vakker feriebolig ved Spindfjorden i Farsund. Nyt den fantastiske naturen og freden ved fjorden. Perfekt for naturelskere.",
    location: "Ersækerveien, Farsund",
    beds: 4,
    bathrooms: 1,
    maxGuests: 6,
    pricePerNight: 0,
    images: [],
    amenities: ["WiFi", "Gratis Parkering", "Utsikt", "Kjøkken", "TV"],
    available: true,
  },
  {
    id: "feriehus-lauvbakken-moi",
    name: "Feriehus Lauvbakken Moi",
    description: "Feriehus på Lauvbakken i Moi, Lund. Rolig beliggenhet med naturskjønne omgivelser. Ideelt for en avslappende ferie.",
    location: "Lauvbakken, Lund",
    beds: 4,
    bathrooms: 1,
    maxGuests: 6,
    pricePerNight: 0,
    images: [],
    amenities: ["WiFi", "Gratis Parkering", "Kjøkken", "TV"],
    available: true,
  },
  {
    id: "dobbel-feriehus-bortelid",
    name: "Dobbel Feriehus - Bortelid/Åseral",
    description: "Dobbelt feriehus på Bortelid i Åseral kommune. Perfekt for større grupper eller familier som ønsker plass og komfort.",
    location: "Hestiheiaveien, Åseral",
    beds: 6,
    bathrooms: 2,
    maxGuests: 12,
    pricePerNight: 0,
    images: [],
    amenities: ["WiFi", "Gratis Parkering", "Kjøkken", "TV", "Familievennlig"],
    available: true,
  },
  {
    id: "flott-feriehus-tjorhom",
    name: "Flott Feriehus - Tjørhom",
    description: "Flott feriehus i Tjørhom, Sirdal kommune. Vakker beliggenhet i fjellet med fantastiske muligheter for friluftsliv.",
    location: "Myrane, Sirdal",
    beds: 4,
    bathrooms: 1,
    maxGuests: 8,
    pricePerNight: 0,
    images: [],
    amenities: ["WiFi", "Gratis Parkering", "Kjøkken", "TV", "Utsikt"],
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
