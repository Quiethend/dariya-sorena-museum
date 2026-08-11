export type GalleryCategory =
  | "all"
  | "concerts"
  | "behind-the-scenes"
  | "portraits"
  | "rare"
  | "albums";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory[];
  date: string;
  location: string;
  story: string;
  relatedProject?: string;
  relatedAlbum?: string;
  photographer?: string;
  aspect?: "portrait" | "landscape" | "square";
}

export const galleryCategories: { id: GalleryCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "concerts", label: "Concerts" },
  { id: "behind-the-scenes", label: "Behind the Scenes" },
  { id: "portraits", label: "Portraits" },
  { id: "rare", label: "Rare" },
  { id: "albums", label: "Albums" },
];

export const galleryImages: GalleryImage[] = [
  {
    id: "g-1",
    src: "/images/gallery-1.jpg",
    alt: "Dariya & Sorena",
    category: ["all", "portraits"],
    date: "2024",
    location: "Tehran, Iran",
    story: "A moment captured in time.",
    aspect: "landscape",
  },
  {
    id: "g-2",
    src: "/images/gallery-2.jpg",
    alt: "Dariya & Sorena",
    category: ["all", "portraits"],
    date: "2024",
    location: "Tehran, Iran",
    story: "A moment captured in time.",
    aspect: "landscape",
  },
  {
    id: "g-3",
    src: "/images/gallery-3.jpg",
    alt: "Dariya & Sorena",
    category: ["all", "portraits"],
    date: "2024",
    location: "Tehran, Iran",
    story: "A moment captured in time.",
    aspect: "landscape",
  },
  {
    id: "g-4",
    src: "/images/gallery-4.png",
    alt: "Dariya & Sorena",
    category: ["all", "portraits"],
    date: "2024",
    location: "Tehran, Iran",
    story: "A moment captured in time.",
    aspect: "landscape",
  },
  {
    id: "g-5",
    src: "/images/gallery-5.jpg",
    alt: "Dariya & Sorena",
    category: ["all", "portraits"],
    date: "2024",
    location: "Tehran, Iran",
    story: "A moment captured in time.",
    aspect: "landscape",
  },
  {
    id: "g-6",
    src: "/images/gallery-6.jpg",
    alt: "Dariya & Sorena",
    category: ["all", "portraits"],
    date: "2024",
    location: "Tehran, Iran",
    story: "A moment captured in time.",
    aspect: "landscape",
  },
  {
    id: "g-7",
    src: "/images/gallery-7.jpg",
    alt: "Dariya & Sorena",
    category: ["all", "portraits"],
    date: "2024",
    location: "Tehran, Iran",
    story: "A moment captured in time.",
    aspect: "landscape",
  },
  {
    id: "g-8",
    src: "/images/gallery-8.jpg",
    alt: "Dariya & Sorena",
    category: ["all", "portraits"],
    date: "2024",
    location: "Tehran, Iran",
    story: "A moment captured in time.",
    aspect: "landscape",
  },
  {
    id: "g-9",
    src: "/images/gallery-9.jpg",
    alt: "Dariya & Sorena",
    category: ["all", "portraits"],
    date: "2024",
    location: "Tehran, Iran",
    story: "A moment captured in time.",
    aspect: "landscape",
  },
  {
    id: "g-10",
    src: "/images/gallery-10.jpg",
    alt: "Dariya & Sorena",
    category: ["all", "portraits"],
    date: "2024",
    location: "Tehran, Iran",
    story: "A moment captured in time.",
    aspect: "landscape",
  },
  {
    id: "g-11",
    src: "/images/gallery-11.jpg",
    alt: "Dariya & Sorena",
    category: ["all", "portraits"],
    date: "2024",
    location: "Tehran, Iran",
    story: "A moment captured in time.",
    aspect: "landscape",
  },
  {
    id: "g-12",
    src: "/images/gallery-12.jpg",
    alt: "Dariya & Sorena",
    category: ["all", "portraits"],
    date: "2024",
    location: "Tehran, Iran",
    story: "A moment captured in time.",
    aspect: "landscape",
  },
  {
    id: "g-13",
    src: "/images/gallery-13.png",
    alt: "Dariya & Sorena",
    category: ["all", "portraits"],
    date: "2024",
    location: "Tehran, Iran",
    story: "A moment captured in time.",
    aspect: "landscape",
  },
  {
    id: "g-14",
    src: "/images/gallery-14.png",
    alt: "Dariya & Sorena",
    category: ["all", "portraits"],
    date: "2024",
    location: "Tehran, Iran",
    story: "A moment captured in time.",
    aspect: "landscape",
  },
  {
    id: "g-15",
    src: "/images/gallery-15.jpg",
    alt: "Dariya & Sorena",
    category: ["all", "portraits"],
    date: "2024",
    location: "Tehran, Iran",
    story: "A moment captured in time.",
    aspect: "landscape",
  },
];
