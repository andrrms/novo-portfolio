<script lang="ts" setup>
import { building, playlist } from '~/data/now';

/**
 * Seção "Agora": a fita com a música do Last.fm, uma playlist do Spotify ao lado
 * e, embaixo, o momento (quando foi a última música, a hora em Campo Grande e o projeto atual).
 */
const TIME_ZONE = 'America/Campo_Grande';
const { data: track, refresh } = useLazyFetch('/api/now-playing', { server: false });

const visibility = useDocumentVisibility();
useIntervalFn(() => {
  if (visibility.value === 'visible') refresh();
}, 30_000);

const now = useNow({ interval: 30_000 });

const time = computed(() => now.value.toLocaleTimeString('pt-BR', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: TIME_ZONE,
}));

// Vem do Intl, não fixo: acompanha o fuso se o horário de verão voltar.
const offsetFormat = new Intl.DateTimeFormat('en-US', { timeZone: TIME_ZONE, timeZoneName: 'shortOffset' });

const offset = computed(() => offsetFormat.formatToParts(now.value).find(part => part.type === 'timeZoneName')?.value ?? 'GMT');

const hoursFormat = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 });
const hoursPlural = new Intl.PluralRules('pt-BR');

/** Diferença para o fuso de quem visita. Só faz sentido no cliente; null quando é a mesma hora. */
const difference = computed(() => {
  const [, sign = '+', hours = '0', minutes = '0'] = offset.value.match(/^GMT([+-])(\d+)(?::(\d+))?$/) ?? [];
  const hostMinutes = Number(`${sign}1`) * (Number(hours) * 60 + Number(minutes));
  const diff = (hostMinutes + now.value.getTimezoneOffset()) / 60;
  if (diff === 0) return null;
  const amount = Math.abs(diff);
  const unit = hoursPlural.select(amount) === 'one' ? 'hora' : 'horas';
  return `${hoursFormat.format(amount)} ${unit} a ${diff < 0 ? 'menos' : 'mais'} que você`;
});

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
        <dt class="flex justify-between gap-2 text-xs text-foreground-accent">
          hora
          <span>{{ offset }}</span>
        </dt>
        <dd>
          <ClientOnly>
            <span class="tabular-nums">{{ time }}</span>
            <template #fallback><span class="tabular-nums">--:--</span></template>
          </ClientOnly>
          em Campo Grande, MS
        </dd>
        <!-- O fallback reserva a linha: só some (e mexe o layout) para quem já está no mesmo fuso. -->
        <ClientOnly>
          <dd v-if="difference" class="text-xs text-foreground-accent">{{ difference }}</dd>
          <template #fallback><dd class="text-xs" aria-hidden="true">&nbsp;</dd></template>
        </ClientOnly>
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
