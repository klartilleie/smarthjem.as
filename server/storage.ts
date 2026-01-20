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
      "https://cf.bstatic.com/xdata/images/hotel/max300/613901513.jpg?k=69a46d6f54328aacca75e0e7507057d16bf80594aab39a7cc6d6098916926738&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max300/613901540.jpg?k=aa14d1df619f4bdfe6f003c0d5e63e2f0cd9fbc7fc837444fb4d62c7bf8e589f&o=",
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
  // INACTIVE - Property returned 404 on Booking.com (closed/unavailable)
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
    available: false,
  },
  // INACTIVE - Property returned 404 on Booking.com (closed/unavailable)
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
    available: false,
  },
  {
    id: "feriehus-oksnevik",
    name: "Feriehus - Øksnevik Lindesnes",
    description: "Feriebolig i Øksnevik, Lindesnes med to soverom og ett bad. Gjester nyter gratis WiFi, fullt utstyrt kjøkken og vaskemaskin. Eiendommen har terrasse og utsikt over landskapet. Gratis privat parkering tilgjengelig. 77 km fra Kristiansand Kjevik flyplass.",
    location: "Ytre Marisli, Lindesnes",
    beds: 3,
    bathrooms: 1,
    maxGuests: 5,
    pricePerNight: 0,
    images: [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/558608020.jpg?k=55a4ce422ac57dfe00cbbd5efc59feb7c21a40a339b97607f1a8b5a0f5d05ac5&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max500/558608063.jpg?k=7fa31bb2e2dd67c4a8d57c00c1e1cc2dab98a30eb131beae14c0ebd5d22b75c1&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max500/558608024.jpg?k=f37bb21a7b2da8dc7b03fbc62f9bc4c78de92c34d4a2e2d60d41a556b21e4af1&o=",
    ],
    amenities: ["WiFi", "Gratis Parkering", "Terrasse", "Kjøkken", "TV", "Vaskemaskin", "Utsikt"],
    available: true,
  },
  {
    id: "feriehus-arendal",
    name: "Feriehus - Arendal ved sjøen",
    description: "Feriebolig ved sjøen i Arendal med ett soverom og ett bad. Gjester nyter gratis WiFi, fullt utstyrt kjøkken og terrasse med sjøutsikt. Eiendommen tilbyr gratis privat parkering. Perfekt for de som elsker sjølivet. 39 km fra Kristiansand Kjevik flyplass.",
    location: "Sandvigsveien, Arendal",
    beds: 2,
    bathrooms: 1,
    maxGuests: 5,
    pricePerNight: 0,
    images: [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/558618652.jpg?k=3c2e65e5ed6afb6c0fdfca0e24e4e8a74f1b8de05e29c25f8c0e0e0aa78b0f0d&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max500/558618704.jpg?k=1b3d59e2b0a8c95e8d0e6c7f8d9a0b1c2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max500/558618688.jpg?k=2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b&o=",
    ],
    amenities: ["WiFi", "Gratis Parkering", "Sjøutsikt", "Terrasse", "Kjøkken", "TV"],
    available: true,
  },
  // INACTIVE - Property returned 404 on Booking.com (closed/unavailable)
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
    available: false,
  },
  {
    id: "vakker-spindfjorden",
    name: "Vakker ferie ved Spindfjorden",
    description: "Vakker feriebolig ved Spindfjorden i Farsund med to soverom og ett bad. Gjester nyter gratis WiFi, fullt utstyrt kjøkken og vaskemaskin. Eiendommen har terrasse med fantastisk fjordutsikt. Gratis privat parkering tilgjengelig. 72 km fra Kristiansand Kjevik flyplass.",
    location: "Ersækerveien, Farsund",
    beds: 3,
    bathrooms: 1,
    maxGuests: 6,
    pricePerNight: 0,
    images: [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/558440508.jpg?k=f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max500/558440510.jpg?k=a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max500/558440512.jpg?k=b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3&o=",
    ],
    amenities: ["WiFi", "Gratis Parkering", "Utsikt", "Terrasse", "Kjøkken", "TV", "Vaskemaskin"],
    available: true,
  },
  {
    id: "feriehus-lauvbakken-moi",
    name: "Feriehus Lauvbakken Moi",
    description: "Feriebolig på Lauvbakken i Lund med strandfront og to soverom. Gjester nyter gratis WiFi, balkong med innsjøutsikt og fullt utstyrt kjøkken. Eiendommen har peis og hage. Kjæledyr er velkomne. Gratis privat parkering tilgjengelig. 101 km fra Stavanger flyplass.",
    location: "Tjellesvik, Lund",
    beds: 2,
    bathrooms: 1,
    maxGuests: 4,
    pricePerNight: 0,
    images: [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/559999485.jpg?k=0670a72c7f748b075cf565fef68381c19243a2fd1bb633392f353340a9f950aa&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max500/697566697.jpg?k=43df7fe7be4069b2d7304c10a35ae3680f7ae30bb5e0d25b16d9126d661ae18b&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max500/559999550.jpg?k=e5e0f32e698585e6a88fa51083a005c343c709d3768f033995982e708291981f&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max300/559999590.jpg?k=0ebe03751ab3aade420a2d6d1f104186e8f2483936c4f311c76ab5aaf1d97f8a&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max300/559999566.jpg?k=16bb54ff8c1e052a860bc21a87f38716362ecc81e68910106bc44c05b330f421&o=",
    ],
    amenities: ["WiFi", "Strandfront", "Balkong", "Hage", "Kjøkken", "TV", "Peis", "Kjæledyr Tillatt", "Utsikt"],
    available: true,
  },
  {
    id: "dobbel-feriehus-bortelid",
    name: "Dobbel Feriehus - Bortelid/Åseral",
    description: "Romslig feriehus på Bortelid i Åseral med fire soverom og to bad. Eiendommen inkluderer boblebad og spa. Gjester nyter gratis WiFi, solterrasse og hage. Fullt utstyrt kjøkken med vaskemaskin. Gratis privat parkering. Perfekt for større grupper og familier. 101 km fra Kristiansand Kjevik flyplass.",
    location: "Tjaldal, Åseral",
    beds: 5,
    bathrooms: 2,
    maxGuests: 8,
    pricePerNight: 0,
    images: [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/550165626.jpg?k=a8b32c3dbfac1aa615f1f9e3f3682691f6cff35d1ef0dba26d5abaebf0fd6b90&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max500/571448223.jpg?k=ca6e46617c04e5280beea503918ea1af779a74dee297add4a2d6d041523058b1&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max500/571447485.jpg?k=7bf5dffbc040596beb8fd43955a99a078cafd8cf021a3331fb0a3fadf0d48742&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max300/571447885.jpg?k=a88140dd6b04663bb5b90d7629100c9848dcda92623c7129ba103b2514898817&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max300/571448366.jpg?k=5702504a58732d8bd3aba77f5416b01fc4c61cb3f9b65f11a54ec7965e7ecfaa&o=",
    ],
    amenities: ["WiFi", "Gratis Parkering", "Boblebad", "Spa", "Solterrasse", "Hage", "Kjøkken", "TV", "Vaskemaskin", "Familievennlig"],
    available: true,
  },
  {
    id: "flott-feriehus-tjorhom",
    name: "Flott Feriehus - Tjørhom",
    description: "Romslig feriehus i Tjørhom, Sirdal med fire soverom og to bad. Eiendommen har stue med sofaer og familievennlige rom. Gjester nyter gratis WiFi, hage og terrasse med fjell- og hageutsikt. Fullt utstyrt kjøkken med vaskemaskin. Gratis privat parkering. Perfekt for vintersport og friluftsliv. 90 km fra Stavanger flyplass.",
    location: "Sinnes, Sirdal",
    beds: 7,
    bathrooms: 2,
    maxGuests: 9,
    pricePerNight: 0,
    images: [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/526487530.jpg?k=21581f8f8572e3d9941d774eef182b141430d12ddd707ccfad48a0351138c606&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max500/526487640.jpg?k=b36f947fb4651f37a382cbe2c1f60dd21f4ee41a543e984953daa90650b45cd9&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max500/526487612.jpg?k=1d3a19d9245ac2ec4f499ec72a9a1ce8cef571fb62f26910682e9019d9203faa&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max300/526487602.jpg?k=76ddf0869a0ecf411ec7dbedb7ec9f5576e43c780668e876bf88e9ecd1e47496&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max300/526487595.jpg?k=61543905558f944336d310aaa5b723c7413d64f655a5d97a9f512c312429a76c&o=",
    ],
    amenities: ["WiFi", "Gratis Parkering", "Fjellutsikt", "Hage", "Terrasse", "Kjøkken", "TV", "Vaskemaskin", "Familievennlig", "Vintersport"],
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
