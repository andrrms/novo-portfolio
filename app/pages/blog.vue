<script lang="ts" setup>
import UiCard from '~/components/Ui/UiCard.vue';

const { data: content } = await useAsyncData(() => queryCollection('content').path('/blog').first());
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

