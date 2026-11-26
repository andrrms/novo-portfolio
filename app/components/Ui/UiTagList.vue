<script lang="ts" setup>
defineProps<{
  tags: string[];
}>();
</script>

<template>
  <ul v-if="tags.length" class="flex flex-wrap gap-2 mt-2">
    <li
      v-for="tag in tags"
      :key="tag"
      class="bg-background-muted text-foreground-accent text-xs rounded-full px-2 py-1"
    >
      {{ tag }}
    </li>
  </ul>
</template>
