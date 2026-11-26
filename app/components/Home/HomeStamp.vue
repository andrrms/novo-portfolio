<script lang="ts" setup>
/**
 * Link social em forma de selo postal deitado, com borda picotada, carimbo e o logo da marca.
 */
defineProps<{
  href: string;
  name: string;
  handle: string;
  icon: string;
  color: string;
}>();
</script>

<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    class="stamp"
    :aria-label="`${name} (${handle})`"
  >
    <!-- O picote fica num elemento interno para não cortar o contorno de foco do link. -->
    <span class="paper">
      <span class="frame">
        <Icon :name="icon" class="logo" :style="{ color }" />
        <span class="caption">
          <span class="font-semibold">{{ name }}</span>
          <span class="opacity-70">{{ handle }}</span>
        </span>
      </span>
      <svg class="postmark" viewBox="0 0 80 40" aria-hidden="true">
        <path
          v-for="y in [8, 16, 24, 32]"
          :key="y"
          :d="`M0 ${y} q10 -5 20 0 t20 0 t20 0 t20 0`"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
        />
      </svg>
    </span>
  </a>
</template>

<style scoped>
.stamp {
  --size: 10px;

  display: inline-block;
  border-radius: 2px;
  transform: rotate(var(--rotate, 0deg));
  transition: transform 200ms cubic-bezier(.2, .8, .2, 1);
  filter: drop-shadow(0 2px 0 rgb(10 16 80 / .5)) drop-shadow(0 10px 14px rgb(5 10 60 / .35));
}

.stamp:hover {
  transform: rotate(0deg) translateY(-3px);
}

.stamp:active {
  transform: rotate(0deg) translateY(0);
}

.stamp:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 6px;
}

/* Medidas múltiplas de --size, para o picote fechar certinho nos cantos. */
.paper {
  position: relative;
  display: block;
  width: 220px;
  height: 130px;
  padding: calc(var(--size) / 2 + 4px);
  overflow: hidden;
  background: #F4EEDD;
  /* Picote: furos com centro exatamente na borda, a cada --size. */
  mask:
    linear-gradient(#000 0 0) content-box,
    radial-gradient(circle calc(var(--size) / 3), #0000 98%, #000) calc(var(--size) / -2) calc(var(--size) / -2) / var(--size) var(--size);
  mask-composite: add;
}

.frame {
  display: flex;
  height: 100%;
  align-items: center;
  gap: 14px;
  padding: 0 18px;
  border: 1px solid #1B2370;
  outline: 3px solid #F4EEDD;
  outline-offset: -5px;
  box-shadow: inset 0 0 0 4px #1B2370;
}

.logo {
  flex-shrink: 0;
  width: 54px;
  height: 54px;
}

.caption {
  display: flex;
  flex-direction: column;
  font: 13px/1.35 var(--font-mono);
  color: #1B2370;
}

.postmark {
  position: absolute;
  top: 12px;
  right: -10px;
  width: 84px;
  color: #1B2370;
  opacity: .28;
  transform: rotate(-12deg);
}

@media (prefers-reduced-motion: reduce) {
  .stamp {
    transition: none;
  }
}
</style>
