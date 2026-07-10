<script lang="ts" setup>
import jobs from '~/data/jobs.json';
</script>

<template>
  <section id="experiencia" class="border-y border-foreground-muted/25 bg-background-muted/45 scroll-mt-20">
    <div class="mx-auto max-w-5xl px-5 py-20 md:px-8 md:py-28">
      <p class="section-label">03 / Experiência</p>
      <h2 class="section-title">Construindo e mantendo produtos reais.</h2>

      <ul class="mt-10 divide-y divide-foreground-muted/25 rounded-xl border border-foreground-muted/25 bg-background">
        <li v-for="job in jobs" :key="job.company.name" class="p-5 md:p-8">
          <ExperienceCompany :company="job.company" :positions="job.positions" />
        </li>
      </ul>
    </div>
  </section>
</template>
