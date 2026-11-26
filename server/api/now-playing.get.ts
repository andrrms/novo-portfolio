interface LastfmTrack {
  name: string;
  url: string;
  artist: { '#text': string };
  date?: { uts: string };
  '@attr'?: { nowplaying?: string };
}

interface RecentTracksResponse {
  recenttracks?: { track?: LastfmTrack[] };
}

interface TrackInfoResponse {
  track?: { duration?: string };
}

/** Duração da faixa em ms, ou null quando o Last.fm não sabe (ele responde "0"). */
async function fetchDuration(apiKey: string, track: LastfmTrack) {
  try {
    const response = await $fetch<TrackInfoResponse>('https://ws.audioscrobbler.com/2.0/', {
      query: {
        method: 'track.getinfo',
        artist: track.artist['#text'],
        track: track.name,
        api_key: apiKey,
        format: 'json',
      },
    });
    const duration = Number(response.track?.duration);
    return duration > 0 ? duration : null;
  } catch {
    return null;
  }
}

/**
 * Última faixa do Last.fm (ou a que está tocando agora), com o necessário para
 * estimar o progresso: duração e quando começou.
 * Sem NUXT_LASTFM_API_KEY e NUXT_LASTFM_USER, devolve null e a fita fica sem etiqueta.
 */
export default defineCachedEventHandler(async () => {
  const { lastfmApiKey, lastfmUser } = useRuntimeConfig();
  if (!lastfmApiKey || !lastfmUser) return null;

  try {
    const response = await $fetch<RecentTracksResponse>('https://ws.audioscrobbler.com/2.0/', {
      query: {
        method: 'user.getrecenttracks',
        user: lastfmUser,
        api_key: lastfmApiKey,
        format: 'json',
        limit: 2,
      },
    });

    const [track, previous] = response.recenttracks?.track ?? [];
    if (!track) return null;

    const nowPlaying = track['@attr']?.nowplaying === 'true';
    const duration = await fetchDuration(lastfmApiKey, track);

    // O Last.fm não diz quando a faixa atual começou. O registro (scrobble) da anterior
    // marca o início dela; somando a duração dela, chega-se ao início da atual.
    let startedAt: number | null = null;
    if (nowPlaying && previous?.date) {
      const previousDuration = await fetchDuration(lastfmApiKey, previous);
      const estimate = previousDuration ? Number(previous.date.uts) * 1000 + previousDuration : null;
      if (estimate && estimate <= Date.now()) startedAt = estimate;
    }

    // Sem estimativa, conta a partir da primeira vez que este servidor viu a faixa tocando.
    if (nowPlaying && !startedAt) {
      const storage = useStorage('cache');
      const key = `now-playing:${track.artist['#text']}:${track.name}`;
      startedAt = await storage.getItem<number>(key) ?? Date.now();
      await storage.setItem(key, startedAt, { ttl: 60 * 30 });
    }

    return {
      artist: track.artist['#text'],
      title: track.name,
      url: track.url,
      nowPlaying,
      duration,
      startedAt,
      // Quando a última faixa (já terminada) foi registrada.
      playedAt: track.date ? Number(track.date.uts) * 1000 : null,
    };
  } catch {
    return null;
  }
}, { maxAge: 30 });
