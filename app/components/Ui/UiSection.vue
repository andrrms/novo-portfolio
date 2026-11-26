<script lang="ts" setup>
/**
 * Seção com título. Em telas largas o título vai para a margem esquerda e acompanha a rolagem.
 */
defineProps<{
  title: string;
}>();
</script>

<template>
  <UiCard as="section" class="relative flex flex-col w-full">
    <div class="xl:absolute xl:right-full xl:inset-y-0 xl:w-60">
      <h2 class="flex items-center justify-end gap-3 border-b border-foreground-muted text-xl font-mono font-extrabold text-primary ps-4 py-3 max-xl:justify-start xl:sticky xl:top-20 xl:border-0 xl:ps-0">
        {{ title }}
        <span class="hidden xl:block w-6 h-px bg-foreground-muted" aria-hidden="true" />
      </h2>
    </div>

    <slot />
  </UiCard>
</template>
