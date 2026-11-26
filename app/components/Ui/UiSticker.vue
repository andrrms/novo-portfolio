<script lang="ts" setup>
/**
 * Adesivo decorativo nas margens da coluna. Só aparece em telas largas, onde a margem
 * tem espaço; vai dentro de um UiCard, que serve de âncora.
 *
 * - `diecut`: o próprio desenho recortado, com borda branca seguindo o contorno.
 * - `badge`: um selo redondo ou quadrado; com `peel`, a ponta de baixo descola.
 */
const props = withDefaults(defineProps<{
  icon: string;
  color: string;
  kind?: 'diecut' | 'badge';
  shape?: 'circle' | 'square';
  background?: string;
  peel?: boolean;
  side?: 'left' | 'right';
  offset?: string;
  top?: string;
  size?: number;
  rotate?: number;
}>(), {
  kind: 'diecut',
  shape: 'circle',
  background: '#fff',
  peel: false,
  side: 'right',
  offset: '3rem',
  top: '1.5rem',
  size: 72,
  rotate: 0,
});

const position = computed(() => ({
  top: props.top,
  [props.side === 'right' ? 'left' : 'right']: `calc(100% + ${props.offset})`,
  width: `${props.size}px`,
  height: `${props.size}px`,
  '--rotate': `${props.rotate}deg`,
}));
</script>

<template>
  <span class="sticker hidden xl:block" :style="position" aria-hidden="true">
    <!-- mode="svg": o contorno branco é um stroke no próprio desenho, liso em qualquer ângulo. -->
    <Icon v-if="kind === 'diecut'" :name="icon" mode="svg" :size="String(size)" class="diecut" :style="{ color }" />

    <template v-else>
      <span class="badge" :class="[shape, { peeled: peel }]" :style="{ background }">
        <Icon :name="icon" :size="String(Math.round(size * 0.62))" :style="{ color }" />
      </span>
      <span v-if="peel" class="flap" />
    </template>
  </span>
</template>

<style scoped>
.sticker {
  position: absolute;
  transform: rotate(var(--rotate));
  pointer-events: none;
}

/* Sem sombra, só um filete de contato: o adesivo parece colado, não flutuando. */
.diecut {
  display: block;
  overflow: visible;
  filter: drop-shadow(0 1px 0 rgb(10 16 80 / .3));
}

.diecut :deep(path) {
  stroke: #fff;
  stroke-width: 2.4px;
  stroke-linejoin: round;
  paint-order: stroke;
}

.badge {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  border: 4px solid #fff;
  box-shadow: 0 1px 0 rgb(10 16 80 / .25);
}

.circle {
  border-radius: 50%;
}

.square {
  border-radius: 16px;
}

/* A ponta de baixo à direita sai do papel; a dobra mostra o verso do adesivo. */
.peeled {
  clip-path: polygon(0 0, 100% 0, 100% 68%, 68% 100%, 0 100%);
}

.flap {
  position: absolute;
  inset: 0;
  clip-path: polygon(100% 68%, 68% 100%, 66% 66%);
  background: linear-gradient(135deg, #fff 30%, #d9d6cf);
}
</style>
