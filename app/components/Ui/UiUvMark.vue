<script lang="ts" setup>
/**
 * Pichação em tinta UV do easter egg da luminária (useLamp). Só existe depois que a cordinha desce e só
 * aparece com a luz apagada (.uv-mark em tailwind.css). Passa por cima do conteúdo vizinho apenas se
 * nenhum ancestral criar stacking context (transform, filter, z-index, isolate): por isso vai solta em
 * cards e seções, posicionada pelas classes de quem usa.
 */
const { cord } = useLamp();
</script>

<template>
  <span v-if="cord" class="uv-mark" aria-hidden="true">
    <slot />
  </span>
</template>
