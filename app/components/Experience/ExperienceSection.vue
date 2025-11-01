<script lang="ts" setup>
import jobs from '~/data/jobs.json';
</script>

<template>
  <UiCard as="section" class="flex flex-col w-full">
    <h2 class="w-full border-b border-foreground-muted text-xl font-mono font-extrabold text-primary ps-4 py-3">Experiências</h2>

    <ul class="flex flex-col">
      <li v-for="job in jobs" :key="job.company.name" class="ps-8 pe-4 py-3 not-first-of-type:border-t not-first-of-type:border-foreground-muted">
        <ExperienceCompany
          :company="job.company"
          :positions="job.positions" />
      </li>
    </ul>
  </UiCard>
</template>