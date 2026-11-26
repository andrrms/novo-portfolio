<script lang="ts" setup>
/**
 * Fita cassete com a música atual (ou a última ouvida) escrita na etiqueta.
 * Enquanto a música toca, os carretéis giram e a fita passa de um para o outro
 * conforme o progresso estimado da faixa. Sem faixa, a etiqueta fica em branco.
 *
 * O cursor é a fonte de luz: cada parte reflete do seu jeito (parafusos, cubos,
 * bordas, vidro) e a fita inclina de leve na direção dele.
 */
const props = defineProps<{
  track?: {
    title: string;
    artist: string;
    url: string;
    nowPlaying: boolean;
    duration: number | null;
    startedAt: number | null;
  } | null;
}>();

const track = toRef(props, 'track');

const label = computed(() => {
  if (!track.value) return null;
  const status = track.value.nowPlaying ? 'Ouvindo agora' : 'Última ouvida';
  return `${status}: ${track.value.title}, de ${track.value.artist}`;
});

// Geometria em unidades do viewBox (1 unidade ≈ 0,1 mm de uma fita real).
const HUB = { left: 290, right: 710, y: 340 };
const PACK_MIN = 60;
const PACK_MAX = 205;
// Velocidade real da fita: 4,76 cm/s.
const TAPE_SPEED = 476;
const FALLBACK_DURATION = 210_000;

const now = ref(Date.now());
const progress = computed(() => {
  const current = track.value;
  if (!current) return 0.35;
  if (!current.nowPlaying) return 1;
  if (!current.startedAt) return 0;
  const elapsed = (now.value - current.startedAt) / (current.duration ?? FALLBACK_DURATION);
  return Math.min(Math.max(elapsed, 0), 1);
});

// A área de fita se conserva: o que sai de um carretel entra no outro.
const packArea = PACK_MAX ** 2 - PACK_MIN ** 2;
const leftRadius = computed(() => Math.sqrt(PACK_MIN ** 2 + packArea * (1 - progress.value)));
const rightRadius = computed(() => Math.sqrt(PACK_MIN ** 2 + packArea * progress.value));

const leftAngle = ref(0);
const rightAngle = ref(0);

const root = useTemplateRef<HTMLElement>('root');
const isVisible = useElementVisibility(root);
const reduceMotion = ref(false);
onMounted(() => {
  reduceMotion.value = matchMedia('(prefers-reduced-motion: reduce)').matches;
});
const isSpinning = computed(() => Boolean(track.value?.nowPlaying) && isVisible.value && !reduceMotion.value);

// Velocidade linear constante: o carretel menor gira mais rápido.
const { pause, resume } = useRafFn(({ delta }) => {
  now.value = Date.now();
  const distance = TAPE_SPEED * delta / 1000;
  leftAngle.value = (leftAngle.value + distance / leftRadius.value * 180 / Math.PI) % 360;
  rightAngle.value = (rightAngle.value + distance / rightRadius.value * 180 / Math.PI) % 360;
}, { immediate: false });

watch(isSpinning, spinning => spinning ? resume() : pause(), { immediate: true });
watch(track, () => { now.value = Date.now(); });

/*
 * Luz: vetor do centro da fita em direção à fonte, de -1 a 1 em cada eixo.
 * Sem cursor, a luz vem de cima à esquerda.
 */
const DEFAULT_LIGHT = { x: -0.5, y: -0.85 };
const light = reactive({ ...DEFAULT_LIGHT });
const lightTarget = reactive({ ...DEFAULT_LIGHT });
const hovering = ref(false);

const { pause: stopEasing, resume: startEasing } = useRafFn(() => {
  light.x += (lightTarget.x - light.x) * 0.18;
  light.y += (lightTarget.y - light.y) * 0.18;
  if (Math.abs(lightTarget.x - light.x) < 0.002 && Math.abs(lightTarget.y - light.y) < 0.002) {
    Object.assign(light, lightTarget);
    stopEasing();
  }
}, { immediate: false });

function onPointerMove(event: PointerEvent) {
  if (event.pointerType !== 'mouse' || !root.value) return;
  const rect = root.value.getBoundingClientRect();
  lightTarget.x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1));
  lightTarget.y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1));
  hovering.value = true;
  startEasing();
}

function onPointerLeave() {
  Object.assign(lightTarget, DEFAULT_LIGHT);
  hovering.value = false;
  startEasing();
}

const direction = computed(() => {
  const length = Math.hypot(light.x, light.y) || 1;
  return { x: light.x / length, y: light.y / length };
});

// Gradiente de borda: claro no lado da luz, escuro no oposto (objectBoundingBox).
const edge = computed(() => ({
  x1: 0.5 + direction.value.x * 0.5,
  y1: 0.5 + direction.value.y * 0.5,
  x2: 0.5 - direction.value.x * 0.5,
  y2: 0.5 - direction.value.y * 0.5,
}));

// Ponto de brilho em superfícies curvas (parafusos, cubos, rolos de fita).
const specular = computed(() => ({ fx: 0.5 + light.x * 0.32, fy: 0.5 + light.y * 0.32 }));

const rootStyle = computed(() => ({
  '--tilt-x': hovering.value && !reduceMotion.value ? `${-light.y * 5}deg` : '0deg',
  '--tilt-y': hovering.value && !reduceMotion.value ? `${light.x * 6}deg` : '0deg',
  '--shadow-x': `${-light.x * 10}px`,
  '--shadow-y': `${14 - light.y * 8}px`,
}));

const TEETH = [0, 60, 120, 180, 240, 300];
const SCREWS = [[30, 30], [970, 30], [30, 610], [970, 610], [500, 530]] as const;
const WINDOW_TICKS = Array.from({ length: 17 }, (_, index) => 420 + index * 10);
const GRIP_LINES = Array.from({ length: 12 }, (_, index) => index * 10);
</script>

<template>
  <component
    :is="track?.url ? 'a' : 'div'"
    ref="root"
    class="cassette block w-full select-none"
    :style="rootStyle"
    :href="track?.url"
    :target="track?.url ? '_blank' : undefined"
    :rel="track?.url ? 'noopener noreferrer' : undefined"
    :aria-label="label ?? undefined"
    :aria-hidden="label ? undefined : 'true'"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <!-- Tamanho em classes globais: o estilo do componente pode chegar depois e a fita piscaria enorme. -->
    <svg viewBox="0 0 1000 640" class="block h-auto w-full" aria-hidden="true">
      <defs>
        <linearGradient id="k7-shell" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#33363e" />
          <stop offset=".55" stop-color="#22252b" />
          <stop offset="1" stop-color="#16181c" />
        </linearGradient>
        <linearGradient id="k7-bottom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#2c2f36" />
          <stop offset="1" stop-color="#1b1d22" />
        </linearGradient>
        <radialGradient id="k7-pack">
          <stop offset="0" stop-color="#5a3f2c" />
          <stop offset=".7" stop-color="#46301f" />
          <stop offset="1" stop-color="#2f1f15" />
        </radialGradient>

        <!-- Gradientes que seguem a luz -->
        <linearGradient id="k7-edge" :x1="edge.x1" :y1="edge.y1" :x2="edge.x2" :y2="edge.y2">
          <stop offset="0" stop-color="#fff" stop-opacity=".55" />
          <stop offset=".45" stop-color="#fff" stop-opacity=".06" />
          <stop offset="1" stop-color="#000" stop-opacity=".45" />
        </linearGradient>
        <!-- Parede interna de um furo: a luz bate no lado oposto ao dela. -->
        <linearGradient id="k7-edge-inset" :x1="edge.x2" :y1="edge.y2" :x2="edge.x1" :y2="edge.y1">
          <stop offset="0" stop-color="#fff" stop-opacity=".35" />
          <stop offset=".5" stop-color="#fff" stop-opacity="0" />
          <stop offset="1" stop-color="#000" stop-opacity=".6" />
        </linearGradient>
        <linearGradient id="k7-surface" :x1="edge.x1" :y1="edge.y1" :x2="edge.x2" :y2="edge.y2">
          <stop offset="0" stop-color="#fff" stop-opacity=".09" />
          <stop offset=".6" stop-color="#fff" stop-opacity="0" />
        </linearGradient>
        <radialGradient id="k7-screw" :fx="specular.fx" :fy="specular.fy" r=".6">
          <stop offset="0" stop-color="#fff" />
          <stop offset=".3" stop-color="#d4d7dd" />
          <stop offset=".75" stop-color="#868a93" />
          <stop offset="1" stop-color="#3b3f47" />
        </radialGradient>
        <radialGradient id="k7-hub-light" :fx="specular.fx" :fy="specular.fy" r=".65">
          <stop offset="0" stop-color="#fff" stop-opacity=".9" />
          <stop offset=".3" stop-color="#fff" stop-opacity="0" />
          <stop offset="1" stop-color="#000" stop-opacity=".28" />
        </radialGradient>
        <radialGradient id="k7-pack-light" :fx="specular.fx" :fy="specular.fy" r=".7">
          <stop offset="0" stop-color="#fff" stop-opacity=".16" />
          <stop offset=".45" stop-color="#fff" stop-opacity="0" />
          <stop offset="1" stop-color="#000" stop-opacity=".25" />
        </radialGradient>
        <linearGradient id="k7-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#fff" stop-opacity=".16" />
          <stop offset=".35" stop-color="#fff" stop-opacity=".03" />
          <stop offset="1" stop-color="#fff" stop-opacity="0" />
        </linearGradient>

        <filter id="k7-grain">
          <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .07 0" />
        </filter>
        <filter id="k7-paper">
          <feTurbulence type="fractalNoise" baseFrequency=".6" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 .35  0 0 0 0 .3  0 0 0 0 .2  0 0 0 .1 0" />
        </filter>

        <!-- Furos do casco: carretéis, janela e aberturas de baixo. -->
        <mask id="k7-shell-openings">
          <rect width="1000" height="640" fill="#fff" />
          <circle :cx="HUB.left" :cy="HUB.y" r="100" />
          <circle :cx="HUB.right" :cy="HUB.y" r="100" />
          <rect x="412" y="292" width="176" height="96" rx="12" />
          <rect x="440" y="584" width="120" height="60" rx="4" />
          <circle cx="300" cy="590" r="18" />
          <circle cx="700" cy="590" r="18" />
          <circle cx="378" cy="600" r="10" />
          <circle cx="622" cy="600" r="10" />
        </mask>
        <!-- A etiqueta tem furos um pouco maiores, deixando um aro do casco à mostra. -->
        <mask id="k7-label-openings">
          <rect width="1000" height="640" fill="#fff" />
          <circle :cx="HUB.left" :cy="HUB.y" r="116" />
          <circle :cx="HUB.right" :cy="HUB.y" r="116" />
          <rect x="400" y="280" width="200" height="120" rx="18" />
        </mask>
        <clipPath id="k7-outline">
          <rect width="1000" height="640" rx="28" />
        </clipPath>
        <clipPath id="k7-window">
          <rect x="412" y="292" width="176" height="96" rx="12" />
        </clipPath>
      </defs>

      <g clip-path="url(#k7-outline)">
        <!-- Interior visto pelas aberturas -->
        <rect width="1000" height="640" fill="#0a0b0d" />
        <rect x="300" y="270" width="400" height="140" fill="#fff" opacity=".04" />

        <!-- Rolos de fita e cubos -->
        <g
v-for="reel in [
          { cx: HUB.left, r: leftRadius, angle: leftAngle },
          { cx: HUB.right, r: rightRadius, angle: rightAngle },
        ]" :key="reel.cx">
          <circle :cx="reel.cx" :cy="HUB.y" :r="reel.r" fill="url(#k7-pack)" />
          <circle :cx="reel.cx" :cy="HUB.y" :r="reel.r" fill="url(#k7-pack-light)" />
          <circle :cx="reel.cx" :cy="HUB.y" :r="reel.r - 0.5" fill="none" stroke="#000" stroke-opacity=".5" />
          <circle :cx="reel.cx" :cy="HUB.y" :r="reel.r * 0.82" fill="none" stroke="#fff" stroke-opacity=".04" />
          <circle :cx="reel.cx" :cy="HUB.y" :r="reel.r * 0.64" fill="none" stroke="#fff" stroke-opacity=".03" />
          <g :transform="`rotate(${reel.angle} ${reel.cx} ${HUB.y})`">
            <circle :cx="reel.cx" :cy="HUB.y" r="58" fill="#ECE8DF" />
            <circle :cx="reel.cx" :cy="HUB.y" r="34" fill="#0a0b0d" />
            <rect
              v-for="angle in TEETH"
              :key="angle"
              :x="reel.cx - 5"
              :y="HUB.y - 36"
              width="10"
              height="12"
              rx="2"
              fill="#ECE8DF"
              :transform="`rotate(${angle} ${reel.cx} ${HUB.y})`"
            />
            <circle :cx="reel.cx" :cy="HUB.y - 46" r="4" fill="#0a0b0d" opacity=".5" />
          </g>
          <!-- Luz do cubo: fora do grupo que gira, para o brilho ficar parado em relação à luz. -->
          <circle :cx="reel.cx" :cy="HUB.y" r="46" fill="none" stroke="url(#k7-hub-light)" stroke-width="24" />
          <circle :cx="reel.cx" :cy="HUB.y" r="58" fill="none" stroke="url(#k7-edge)" stroke-width="1.5" />
        </g>

        <!-- Fita passando por baixo, com o feltro de pressão -->
        <rect x="0" y="616" width="1000" height="12" fill="#3d2a1e" />
        <rect x="0" y="616" width="1000" height="2" fill="#fff" opacity=".08" />
        <path d="M490 586 l4 6 l-8 4 l8 4 l-8 4 l4 6" stroke="#9aa0a8" stroke-width="2" fill="none" />
        <rect x="476" y="606" width="48" height="10" rx="1" fill="#7a6a58" />

        <!-- Casco -->
        <g mask="url(#k7-shell-openings)">
          <rect width="1000" height="640" fill="url(#k7-shell)" />
          <rect width="1000" height="640" fill="url(#k7-surface)" />
          <path d="M196 640 L236 482 H764 L804 640 Z" fill="url(#k7-bottom)" />
          <path d="M196 640 L236 482 H764 L804 640" fill="none" stroke="url(#k7-edge)" stroke-width="3" />
          <path
            v-for="offset in GRIP_LINES"
            :key="`grip-${offset}`"
            :d="`M${56 + offset} 500 V590 M${824 + offset} 500 V590`"
            stroke="#fff"
            stroke-opacity=".05"
            stroke-width="3"
          />
          <rect width="1000" height="640" filter="url(#k7-grain)" />
          <circle :cx="HUB.left" :cy="HUB.y" r="101" fill="none" stroke="url(#k7-edge-inset)" stroke-width="4" />
          <circle :cx="HUB.right" :cy="HUB.y" r="101" fill="none" stroke="url(#k7-edge-inset)" stroke-width="4" />
          <rect x="412" y="292" width="176" height="96" rx="12" fill="none" stroke="url(#k7-edge-inset)" stroke-width="4" />
        </g>

        <!-- Etiqueta -->
        <g mask="url(#k7-label-openings)">
          <rect x="50" y="40" width="900" height="430" rx="12" fill="#F4EEDD" />
          <rect x="50" y="40" width="900" height="430" rx="12" filter="url(#k7-paper)" />
          <rect x="50" y="58" width="900" height="34" fill="#E2381B" />
          <rect x="50" y="96" width="900" height="6" fill="#2438C6" />
          <text x="84" y="82" class="print band">C-90 · Type I · Normal bias</text>
          <text x="916" y="82" text-anchor="end" class="print band">
            <template v-if="track">{{ track.nowPlaying ? '● ouvindo agora' : 'última ouvida' }}</template>
          </text>
          <text x="80" y="196" class="side">A</text>
          <path d="M150 168 H916 M150 214 H916" stroke="#1B2370" stroke-opacity=".2" stroke-width="2" />
          <!-- Laminado da etiqueta: brilho bem fraco do lado da luz. -->
          <rect x="50" y="40" width="900" height="430" rx="12" fill="url(#k7-surface)" />
        </g>
        <rect x="50" y="40" width="900" height="430" rx="12" fill="none" stroke="#000" stroke-opacity=".25" mask="url(#k7-label-openings)" />

        <!-- Escrita à mão: HTML para cortar títulos longos com reticências. -->
        <foreignObject v-if="track" x="150" y="108" width="766" height="112">
          <div class="writing">
            <p class="title">{{ track.title }}</p>
            <p class="artist">{{ track.artist }}</p>
          </div>
        </foreignObject>

        <!-- Vidro da janela: escala impressa e um reflexo que corre com a luz -->
        <rect x="412" y="292" width="176" height="96" rx="12" fill="url(#k7-glass)" />
        <g clip-path="url(#k7-window)">
          <path
            :transform="`translate(${light.x * -70} 0)`"
            d="M470 292 h34 l-40 96 h-34 Z M520 292 h10 l-40 96 h-10 Z"
            fill="#fff"
            opacity=".14"
          />
        </g>
        <path
          v-for="(x, index) in WINDOW_TICKS"
          :key="`tick-${x}`"
          :d="`M${x} 300 v${index % 4 === 0 ? 12 : 6}`"
          stroke="#fff"
          stroke-opacity=".35"
          stroke-width="1.5"
        />

        <!-- Parafusos -->
        <g v-for="[cx, cy] in SCREWS" :key="`screw-${cx}-${cy}`">
          <circle :cx="cx" :cy="cy" r="15" fill="#0d0e11" />
          <circle :cx="cx" :cy="cy" r="12" fill="url(#k7-screw)" />
          <path :d="`M${cx - 7} ${cy} h14 M${cx} ${cy - 7} v14`" stroke="#3a3d44" stroke-width="3" stroke-linecap="round" />
        </g>
      </g>

      <!-- Aresta do casco -->
      <rect x="1.5" y="1.5" width="997" height="637" rx="27" fill="none" stroke="url(#k7-edge)" stroke-width="3" />
    </svg>
  </component>
</template>

<style scoped>
.cassette {
  border-radius: 2.8% / 4.4%;
  color: inherit;
  text-decoration: none;
  transform: perspective(1200px) rotateX(var(--tilt-x)) rotateY(var(--tilt-y));
  transition: transform 300ms cubic-bezier(.2, .8, .2, 1);
  filter: drop-shadow(0 2px 0 #0a0b0e) drop-shadow(var(--shadow-x) var(--shadow-y) 18px rgb(5 10 60 / .45));
}

.cassette:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 6px;
}

.side {
  font: 700 76px var(--font-mono);
  fill: #1B2370;
}

.print {
  font: 600 18px var(--font-mono);
  letter-spacing: .14em;
  text-transform: uppercase;
}

.band {
  fill: #F4EEDD;
}

.writing {
  font-family: 'Caveat', cursive;
  color: #1B2370;
  line-height: 1;
}

.writing p {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.title {
  font-size: 58px;
  font-weight: 700;
}

.artist {
  margin-top: 2px;
  font-size: 42px;
  font-weight: 500;
  opacity: .85;
}

@media (prefers-reduced-motion: reduce) {
  .cassette {
    transition: none;
  }
}
</style>
