<script lang="ts" setup>
/**
 * Anotação de giz sobre o conteúdo: um risco embaixo ou um círculo em volta.
 * Usa o filtro #chalk declarado no layout.
 */
withDefaults(defineProps<{
  variant?: 'underline' | 'circle';
}>(), { variant: 'underline' });
</script>

<template>
  <span class="relative inline-block">
    <slot />
    <svg
      v-if="variant === 'underline'"
      class="pointer-events-none absolute -left-1 -bottom-2.5 h-3 w-[calc(100%+0.75rem)] overflow-visible text-foreground"
      viewBox="0 0 160 12"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M2 8 C 40 3, 92 10, 158 4"
        filter="url(#chalk)"
        stroke="currentColor"
        stroke-width="3.2"
        stroke-linecap="round"
        fill="none"
        vector-effect="non-scaling-stroke"
      />
    </svg>
    <svg
      v-else
      class="pointer-events-none absolute -left-2.5 -top-1 h-[calc(100%+0.5rem)] w-[calc(100%+1.25rem)] overflow-visible text-foreground"
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M50 3 C 80 2, 98 12, 96 22 C 94 34, 60 38, 40 37 C 14 36, 3 28, 4 19 C 6 8, 30 2, 62 5"
        filter="url(#chalk)"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        fill="none"
        vector-effect="non-scaling-stroke"
      />
    </svg>
  </span>
</template>
