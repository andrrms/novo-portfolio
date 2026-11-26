<script lang="ts" setup>
/**
 * Cordinha de luminária do easter egg da madrugada (useLamp). Desce do teto na margem direita quando o
 * botão "dark mode" da faixa 88×31 é clicado. Clicar no puxador, ou arrastá-lo para baixo até estalar,
 * apaga a luz: a página troca para as cores de luz apagada (tailwind.css), a luz negra pisca e zumbe,
 * e as pichações (UiUvMark) aparecem.
 *
 * A corda é uma simulação de Verlet: pontos com gravidade ligados por distância fixa. A simulação
 * dorme quando a corda para de balançar.
 */
const { cord, dark } = useLamp();

const SEGMENTS = 16;
const LINK = 15;
const LENGTH = SEGMENTS * LINK;
const GRAVITY = 2600;
const STEP = 1 / 120;
const ITERATIONS = 12;
const DAMPING = 0.985;
// Arrastar além do comprimento da corda por esta distância estala o interruptor.
const PULL = 26;
// Movimento abaixo disto ainda conta como clique.
const TAP = 6;

// Tubo de luz negra acendendo: [ms depois do puxão, intensidade]. Pisca as pichações e o zumbido juntos.
const IGNITION = [[340, 0.6], [400, 0], [540, 0.9], [590, 0.15], [720, 1]] as const;
const HUM = 0.28;

type Point = { x: number; y: number; px: number; py: number };

const reduceMotion = ref(false);
const { width } = useWindowSize();
// Teto da margem direita: a coluna tem 768px (max-w-3xl) e a corda fica 64px além dela.
const anchorX = computed(() => width.value / 2 + 384 + 64);

let points: Point[] = [];
const path = ref('');
const handle = reactive({ x: 0, y: 0, angle: 0 });

function hang(dropped: boolean) {
  // Solta a corda enrolada perto do teto e deixa a gravidade desenrolar; parada, já nasce esticada.
  // Os pontos começam em ordem e um pouco de lado: empilhados no mesmo lugar, ela cairia dobrada.
  points = Array.from({ length: SEGMENTS + 1 }, (_, index) => {
    const x = anchorX.value + (dropped ? index * 1.5 : 0);
    const y = index * (dropped ? 2 : LINK);
    return { x, y, px: x, py: y };
  });
  render();
}

let dragging = false;
let pointer = { x: 0, y: 0 };
let still = 0;

function simulate() {
  const last = points.length - 1;
  for (const [index, point] of points.entries()) {
    if (index === 0 || (dragging && index === last)) continue;
    const vx = (point.x - point.px) * DAMPING;
    const vy = (point.y - point.py) * DAMPING;
    point.px = point.x;
    point.py = point.y;
    point.x += vx;
    point.y += vy + GRAVITY * STEP * STEP;
  }

  points[0]!.x = anchorX.value;
  points[0]!.y = 0;
  if (dragging) {
    points[last]!.x = pointer.x;
    points[last]!.y = pointer.y;
  }

  for (let iteration = 0; iteration < ITERATIONS; iteration++) {
    for (let index = 0; index < last; index++) {
      const a = points[index]!;
      const b = points[index + 1]!;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const distance = Math.hypot(dx, dy) || 0.0001;
      const offset = (distance - LINK) / distance;
      // Pontas presas (teto e puxador na mão) não se movem: o outro ponto corrige tudo.
      const aFixed = index === 0;
      const bFixed = dragging && index + 1 === last;
      const share = aFixed || bFixed ? 1 : 0.5;
      if (!aFixed) {
        a.x += dx * offset * share;
        a.y += dy * offset * share;
      }
      if (!bFixed) {
        b.x -= dx * offset * share;
        b.y -= dy * offset * share;
      }
    }
  }
}

function render() {
  const [first, ...rest] = points;
  if (!first) return;
  // Curva pelos pontos médios: a corda fica lisa sem precisar de mais pontos.
  let d = `M${first.x.toFixed(1)} ${first.y.toFixed(1)}`;
  for (let index = 0; index < rest.length - 1; index++) {
    const point = rest[index]!;
    const next = rest[index + 1]!;
    d += ` Q${point.x.toFixed(1)} ${point.y.toFixed(1)} ${((point.x + next.x) / 2).toFixed(1)} ${((point.y + next.y) / 2).toFixed(1)}`;
  }
  const end = points.at(-1)!;
  const before = points.at(-2)!;
  d += ` L${end.x.toFixed(1)} ${end.y.toFixed(1)}`;
  path.value = d;
  handle.x = end.x;
  handle.y = end.y;
  handle.angle = Math.atan2(end.x - before.x, end.y - before.y) * -180 / Math.PI;
}

let accumulator = 0;
const { pause, resume } = useRafFn(({ delta }) => {
  const before = points.map(point => point.x + point.y);
  accumulator += Math.min(delta / 1000, 1 / 30);
  while (accumulator >= STEP) {
    simulate();
    accumulator -= STEP;
  }
  render();

  const motion = points.reduce((sum, point, index) => sum + Math.abs(point.x + point.y - before[index]!), 0);
  still = motion < 0.05 && !dragging ? still + 1 : 0;
  if (still > 30) pause();
}, { immediate: false });

function wake() {
  if (reduceMotion.value || !points.length) return;
  still = 0;
  resume();
}

watch(anchorX, () => {
  if (!cord.value) return;
  if (reduceMotion.value) hang(false);
  else wake();
});

/* Luz e som */

let audio: ReturnType<typeof createLampAudio> | null = null;
let timers: ReturnType<typeof setTimeout>[] = [];

function setUv(level: number) {
  document.documentElement.style.setProperty('--uv', String(level));
}

// O áudio nasce no gesto (apertar o puxador ou o teclado): o puxão do arraste acontece depois, num pointermove.
function ensureAudio() {
  audio ??= createLampAudio();
  audio.resume();
  return audio;
}

function toggle() {
  const sound = ensureAudio();
  sound.click();
  timers.forEach(clearTimeout);
  timers = [];
  dark.value = !dark.value;

  if (!dark.value) {
    setUv(0);
    sound.buzz(0);
    return;
  }
  if (reduceMotion.value) {
    setUv(1);
    sound.buzz(HUM);
    return;
  }
  for (const [at, level] of IGNITION) {
    timers.push(setTimeout(() => {
      setUv(level);
      sound.buzz(level === 1 ? HUM : level);
    }, at));
  }
}

// O puxão do clique: o puxador desce um pouco e a corda o traz de volta.
function tug() {
  const end = points.at(-1);
  if (!end || reduceMotion.value) return;
  end.y += 34;
  end.py += 34;
  wake();
}

watch(dark, value => {
  if (value) document.documentElement.dataset.lights = 'off';
  else delete document.documentElement.dataset.lights;
});

/* Arraste */

let start = { x: 0, y: 0 };
let grab = { x: 0, y: 0 };
let moved = false;
let pulled = false;

function clampToReach(x: number, y: number) {
  const dx = x - anchorX.value;
  const reach = LENGTH + PULL + 18;
  const distance = Math.hypot(dx, y);
  if (distance <= reach) return { x, y };
  return { x: anchorX.value + dx / distance * reach, y: y / distance * reach };
}

function onPointerDown(event: PointerEvent) {
  if (reduceMotion.value || event.button !== 0) return;
  ensureAudio();
  (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  dragging = true;
  moved = false;
  pulled = false;
  start = { x: event.clientX, y: event.clientY };
  // Onde o dedo pegou no puxador, para ele não pular até o cursor.
  grab = { x: event.clientX - handle.x, y: event.clientY - handle.y };
  pointer = clampToReach(handle.x, handle.y);
  wake();
}

function onPointerMove(event: PointerEvent) {
  if (!dragging) return;
  const dx = event.clientX - start.x;
  const dy = event.clientY - start.y;
  if (Math.hypot(dx, dy) > TAP) moved = true;
  pointer = clampToReach(event.clientX - grab.x, event.clientY - grab.y);
  if (!pulled && Math.hypot(pointer.x - anchorX.value, pointer.y) > LENGTH + PULL) {
    pulled = true;
    toggle();
  }
}

function onPointerUp() {
  if (!dragging) return;
  dragging = false;
  if (!moved) {
    toggle();
    tug();
  }
}

// Teclado (e qualquer clique quando a corda está parada por movimento reduzido).
function onClick(event: MouseEvent) {
  if (event.detail !== 0 && !reduceMotion.value) return;
  toggle();
  tug();
}

watch(cord, value => {
  if (!value) {
    if (dark.value) toggle();
    pause();
    return;
  }
  hang(!reduceMotion.value);
  wake();
});

onMounted(() => {
  reduceMotion.value = matchMedia('(prefers-reduced-motion: reduce)').matches;
});

onBeforeUnmount(() => {
  timers.forEach(clearTimeout);
  audio?.close();
  cord.value = false;
  dark.value = false;
  delete document.documentElement.dataset.lights;
  document.documentElement.style.removeProperty('--uv');
});
</script>

<template>
  <Teleport to="body">
    <div v-if="cord" class="pointer-events-none fixed inset-0 z-40">
      <!-- Tinta UV das pichações: borda áspera de spray e um halo da própria cor. -->
      <svg width="0" height="0" class="absolute" aria-hidden="true">
        <filter id="uv-ink" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="5" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.4" result="rough" />
          <feGaussianBlur in="rough" stdDeviation="3.5" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="rough" />
          </feMerge>
        </filter>
        <!-- Pincel seco da assinatura da Jinx (UiJinxTag): falhas em listras e borda tremida. -->
        <filter id="jinx-brush" x="-10%" y="-20%" width="120%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency=".9 .07" numOctaves="2" seed="4" result="bristles" />
          <feColorMatrix in="bristles" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.6 2" result="gaps" />
          <feComposite in="SourceGraphic" in2="gaps" operator="in" result="dry" />
          <feTurbulence type="fractalNoise" baseFrequency=".07" numOctaves="2" seed="9" result="wobble" />
          <feDisplacementMap in="dry" in2="wobble" scale="5" />
        </filter>
      </svg>

      <svg class="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        <path :d="path" class="cord" />
        <path :d="path" class="cord-twist" />
      </svg>

      <button
        type="button"
        class="pull"
        :class="{ glowing: dark }"
        :style="{ transform: `translate(${handle.x}px, ${handle.y}px) rotate(${handle.angle}deg)` }"
        :aria-label="dark ? 'Acender a luz' : 'Apagar a luz'"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointercancel="onPointerUp"
        @click="onClick"
      >
        <span class="knob" />
      </button>
    </div>
  </Teleport>
</template>

<style scoped>
.cord {
  fill: none;
  stroke: #E9E2CF;
  stroke-width: 2.5;
  stroke-linecap: round;
}

/* Fio trançado: tracejado escuro por cima do claro. */
.cord-twist {
  fill: none;
  stroke: #8F8672;
  stroke-width: 2.5;
  stroke-dasharray: 2 3;
  opacity: .6;
}

/* Área de clique bem maior que o puxador, e subindo pela corda: com ela balançando, é fácil errar. */
.pull {
  position: absolute;
  top: -40px;
  left: 0;
  width: 88px;
  height: 120px;
  margin-left: -44px;
  pointer-events: auto;
  cursor: grab;
  touch-action: none;
  transform-origin: 44px 40px;
}

.pull:active {
  cursor: grabbing;
}

.pull:focus-visible {
  outline: none;
}

.pull:focus-visible .knob {
  outline: 2px solid var(--color-primary);
  outline-offset: 3px;
}

/* Puxador de madeira clara, em forma de gota. */
.knob {
  position: absolute;
  top: 42px;
  left: 50%;
  width: 14px;
  height: 30px;
  margin-left: -7px;
  border-radius: 7px 7px 7px 7px / 6px 6px 12px 12px;
  background: linear-gradient(90deg, #A07C52, #E2C394 45%, #B48B5C);
  box-shadow: 0 3px 6px rgb(5 10 60 / .45);
  transition: box-shadow 300ms ease-out, background 300ms ease-out;
}

/* Puxador que brilha no escuro, como os de verdade. */
.glowing .knob {
  background: linear-gradient(90deg, #8FD9A8, #D8FFE2 45%, #9BE0B3);
  box-shadow: 0 0 6px #7CF0A0, 0 0 16px rgb(124 240 160 / .5);
}
</style>
