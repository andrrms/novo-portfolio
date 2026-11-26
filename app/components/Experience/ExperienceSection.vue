<script lang="ts" setup>
import jobs from '~/data/jobs.json';
</script>

<template>
  <UiSection title="Experiências">
    <UiSticker kind="badge" shape="square" icon="mdi:microphone-variant" color="#fff" background="#E85D9A" peel :size="76" :rotate="-8" top="7rem" offset="3.25rem" />
    <ul class="flex flex-col">
      <li v-for="(job, index) in jobs" :key="job.company.name">
        <div v-if="index > 0" class="h-[30px] bg-stripped border-y border-foreground-muted" aria-hidden="true" />
        <div class="ps-8 pe-4 py-3">
          <ExperienceCompany
            :company="job.company"
            :positions="job.positions"
            :expand-latest="index === 0" />
        </div>
      </li>
    </ul>
  </UiSection>
</template>