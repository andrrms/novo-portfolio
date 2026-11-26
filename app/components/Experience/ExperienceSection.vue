<script lang="ts" setup>
import jobs from '~/data/jobs.json';
</script>

<template>
  <UiSection title="Experiências">
    <UiSticker kind="badge" shape="square" icon="mdi:microphone-variant" color="#fff" background="#E85D9A" peel :size="76" :rotate="-8" top="7rem" offset="3.25rem" />
    <!-- Placa de segurança do trabalho, pichada por cima do primeiro emprego. -->
    <UiUvMark class="top-16 right-6 -rotate-5 border-[3px] border-uv-yellow px-3 py-1.5 text-center text-uv-yellow xl:top-4">
      <span class="block font-marker text-sm leading-tight">DIAS SEM<br>EXPLOSÃO:</span>
      <span class="relative inline-block font-marker text-lg leading-none">
        37
        <svg viewBox="0 0 30 20" class="absolute inset-0 size-full overflow-visible" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M-2 6 L32 4 M-3 11 L31 12 M-1 17 L30 14" />
        </svg>
      </span>
      <span class="ms-2 font-marker text-4xl leading-none text-uv-pink">0</span>
    </UiUvMark>
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