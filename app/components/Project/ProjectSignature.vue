<script lang="ts" setup>
/** O fundo característico de cada projeto, na capa do card e no topo da página; sem um, pontilhado. */
defineProps<{
  slug: string;
}>();
</script>

<template>
  <ProjectSignatureOrla v-if="slug === 'orla'" />
  <ProjectSignatureStalkr v-else-if="slug === 'stalkr'" />
  <div v-else class="absolute inset-0 bg-dotted" aria-hidden="true" />
</template>
