"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useAppStore, type ViewId } from "@/lib/store";
import { HomeView } from "@/components/views/home-view";
import { StoryView } from "@/components/views/story-view";
import { GalleryView } from "@/components/views/gallery-view";
import { AlbumsView } from "@/components/views/albums-view";
import { TimelineView } from "@/components/views/timeline-view";
import { VideosView } from "@/components/views/videos-view";
import { LoadingScreen } from "@/components/site/loading-screen";
import { Navigation } from "@/components/site/navigation";
import { Footer } from "@/components/site/footer";
import { MusicPlayer } from "@/components/site/music-player";
import { CustomCursor } from "@/components/site/custom-cursor";
import { Atmosphere } from "@/components/site/atmosphere";
import { GlobalSearch } from "@/components/site/global-search";
import { ReadingProgress } from "@/components/site/reading-progress";

const views: Record<ViewId, React.ReactNode> = {
  home: <HomeView />,
  story: <StoryView />,
  gallery: <GalleryView />,
  albums: <AlbumsView />,
  timeline: <TimelineView />,
  videos: <VideosView />,
};

export default function Home() {
  const currentView = useAppStore((s) => s.currentView);
  const isLoading = useAppStore((s) => s.isLoading);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      {/* Global layers */}
      <CustomCursor />
      <LoadingScreen />
      <ReadingProgress />
      <Atmosphere />
      <GlobalSearch />

      {!isLoading && <Navigation />}

      {/* View transition */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {views[currentView]}
          </motion.div>
        </AnimatePresence>
      </main>

      {!isLoading && <Footer />}
      <MusicPlayer />
    </div>
  );
}
