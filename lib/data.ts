export type Gem = {
  id: string;
  title: string;
  location: string;
  category: "Villa" | "Cabin" | "Cottage" | "All";
  image: string;
  href: string;
  src?: string;
  locked?: boolean;
  comingSoon?: boolean;
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
    bookingUrl: "https://www.blueowlmedia.nz",
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
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1888&auto=format&fit=crop",
    href: "/gems/lake-cabin",
    src: "",
    locked: true,
    bookingUrl: "",
  },
  {
    id: "g4",
    title: "Waterfall Farm",
    location: "Western Cape, South Africa",
    category: "Cottage",
    image: "https://a0.muscache.com/im/pictures/miso/Hosting-1097507241005856448/original/07c34bde-e3c3-4396-99f4-d344c6b9113c.jpeg?im_w=720",
    href: "#",
    src: "",
    comingSoon: true,
    bookingUrl: "",
  },
  {
    id: "g5",
    title: "360 on 62",
    location: "Montagu, South Africa",
    category: "Cottage",
    image: "https://www.360on62.co.za/images/2024farmhouse.jpg",
    href: "https://www.360on62.co.za/",
    src: "",
    comingSoon: true,
    bookingUrl: "https://www.360on62.co.za/",
  },
  {
    id: "g6",
    title: "Big Sky Cottages",
    location: "Tulbagh, South Africa",
    category: "Cottage",
    image: "https://i0.wp.com/bigskycottages.co.za/wp-content/uploads/2020/10/LIGHT-LOUNGE-STUDIO-304-scaled.jpg?resize=1920%2C1080&ssl=1",
    href: "https://bigskycottages.co.za/",
    src: "",
    comingSoon: true,
    bookingUrl: "https://bigskycottages.co.za/",
  }
];
