<script lang="ts" setup>
import { building, playlist, TIME_ZONE } from '~/data/now';

/**
 * Seção "Agora": a fita com a música do Last.fm (e um lado B), uma playlist do Spotify ao lado
 * e, embaixo, o momento (quando foi a última música, a hora em Campo Grande e o projeto atual).
 */
const { data: track, refresh } = useLazyFetch('/api/now-playing', { server: false });

const visibility = useDocumentVisibility();
useIntervalFn(() => {
  if (visibility.value === 'visible') refresh();
}, 30_000);

// Sem scheduler, o useNow do VueUse 15 atualiza a cada quadro.
const now = useNow({ scheduler: callback => useIntervalFn(callback, 30_000) });

// O widget do Spotify pesa mais que o site inteiro: só entra quando a seção chega perto da tela.
const playlistSlot = useTemplateRef<HTMLElement>('playlistSlot');
const playlistNear = useElementVisibility(playlistSlot, { rootMargin: '400px', once: true });

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
      <div class="bg-dotted relative flex items-center p-6">
        <HomeCassette :track="track" />

        <!-- O macaco (desenho nosso) com o rabo de pavio aceso, pedindo para aumentar o som. -->
        <UiUvMark class="-bottom-3 -left-4 -rotate-6">
          <svg viewBox="0 0 110 110" class="w-26 overflow-visible" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <g stroke="var(--color-uv-cyan)" stroke-width="2.6">
              <circle cx="20" cy="36" r="10" />
              <circle cx="80" cy="31" r="14" />
              <path d="M21 33 q -4 3 0 6 M80 27 q 6 4 0 8" stroke-width="1.6" />
              <path d="M32 19 C 16 23, 14 50, 28 60 C 40 68, 64 66, 72 52 C 80 36, 71 16, 51 15 C 43 14, 37 16, 32 19 Z" />
              <path d="M33 41 C 30 56, 44 62, 52 61 C 64 60, 70 51, 66 41 C 62 35, 55 38, 51 41 C 45 36, 37 35, 33 41 Z" stroke-width="1.8" />
              <path d="M36 31 l7 7 M43 31 l-7 7" stroke="var(--color-uv-pink)" />
              <path d="M58 34 m0 0 a1.5 1.5 0 1 1 1.5 1.5 a3 3 0 1 1 -3 -3 a4.5 4.5 0 1 1 4.5 4.5" stroke-width="1.8" />
              <path d="M39 49 Q 51 58 63 48 Z" stroke-width="2" />
              <path d="M45 51 v4 M51 52 v4.5 M57 51 v4" stroke-width="1.5" />
              <path d="M39 65 C 34 80, 40 92, 51 92 C 61 92, 67 80, 62 64" />
              <path d="M41 70 L 27 57" />
              <circle cx="25" cy="55" r="3" />
              <path d="M64 86 c 8 -1 8 -7 3 -7 s -3 7 4 6 s 8 -7 3 -7 s -3 7 4 6 s 8 -8 4 -10" stroke-width="2" />
            </g>
            <path d="M87 72 l3 -6 M92 75 l6 -3 M86 76 l-4 -4 M90 70 l1 -7 M94 71 l5 -5" stroke="var(--color-uv-yellow)" stroke-width="2.2" />
          </svg>
          <span class="absolute -top-7 left-14 rotate-[-8deg] rounded-[50%] border-2 border-uv-pink px-3 py-1 font-marker text-base whitespace-nowrap text-uv-pink">AUMENTA!!</span>
        </UiUvMark>
      </div>

      <div v-if="playlist" class="select-none border-t border-foreground-muted p-4 md:border-t-0 md:border-l">
        <!-- Altura fixa reservada: o widget carrega depois e não empurra nada. -->
        <div ref="playlistSlot" class="h-[352px] rounded-xl bg-background-muted">
          <iframe
            v-if="playlistNear"
            :src="`https://open.spotify.com/embed/playlist/${playlist}?utm_source=generator&theme=0`"
            title="Playlist no Spotify"
            class="block size-full rounded-xl"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        </div>
      </div>
    </div>

    <dl class="grid border-t border-foreground-muted font-mono text-sm sm:grid-flow-col sm:auto-cols-fr">
      <div v-if="listened" class="border-b border-foreground-muted px-4 py-3 sm:border-b-0 sm:border-r">
        <dt class="text-xs text-foreground-accent">música</dt>
        <dd>{{ listened }}</dd>
      </div>

      <div class="relative border-b border-foreground-muted px-4 py-3 sm:border-b-0 sm:not-last:border-r">
        <!-- Só abre de madrugada, então a pichação sempre tem razão. -->
        <UiUvMark class="top-6 left-2 h-8 w-16 text-uv-lime">
          <svg viewBox="0 0 64 32" preserveAspectRatio="none" class="size-full overflow-visible" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M34 2 C 54 1, 63 8, 62 16 C 61 26, 44 31, 28 30 C 10 29, 1 23, 2 15 C 3 7, 18 2, 40 3" vector-effect="non-scaling-stroke" />
          </svg>
          <span class="absolute bottom-full left-full flex -rotate-4 items-center gap-1 font-hand text-xl font-bold whitespace-nowrap">
            dormir é pra fraco
            <svg viewBox="0 0 20 20" class="size-5 overflow-visible" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
              <path d="M13 2 A 8.5 8.5 0 1 0 18 14 A 7 7 0 0 1 13 2 Z" />
              <path d="M6 8 l2.5 2.5 M8.5 8 l-2.5 2.5" stroke-width="1.2" />
            </svg>
          </span>
        </UiUvMark>
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
