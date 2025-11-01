<script lang="ts" setup>
import UiCard from '~/components/Ui/UiCard.vue';

const { data: content } = await useAsyncData(() => queryCollection('content').path('/blog').first());

console.log(content.value?.body);
</script>

<template>
  <div class="w-full">
    <UiDivider height="24px" />

    <UiCard class="p-2">
      <ContentRenderer
        v-if="content"
        class="content-renderer"
        :value="content"
      />
      <div v-else>No content available</div>
    </UiCard>
  </div>
</template>

<style>
@reference '~/assets/css/tailwind.css';

.content-renderer {
  @apply flex flex-col gap-4 text-foreground;
}

h1, h2, h3, h4, h5, h6 {
  scroll-margin-top: 5rem;
}

h1 {
  @apply text-3xl font-extrabold font-mono;
}

p {
  @apply leading-snug;
}

p img {
  @apply mx-auto rounded-md;
}

.content-renderer pre {
  @apply p-3 bg-background-muted rounded-md overflow-x-auto;
}

.content-renderer pre + :last-child {
  margin-bottom: 0;
}
</style>
