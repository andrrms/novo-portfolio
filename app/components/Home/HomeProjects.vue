<script lang="ts" setup>
/**
 * Projetos pessoais (content/projetos), com o fundo característico de cada um como capa.
 * O card inteiro leva à página do projeto, mas o link fica só no nome, para o leitor de tela anunciar só ele.
 * Cada parte do card tem o mesmo nome de transição da página: na troca, elas saem daqui para lá.
 */
// A lista só muda a cada deploy: guardada, a volta para a home não espera a rede.
const { data } = await useFetch('/api/projetos', {
  getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key] ?? nuxtApp.static.data[key],
});

const projects = computed(() => data.value?.map(project => ({ ...project, slug: project.stem.replace('projetos/', '') })));
</script>

<template>
  <UiSection id="projetos" title="Projetos" class="scroll-mt-24">
    <ul class="grid sm:grid-cols-2">
      <li
        v-for="project in projects"
        :key="project.path"
        class="project relative p-4 border-foreground-muted not-last:border-b sm:not-last:border-b-0 sm:odd:border-r"
      >
        <div class="cover pointer-events-none relative isolate aspect-[40/21] overflow-hidden" :style="projectTransition(project.slug, 'cover')">
          <ProjectSignature :slug="project.slug" />
          <ProjectLogo :slug="project.slug" class="absolute top-4 left-4 w-8" :style="projectTransition(project.slug, 'logo')" />
        </div>

        <!-- Pichações do easter egg da luminária, uma por projeto. -->
        <UiUvMark v-if="project.slug === 'stalkr'" class="top-1 right-6 flex rotate-3 flex-col items-end">
          <svg viewBox="0 0 60 24" class="w-16 overflow-visible text-uv-pink" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round">
            <path d="M4 22 C 4 6, 26 6, 26 22 M34 22 C 34 4, 58 4, 58 22" />
            <path d="M15 19 a2 2 0 1 1 2 -2 a4 4 0 1 1 -4 4 M46 18 a2 2 0 1 1 2 -2 a4 4 0 1 1 -4 4" stroke="var(--color-uv-cyan)" stroke-width="1.8" />
          </svg>
          <span class="mt-1 font-marker text-base whitespace-nowrap text-uv-cyan [paint-order:stroke] [-webkit-text-stroke:4px_var(--color-uv-ink)]">tá me stalkeando, é?!</span>
        </UiUvMark>
        <UiUvMark v-else-if="project.slug === 'orla'" class="top-6 right-6 flex -rotate-4 items-center gap-1.5">
          <span class="font-marker text-base leading-tight whitespace-nowrap text-uv-pink [paint-order:stroke] [-webkit-text-stroke:4px_var(--color-uv-ink)]">quanto dá pra<br>gastar em pólvora?</span>
          <svg viewBox="0 0 30 34" class="w-8 overflow-visible" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="14" cy="21" r="11" stroke="var(--color-uv-cyan)" stroke-width="2.4" />
            <path d="M20 12 q 3 -6 7 -7" stroke="var(--color-uv-cyan)" stroke-width="2" />
            <path d="M27 1 v3 M29.5 5 h-3 M25 3 l1.5 1.5" stroke="var(--color-uv-yellow)" stroke-width="1.8" />
          </svg>
        </UiUvMark>

        <div class="mt-3 flex items-baseline justify-between gap-3">
          <h3 class="text-lg font-medium" :style="projectTransition(project.slug, 'title')">
            <NuxtLink :to="project.path" class="link">{{ project.title }}</NuxtLink>
          </h3>
          <span class="pointer-events-none font-mono text-xs text-foreground-accent" :style="projectTransition(project.slug, 'host')">{{ project.host }}</span>
        </div>
        <p class="pointer-events-none mt-1 text-sm text-foreground-accent" :style="projectTransition(project.slug, 'description')">{{ project.description }}</p>
        <UiTagList :tags="project.tags" class="pointer-events-none mt-2" :style="projectTransition(project.slug, 'tags')" />
      </li>
    </ul>
  </UiSection>
</template>

<style scoped>
.cover {
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgb(255 255 255 / .12), 0 6px 12px -6px rgb(5 10 60 / .6);
  transition: translate 150ms ease-out;
}

.project:hover .cover {
  translate: 0 -4px;
}

/*
 * O link cobre o card todo; o foco é desenhado no card. As partes com nome de transição viram camadas
 * por cima dele, por isso as que não são o link ignoram o ponteiro.
 */
.link::after {
  content: '';
  position: absolute;
  inset: 0;
}

.link:focus-visible {
  outline: none;
}

.project:has(.link:focus-visible) {
  outline: 2px solid var(--color-primary);
  outline-offset: -6px;
}

.project:hover .link {
  text-decoration: underline;
  text-underline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  .cover {
    transition: none;
  }
}
</style>
