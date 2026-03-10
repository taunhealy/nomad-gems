export type Gem = {
  id: string;
  title: string;
  location: string;
  category: "Villa" | "Cabin" | "Cottage" | "All";
  region?: string;
  image?: string;
  href: string;
  src?: string;
  locked?: boolean;
  comingSoon?: boolean;
  bookingUrl?: string;
  coordinates?: [number, number];
  /** Time in seconds to seek to for thumbnail previews and embed start */
  thumbnailTime?: number;
  description?: string;
  // Remote Work Analysis
  workAreas?: number;
  ergonomicComfort?: number; // 1-5
  wifiQuality?: number; // 1-5
  extensionLead?: boolean;
  cellularStrength?: number; // 1-5
  tours?: string[]; // IDs of tours
  // At a Glance info
  website?: string;
  address?: string;
  whatsapp?: string;
  googleMapsUrl?: string;
};

export type Tour = {
  id: string;
  title: string;
  location: string;
  src: string;
  href?: string;
  bookingUrl?: string;
  image?: string;
  category?: string;
};

/** Extract a YouTube video ID from various YouTube URL formats */
export function getYoutubeId(url: string | null): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

/** Get the high-quality YouTube thumbnail URL */
export function getYoutubeThumbnail(url: string | null): string {
  const id = getYoutubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : "";
}

export const GEMS: Gem[] = [
  {
    id: "g1",
    title: "Francolin House",
    location: "Cape Town, South Africa",
    category: "Villa",
    coordinates: [-33.9249, 18.4241],
    href: "/stay/francolin-house",
    src: "https://assets.blueowlmedia.nz/Blue-Owl-Media_Tour_Healy-House-creator.mp4",
    locked: false,
    bookingUrl: "https://www.blueowlmedia.nz",
    workAreas: 2,
    ergonomicComfort: 5,
    wifiQuality: 5,
    extensionLead: true,
    cellularStrength: 4,
  },

  {
    id: "g4",
    title: "Waterfall Farm",
    location: "Western Cape, South Africa",
    category: "Cottage",
    coordinates: [-33.8, 19.5],
    image: "https://a0.muscache.com/im/pictures/miso/Hosting-1097507241005856448/original/07c34bde-e3c3-4396-99f4-d344c6b9113c.jpeg?im_w=720",
    href: "#",
    src: "",
    comingSoon: true,
    bookingUrl: "",
  },
  {
    id: "g6",
    title: "Big Sky Cottages",
    location: "Tulbagh, South Africa",
    category: "Cottage",
    coordinates: [-33.284, 19.136],
    image: "https://i0.wp.com/bigskycottages.co.za/wp-content/uploads/2020/10/LIGHT-LOUNGE-STUDIO-304-scaled.jpg?resize=1920%2C1080&ssl=1",
    href: "/stay/big-sky-cottages",
    src: "https://assets.blueowlmedia.nz/Blue-Owl-Media_Big-Sky_Environment-Reel-Sunset-A-2.mp4",
    bookingUrl: "https://book.nightsbridge.com/15291",
    description: "High-altitude serenity in the Tulbagh valley. Modern self-catering cottages designed for deep focus and mountain-side peace.",
    workAreas: 1,
    ergonomicComfort: 2,
    wifiQuality: 2,
    extensionLead: true,
    cellularStrength: 5,
    tours: ["t1"],
    website: "https://bigskycottages.co.za/",
    address: "R44, Tulbagh, 6820, South Africa",
    whatsapp: "+27713549209",
    googleMapsUrl: "https://maps.app.goo.gl/uXyY9Z6x4r4yP3zW6",
  }
];

export const ENVIRONMENTS: Gem[] = [
  {
    id: "e1",
    title: "Arniston Dunes",
    location: "Western Cape, South Africa",
    category: "All",
    coordinates: [-34.664, 20.231],
    region: "Western Cape",
    href: "#",
    src: "https://assets.blueowlmedia.nz/Blue-Owl%20Media%20Environment%20Arniston%20Dunes-Coast-Compressed.mp4",
    locked: false,
    bookingUrl: ""
  },
  {
    id: "e2",
    title: "Struisbaai Harbour",
    location: "Western Cape, South Africa",
    category: "All",
    coordinates: [-34.793, 20.057],
    region: "Western Cape",
    href: "#",
    src: "https://assets.blueowlmedia.nz/Blue-Owl-Media%20Content%20Struisbaai-Harbour%20Short-Compressed.mp4",
    locked: false,
    bookingUrl: ""
  },
  {
    id: "e3",
    title: "Arniston Cliffs",
    location: "Western Cape, South Africa",
    category: "All",
    coordinates: [-34.664, 20.22],
    region: "Western Cape",
    href: "#",
    src: "https://assets.blueowlmedia.nz/Blue-Owl-Media_Environment_ArnistonCoast-Sunset-web.mp4",
    locked: false,
    bookingUrl: ""
  },
  {
    id: "e4",
    title: "Cape Agulhas Lighthouse",
    location: "Western Cape, South Africa",
    category: "All",
    coordinates: [-34.829, 20.009],
    region: "Western Cape",
    href: "#",
    src: "https://assets.blueowlmedia.nz/Blue-Owl-Media_Shorts_Environ_Cape-Agulhas-Lighthouse.mp4",
    locked: false,
    bookingUrl: ""
  },
  {
    id: "e5",
    title: "Grotto Beach",
    location: "Hermanus, South Africa",
    category: "All",
    coordinates: [-34.4135, 19.2876],
    region: "Western Cape",
    href: "#",
    src: "https://youtu.be/ClCZ7VOwnn0",
    thumbnailTime: 10,
    locked: false,
    bookingUrl: ""
  },
  {
    id: "e6",
    title: "Sunset Over Tulbagh Valley",
    location: "Tulbagh, South Africa",
    category: "All",
    coordinates: [-33.284, 19.136],
    region: "Western Cape",
    href: "#",
    src: "https://assets.blueowlmedia.nz/Blue-Owl-Media_Big-Sky_Environment-Reel-Sunset-A-2.mp4",
    locked: false,
    bookingUrl: ""
  }
];

export const TOURS: Tour[] = [
  {
    id: "t1",
    title: "Cottage Tour: Exterior & Interior",
    location: "Tulbagh, South Africa",
    src: "https://assets.blueowlmedia.nz/Blue-Owl-Media_Drone-Tour_Cottage-Exterior-Interior-A.mp4",
    category: "Drone Tour"
  }
];
