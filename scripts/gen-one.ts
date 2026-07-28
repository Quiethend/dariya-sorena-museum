import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

process.on('unhandledRejection', (e) => {
  console.error('UNHANDLED:', (e as Error)?.message || e);
  process.exit(2);
});
process.on('uncaughtException', (e) => {
  console.error('UNCAUGHT:', (e as Error)?.message || e);
  process.exit(3);
});

const name = process.argv[2];
if (!name) {
  console.error('usage: bun gen-one.ts <name>');
  process.exit(1);
}

const OUT = '/home/z/my-project/public/images';

const prompts: Record<string, { size: string; prompt: string }> = {
  'chapter-early-years': {
    size: '1344x768',
    prompt: 'Intimate underground recording studio at night, warm amber desk lamp glowing over a vintage mixing console, microphone in soft shadow, smoke drifting in warm light, vinyl records on a shelf in soft focus, cinematic shallow depth of field, film grain, nostalgic mood, no people',
  },
  'chapter-building-sound': {
    size: '1344x768',
    prompt: 'Close up of a studio mixing desk with glowing analog VU meters, fingers on faders in shadow, warm orange and red light, drifting cigarette smoke, cinematic moody lighting, film grain, music production atmosphere, no faces visible, ultra detailed',
  },
  'chapter-fight-club': {
    size: '1344x768',
    prompt: 'Gritty underground hip hop venue, raw concrete walls, single red stage light, microphone stand silhouette in haze, empty room with dramatic shadows, rebellious raw atmosphere, cinematic film grain, moody documentary style, no people',
  },
  'chapter-royal-band': {
    size: '1344x768',
    prompt: 'Grand concert stage from behind a microphone, dramatic golden spotlights piercing through thick stage fog, silhouettes of a crowd in the distance, cinematic wide shot, luxury performance atmosphere, film grain, warm and amber tones, no recognizable faces',
  },
  'chapter-live': {
    size: '1344x768',
    prompt: 'Massive concert crowd seen from the stage, thousands of silhouettes with raised hands, stage lights beaming into the audience, lens flares, atmospheric haze, cinematic epic scale, film grain, emotional moment, no recognizable faces',
  },
  'chapter-film-tv': {
    size: '1344x768',
    prompt: 'Cinematic film set at night, a movie camera silhouette, dramatic blue and amber lighting, fog on set, clapperboard in soft focus, anamorphic lens flare, premium production atmosphere, film grain, no people faces',
  },
  'chapter-new-chapter': {
    size: '1344x768',
    prompt: 'Modern minimalist studio at dawn, soft golden light streaming through a window, microphone and headphones on a stand, drifting dust particles, calm reflective mood, cinematic shallow depth of field, film grain, no people',
  },
  'chapter-future': {
    size: '1344x768',
    prompt: 'Abstract cinematic futuristic scene, dark studio with subtle volumetric light beams, holographic music waveform floating in smoke, deep blacks with faint gold accents, premium minimal aesthetic, film grain, atmospheric, no people',
  },
  'album-1': {
    size: '1024x1024',
    prompt: 'Album cover art, two silhouetted figures standing back to back in thick fog under a single streetlight, dark cinematic mood, deep teal and amber, film grain, urban underground aesthetic, minimal typography-free composition, premium luxury hip hop album cover, no readable text, no faces',
  },
  'album-2': {
    size: '1024x1024',
    prompt: 'Album cover art, a vintage vinyl record half submerged in swirling dark smoke, dramatic spotlight, deep blacks and warm gold reflections, cinematic luxury aesthetic, film grain, minimal no text, premium hip hop album cover',
  },
  'album-3': {
    size: '1024x1024',
    prompt: 'Album cover art, a single microphone hanging from above in dense fog with a red glow, deep shadows, raw underground aesthetic, cinematic film grain, minimal no text, premium luxury hip hop album cover, no faces',
  },
  'album-4': {
    size: '1024x1024',
    prompt: 'Album cover art, abstract golden sound waves rippling across a dark void, smoke and dust particles, premium minimal luxury aesthetic, cinematic film grain, deep blacks with gold, no text, no people',
  },
  'gallery-portrait-1': {
    size: '864x1152',
    prompt: 'Artistic portrait silhouette of a figure in profile against a foggy dark backdrop, single rim light outlining the silhouette, face hidden in shadow, cinematic moody black and white with subtle warm tones, film grain, premium fashion editorial aesthetic, anonymous',
  },
  'gallery-portrait-2': {
    size: '864x1152',
    prompt: 'Artistic portrait silhouette of a second figure from behind, hood up, standing in fog with a distant streetlight glow, cinematic dark mood, film grain, premium editorial aesthetic, anonymous no face',
  },
  'gallery-concert-1': {
    size: '1344x768',
    prompt: 'Wide cinematic shot of a live hip hop concert from the side of the stage, dramatic spotlights and haze, silhouettes of performers, crowd glowing in distance, epic emotional atmosphere, film grain, no recognizable faces',
  },
  'gallery-studio-1': {
    size: '1344x768',
    prompt: 'Behind the scenes in a recording studio, warm desk light over a mixing console, headphones and notebook in soft focus, smoke drifting, intimate documentary mood, film grain, no people faces',
  },
  'gallery-archive-1': {
    size: '1344x768',
    prompt: 'Vintage archive aesthetic, old cassette tapes and photographs scattered on a dark wooden desk under warm lamp light, dust particles, nostalgic cinematic mood, film grain, no people',
  },
  'og-cover': {
    size: '1344x768',
    prompt: 'Cinematic dark luxury composition, swirling fog with a single dramatic light beam, deep blacks, gold dust particles, film grain, premium minimal aesthetic, atmospheric, no people, no text',
  },
};

const job = prompts[name];
if (!job) {
  console.error('unknown image:', name);
  process.exit(1);
}

const outPath = `${OUT}/${name}.png`;
if (fs.existsSync(outPath) && fs.statSync(outPath).size > 10000) {
  console.log('SKIP exists:', name);
  process.exit(0);
}

(async () => {
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      console.log(`start ${name} attempt ${attempt}`);
      const zai = await ZAI.create();
      const response = await zai.images.generations.create({
        prompt: job.prompt,
        size: job.size as any,
      });
      const b64 = response.data[0].base64;
      const buffer = Buffer.from(b64, 'base64');
      fs.writeFileSync(outPath, buffer);
      console.log(`OK ${name} ${buffer.length} bytes`);
      process.exit(0);
    } catch (e: any) {
      console.error(`retry ${attempt} ${name}: ${e?.message || e}`);
      const is429 = e?.message?.includes('429');
      await new Promise((r) => setTimeout(r, is429 ? 15000 * attempt : 5000 * attempt));
    }
  }
  console.error(`FAIL ${name}`);
  process.exit(4);
})();
