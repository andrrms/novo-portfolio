<script lang="ts" setup>
/**
 * Projetos pessoais (content/projetos), com o fundo característico de cada um como capa.
 * O card inteiro leva à página do projeto, mas o link fica só no nome, para o leitor de tela anunciar só ele.
 * Cada parte do card tem o mesmo nome de transição da página: na troca, elas saem daqui para lá.
 */
const { data } = await useAsyncData('projetos', () =>
  queryCollection('projetos').order('order', 'ASC').select('path', 'stem', 'title', 'description', 'host', 'tags').all());

const projects = computed(() => data.value?.map(project => ({ ...project, slug: project.stem.replace('projetos/', '') })));

// No navegador, o Nuxt Content baixa o banco na primeira consulta, e a transição para a página do
// projeto esperava por isso com a tela parada. Com a intenção de abrir (ponteiro ou foco), ele já carrega.
let warmed = false;
function warm() {
  if (warmed) return;
  warmed = true;
  queryCollection('projetos').select('path').first().catch(() => (warmed = false));
}
</script>

<template>
  <UiSection id="projetos" title="Projetos" class="scroll-mt-24">
    <ul class="grid sm:grid-cols-2">
      <li
        v-for="project in projects"
        :key="project.path"
        class="project relative p-4 border-foreground-muted not-last:border-b sm:not-last:border-b-0 sm:odd:border-r"
        @pointerenter="warm"
        @focusin="warm"
      >
        <div class="cover pointer-events-none relative isolate aspect-[40/21] overflow-hidden" :style="projectTransition(project.slug, 'cover')">
          <ProjectSignature :slug="project.slug" />
          <ProjectLogo :slug="project.slug" class="absolute top-4 left-4 w-8" :style="projectTransition(project.slug, 'logo')" />
        </div>

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
