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
    href: "/gems/francolin-house",
    src: "https://assets.blueowlmedia.nz/Blue-Owl-Media_Tour_Healy-House-creator.mp4",
    locked: false,
    bookingUrl: "https://www.blueowlmedia.nz",
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
    href: "https://bigskycottages.co.za/",
    src: "",
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
  }
];
