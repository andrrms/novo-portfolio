<script lang="ts" setup>
import { building, playlist } from '~/data/now';

/**
 * Seção "Agora": a fita com a música do Last.fm, uma playlist do Spotify ao lado
 * e, embaixo, o momento (quando foi a última música, a hora em Campo Grande e o projeto atual).
 */
const { data: track, refresh } = useLazyFetch('/api/now-playing', { server: false });

const visibility = useDocumentVisibility();
useIntervalFn(() => {
  if (visibility.value === 'visible') refresh();
}, 30_000);

const now = useNow({ interval: 30_000 });

const time = computed(() => now.value.toLocaleTimeString('pt-BR', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'America/Campo_Grande',
}));

const relative = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' });

const listened = computed(() => {
  const current = track.value;
  if (!current) return null;
  if (current.nowPlaying) return 'tocando agora';
  if (!current.playedAt) return null;
  const minutes = Math.round((current.playedAt - now.value.getTime()) / 60_000);
  if (minutes > -60) return `ouvida ${relative.format(minutes, 'minute')}`;
  if (minutes > -60 * 24) return `ouvida ${relative.format(Math.round(minutes / 60), 'hour')}`;
  return `ouvida ${relative.format(Math.round(minutes / (60 * 24)), 'day')}`;
});
</script>

<template>
  <UiSection title="Agora">
    <div class="grid md:grid-cols-[3fr_2fr]">
      <div class="bg-dotted flex items-center p-6">
        <HomeCassette :track="track" />
      </div>

      <div v-if="playlist" class="select-none border-t border-foreground-muted p-4 md:border-t-0 md:border-l">
        <!-- Altura fixa reservada: o widget carrega depois e não empurra nada. -->
        <iframe
          :src="`https://open.spotify.com/embed/playlist/${playlist}?utm_source=generator&theme=0`"
          title="Playlist no Spotify"
          class="block h-[352px] w-full rounded-xl"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
    </div>

    <dl class="grid border-t border-foreground-muted font-mono text-sm sm:grid-flow-col sm:auto-cols-fr">
      <div v-if="listened" class="border-b border-foreground-muted px-4 py-3 sm:border-b-0 sm:border-r">
        <dt class="text-xs text-foreground-accent">música</dt>
        <dd>{{ listened }}</dd>
      </div>

      <div class="border-b border-foreground-muted px-4 py-3 sm:border-b-0 sm:not-last:border-r">
        <dt class="text-xs text-foreground-accent">hora</dt>
        <dd>
          <ClientOnly>
            <span class="tabular-nums">{{ time }}</span>
            <template #fallback><span class="tabular-nums">--:--</span></template>
          </ClientOnly>
          em Campo Grande
        </dd>
      </div>

      <div v-if="building" class="px-4 py-3">
        <dt class="text-xs text-foreground-accent">construindo</dt>
        <dd class="truncate">
          <a v-if="building.url" :href="building.url" class="underline underline-offset-3 hover:text-primary">{{ building.name }}</a>
          <template v-else>{{ building.name }}</template>
        </dd>
      </div>
    </dl>
  </UiSection>
</template>
