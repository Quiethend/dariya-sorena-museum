#!/bin/bash
cd /home/z/my-project
IMAGES="chapter-building-sound chapter-fight-club chapter-royal-band chapter-live chapter-film-tv chapter-new-chapter chapter-future album-1 album-2 album-3 album-4 gallery-portrait-1 gallery-portrait-2 gallery-concert-1 gallery-studio-1 gallery-archive-1 og-cover"
for img in $IMAGES; do
  echo "=== generating $img ==="
  timeout 120 bun run scripts/gen-one.ts "$img" 2>&1
  echo "--- done $img, sleeping 5s ---"
  sleep 5
done
echo "ALL DONE"
