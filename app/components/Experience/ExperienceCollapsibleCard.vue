<script lang="ts" setup>
import type { Position } from './ExperiencePosition.vue';

const props = defineProps<{
  position: Position;
}>();

const startDate = computed(() => (
  capitalizeFirstLetter(
    createDateFromString(props.position.startDate).toLocaleDateString('pt-BR', {
      month: 'long',
      year: 'numeric',
      timeZone: 'America/Sao_Paulo',
    })
  )
));
const endDate = computed(() => (
  props.position.endDate
    ? capitalizeFirstLetter(
        createDateFromString(props.position.endDate).toLocaleDateString('pt-BR', {
          month: 'long',
          year: 'numeric',
          timeZone: 'America/Sao_Paulo'
        })
      )
    : 'Atualmente'
));
</script>

<template>
  <UiCollapsibleCard class="flex flex-col pb-5 group-last-of-type:pb-0">
    <template #trigger>
      <div class="group/trigger w-full flex flex-col gap-1">
        <p class="text-primary text-lg font-medium group-hover/trigger:underline">{{ position.title }}</p>
        <p class="text-foreground-accent text-sm">{{ startDate }} — {{ endDate }}</p>
      </div>
    </template>

    <div class="flex flex-col gap-2">
      <ul class="ps-4 list-outside list-disc">
        <li v-for="(responsibility, index) in position.responsibilities" :key="index">
          {{ responsibility }}
        </li>
      </ul>

      <UiTagList v-if="position.tags" :tags="position.tags" />
    </div>
  </UiCollapsibleCard>
</template>