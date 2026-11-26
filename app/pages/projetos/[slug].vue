<script lang="ts" setup>
/**
 * Teste: com true, o fundo do projeto ocupa a largura da tela e a página inteira (navbar inclusa)
 * assume as cores dele (`[data-project]` no tailwind.css). Com false, o fundo fica só no topo do card.
 */
const IMMERSIVE = true;

const slug = String(useRoute().params.slug);

const { data: project } = await useAsyncData(`projeto-${slug}`, () =>
  queryCollection('projetos').path(`/projetos/${slug}`).first());

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Projeto não encontrado', fatal: true });
}

useHead({ htmlAttrs: { 'data-project': IMMERSIVE ? slug : undefined } });

useSeoMeta({
  title: project.value.title,
  description: project.value.description,
  ogImage: `${useRequestURL().origin}/projetos/${slug}.webp`,
});
</script>

<template>
  <div v-if="project" class="w-full *:px-4 md:*:px-0">
    <UiDivider v-if="!IMMERSIVE" />

    <div class="relative isolate border-b border-foreground-muted">
      <div v-if="IMMERSIVE" class="backdrop" :style="projectTransition(slug, 'cover')">
        <ProjectSignature :slug="slug" />
      </div>

      <!--
        Camada própria na transição: sem ela, o fundo que cresce cobria as linhas e o voltar até o fim.
        Sobre o fundo, as linhas são brancas translúcidas: clareiam a cor de baixo e, no escuro, dão o
        mesmo cinza das bordas do resto da página.
      -->
      <div
        class="mx-auto max-w-3xl border-x"
        :class="IMMERSIVE ? 'border-white/20' : 'border-foreground-muted bg-background'"
        :style="projectTransition(slug, 'frame')"
      >
        <NuxtLink
          to="/#projetos"
          class="inline-flex items-center gap-2 px-4 py-2 font-mono text-sm"
          :class="IMMERSIVE ? 'text-white/80 hover:text-white' : 'text-foreground-accent hover:text-primary'"
        >
          <Icon name="material-symbols:arrow-back-rounded" size="1.1em" />
          Projetos
        </NuxtLink>

        <div
          class="relative isolate flex h-64 flex-col justify-end border-t p-6 text-white sm:h-72"
          :class="IMMERSIVE ? 'border-white/20' : 'border-foreground-muted'"
          :style="IMMERSIVE ? undefined : projectTransition(slug, 'cover')"
        >
          <ProjectSignature v-if="!IMMERSIVE" :slug="slug" class="-z-10" />
          <ProjectLogo :slug="slug" class="mb-auto w-10" :style="projectTransition(slug, 'logo')" />
          <h1 class="w-fit text-4xl font-bold" :style="projectTransition(slug, 'title')">{{ project.title }}</h1>
          <p class="mt-2 max-w-md text-white/85" :style="projectTransition(slug, 'description')">{{ project.description }}</p>
        </div>
      </div>
    </div>

    <UiCard>
      <div class="flex flex-wrap items-center justify-between gap-3 border-b border-foreground-muted px-4 py-3">
        <UiTagList :tags="project.tags" :style="projectTransition(slug, 'tags')" />
        <a
          :href="`https://${project.host}`"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block font-mono text-sm underline underline-offset-3 hover:text-primary"
          :style="projectTransition(slug, 'host')"
        >{{ project.host }} ↗</a>
      </div>

      <ContentRenderer :value="project" class="content-renderer p-4" />
    </UiCard>

    <div class="h-5" />
  </div>
</template>

<style scoped>
/* Fundo na largura da tela, apagando para a cor do tema antes do conteúdo. */
.backdrop {
  position: absolute;
  inset: 0;
  z-index: -1;
  mask-image: linear-gradient(#000 55%, transparent);
}
</style>
