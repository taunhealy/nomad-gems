export type Gem = {
  id: string;
  title: string;
  location: string;
  category: "Villa" | "Cabin" | "All";
  image: string;
  href: string;
  src?: string;
  locked?: boolean;
  bookingUrl?: string;
};

export const GEMS: Gem[] = [
  {
    id: "g1",
    title: "Francolin House",
    location: "Cape Town, South Africa",
    category: "Villa",
    image: "https://assets.blueowlmedia.nz/Screenshot%202026-02-16%20163918.png",
    href: "/gems/francolin-house",
    src: "https://assets.blueowlmedia.nz/Blue-Owl-Media_Tour_Healy-House-creator.mp4",
    locked: false,
    bookingUrl: "www.blueowlmedia.nz",
  },
  {
    id: "g2",
    title: "Beach Villa",
    location: "Western Cape, Cape Town",
    category: "Villa",
    image: "https://images.unsplash.com/photo-1543489822-c49534f3271f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    href: "/gems/beach-villa",
    src: "https://assets.blueowlmedia.nz/Blue-Owl-Media_2026_Showreel-1_4K-Credits-web.mp4", // Placeholder
    locked: true,
    bookingUrl: "",
  },
  {
    id: "g3",
    title: "Lake Cabin",
    location: "Lake Louise, AB, Canada",
    category: "Cabin",
    image: "https://images.unsplash.com/photo-1610048899906-d8f64bc45464?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    href: "/gems/lake-cabin",
    src: "",
    locked: true,
    bookingUrl: "",
  },
];
