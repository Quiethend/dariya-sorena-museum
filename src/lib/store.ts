import { create } from "zustand";

export type ViewId =
  | "home"
  | "story"
  | "gallery"
  | "albums";

export type Locale = "en" | "fa";

export type AlbumDetailId =
  | null
  | "first-breath"
  | "sokhan-haye-azad"
  | "faryad"
  | "akharin-seda";

export type GalleryViewerImageId = string | null;

export type ChapterId =
  | null
  | "beginning"
  | "fight-club"
  | "saamet"
  | "royal-band"
  | "future";

export interface AppState {
  // Navigation
  currentView: ViewId;
  previousView: ViewId | null;
  setView: (view: ViewId) => void;

  // Sub-views
  albumDetail: AlbumDetailId;
  setAlbumDetail: (id: AlbumDetailId) => void;

  galleryViewerImage: GalleryViewerImageId;
  setGalleryViewerImage: (id: GalleryViewerImageId) => void;

  storyChapter: ChapterId;
  setStoryChapter: (id: ChapterId) => void;

  // UI state
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;

  isMusicPlaying: boolean;
  setIsMusicPlaying: (v: boolean) => void;
  currentTrackTitle: string;
  setCurrentTrackTitle: (v: string) => void;
  currentAlbumCover: string;
  setCurrentAlbumCover: (v: string) => void;

  showMusicPlayer: boolean;
  setShowMusicPlayer: (v: boolean) => void;

  // Search
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  searchQuery: string;
  setSearchQuery: (v: string) => void;

  // Locale
  locale: Locale;
  setLocale: (v: Locale) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Navigation
  currentView: "home",
  previousView: null,
  setView: (view) =>
    set((state) => ({
      previousView: state.currentView,
      currentView: view,
      albumDetail: view !== "albums" ? null : state.albumDetail,
      galleryViewerImage: view !== "gallery" ? null : state.galleryViewerImage,
      storyChapter: view !== "story" ? null : state.storyChapter,
    })),

  // Sub-views
  albumDetail: null,
  setAlbumDetail: (id) => set({ albumDetail: id }),

  galleryViewerImage: null,
  setGalleryViewerImage: (id) => set({ galleryViewerImage: id }),

  storyChapter: null,
  setStoryChapter: (id) => set({ storyChapter: id }),

  // UI state
  isLoading: true,
  setIsLoading: (v) => set({ isLoading: v }),

  isMusicPlaying: false,
  setIsMusicPlaying: (v) => set({ isMusicPlaying: v }),
  currentTrackTitle: "",
  setCurrentTrackTitle: (v) => set({ currentTrackTitle: v }),
  currentAlbumCover: "",
  setCurrentAlbumCover: (v) => set({ currentAlbumCover: v }),

  showMusicPlayer: false,
  setShowMusicPlayer: (v) => set({ showMusicPlayer: v }),

  // Search
  searchOpen: false,
  setSearchOpen: (v) => set({ searchOpen: v }),
  searchQuery: "",
  setSearchQuery: (v) => set({ searchQuery: v }),

  // Locale
  locale: "en",
  setLocale: (v) => set({ locale: v }),
}));
