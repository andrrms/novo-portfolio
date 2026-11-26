<script lang="ts" setup>
/**
 * A assinatura da Jinx nas pichações (UiUvMark): "Jinx" em pinceladas secas, desenhadas por nós no
 * jeito dela de escrever. A textura de cerdas vem do filtro #jinx-brush, declarado no HomeLamp.
 * A cor vem de `currentColor`.
 */
</script>

<template>
  <svg viewBox="0 0 240 110" class="overflow-visible" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <g filter="url(#jinx-brush)">
      <!-- J: desce, volta em gancho e o rabo segue por baixo das outras letras. -->
      <path d="M56 8 C 61 38, 67 62, 71 84 C 64 99, 38 101, 13 87" stroke-width="16" />
      <path d="M16 95 C 70 106, 142 101, 200 89" stroke-width="10" />
      <!-- i -->
      <path d="M91 47 L 98 83" stroke-width="14" />
      <path d="M86 25 l 9 6" stroke-width="13" />
      <!-- n, num traço só -->
      <path d="M115 85 L 118 45 L 146 81 L 150 37" stroke-width="13" />
      <!-- x -->
      <path d="M166 34 L 214 89" stroke-width="15" />
      <path d="M217 32 L 167 92" stroke-width="12" />
      <!-- Pontas de cerda soltas no começo dos traços. -->
      <path d="M52 6 l -3 -9 M60 5 l 3 -10 M147 35 l 2 -11 M152 36 l 6 -8 M219 30 l 7 -7 M162 33 l -4 -8" stroke-width="2.5" />
    </g>
    <g fill="currentColor">
      <circle cx="30" cy="28" r="2.6" /><circle cx="231" cy="58" r="3" /><circle cx="238" cy="45" r="1.6" />
      <circle cx="108" cy="16" r="1.8" /><circle cx="186" cy="16" r="2.2" /><circle cx="5" cy="72" r="1.6" />
    </g>
  </svg>
</template>
