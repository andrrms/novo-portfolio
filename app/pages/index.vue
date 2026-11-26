<script lang="ts" setup>
const { siteUrl } = useRuntimeConfig().public;
const description = 'Desenvolvedor full-stack com base sólida em front-end.';

useSeoMeta({
  description,
  ogTitle: 'André Silveira',
  ogDescription: description,
  ogType: 'profile',
  ogUrl: siteUrl,
  ogImage: { url: `${siteUrl}/og.png`, width: 1200, height: 630, alt: 'André Silveira, desenvolvedor full-stack' },
});

useHead({
  link: [{ rel: 'canonical', href: siteUrl }],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'André Rufino M. Silveira',
      alternateName: 'André Silveira',
      jobTitle: 'Desenvolvedor full-stack',
      url: siteUrl,
      sameAs: ['https://www.github.com/andrrms', 'https://www.linkedin.com/in/andrrms'],
    }),
  }],
});
</script>

<template>
  <div class="w-full *:px-4 md:*:px-0">
    <UiDivider />

    <UiCard class="relative grid sm:grid-cols-[auto_1fr]">
      <UiSticker kind="badge" icon="mdi:emoticon-happy-outline" color="#1B1B1B" background="#F5C518" side="left" :size="88" :rotate="9" top="4.5rem" offset="4rem" />
      <!-- Olhos em X e dentes por cima do adesivo de carinha, na mesma posição dele. -->
      <UiUvMark class="top-18 right-[calc(100%+4rem)] hidden size-22 rotate-9 text-uv-pink xl:block">
        <svg viewBox="0 0 24 24" class="absolute inset-[19%] overflow-visible" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round">
          <path d="M7 8 l3 3 M10 8 l-3 3 M14 7.8 l3.4 3.4 M17.4 7.8 l-3.4 3.4" />
          <path d="M7.5 14.6 l1 1.6 l1 -1.4 l1 1.7 l1 -1.6 l1 1.7 l1 -1.6 l1 1.5 l1 -1.6" stroke-width="1" />
        </svg>
      </UiUvMark>

      <div class="flex justify-center border-b border-foreground-muted py-3 sm:items-center sm:border-b-0 sm:border-r sm:px-3">
        <div class="relative border border-foreground-muted rounded-full">
          <img src="~/assets/images/perfil.webp" alt="" class="h-44 aspect-square rounded-full m-0.5" />
          <!-- Em % da foto: os olhos ficam em 41% da altura e a boca em 62%. -->
          <UiUvMark class="inset-0.5">
            <svg viewBox="0 0 100 100" class="size-full overflow-visible" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <g stroke="var(--color-uv-ink)" stroke-width="4.5">
                <path d="M36 36 l10 10 M46 35.5 l-10 10.5 M56 34.5 l11.5 12 M67.5 35 l-11 11.5" />
                <path d="M33 59 Q 51 64 70 57 Q 52 79 33 59 Z M69 60 v13" />
              </g>
              <path d="M36 36 l10 10 M46 35.5 l-10 10.5 M56 34.5 l11.5 12 M67.5 35 l-11 11.5" stroke="var(--color-uv-pink)" stroke-width="2.6" />
              <path d="M33 59 Q 51 64 70 57 Q 52 79 33 59 Z" stroke="var(--color-uv-cyan)" stroke-width="2.2" />
              <path d="M40 60 v6 M46 61 v8 M52 61.5 v8 M58 61 v7.5 M64 59.5 v5.5" stroke="var(--color-uv-cyan)" stroke-width="1.4" />
              <path d="M69 60 v12" stroke="var(--color-uv-cyan)" stroke-width="2" />
              <circle cx="69" cy="74" r="1.8" fill="var(--color-uv-cyan)" />
            </svg>
          </UiUvMark>
        </div>
      </div>

      <div class="flex flex-col">
        <h1 class="text-2xl font-bold px-3 pt-4 pb-3">
          <UiChalkMark>
            André Rufino M. Silveira
            <!-- Ela risca o nome e assina por cima: o "EXPLOSIVA" de baixo passa a ser sobre ela. -->
            <UiUvMark class="inset-0">
              <svg viewBox="0 0 100 20" preserveAspectRatio="none" class="absolute -inset-x-2 top-1/2 h-5 w-[calc(100%+1rem)] -translate-y-1/2 overflow-visible text-uv-cyan" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                <path d="M0 12 C 20 6, 40 14, 60 8 S 90 6, 100 9 M98 11 C 70 17, 40 6, 4 14 M3 7 C 30 12, 60 4, 97 13" vector-effect="non-scaling-stroke" />
              </svg>
              <span class="absolute -top-9 left-[calc(100%+1.5rem)] flex -rotate-8 flex-col items-center whitespace-nowrap">
                <UiJinxTag class="w-32 text-uv-pink" />
                <span class="font-hand text-xl leading-none font-bold text-uv-cyan">ESTEVE AQUI</span>
              </span>
            </UiUvMark>
          </UiChalkMark>
        </h1>
        <p class="text-foreground-accent text-sm border-y border-foreground-muted px-3 py-1">Desenvolvedor full-stack com base <span class="relative">sólida<UiUvMark class="inset-0 text-uv-pink">
          <svg viewBox="0 0 60 10" preserveAspectRatio="none" class="absolute -inset-x-1 top-1/2 h-2.5 w-[calc(100%+0.5rem)] -translate-y-1/2 overflow-visible" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" vector-effect="non-scaling-stroke">
            <path d="M0 4 C 15 1, 32 6, 60 2 M2 9 C 20 6, 40 10, 58 6" vector-effect="non-scaling-stroke" />
          </svg>
          <span class="absolute bottom-[90%] left-1/2 -translate-x-1/2 -rotate-6 font-marker text-lg whitespace-nowrap">EXPLOSIVA</span>
        </UiUvMark></span> em front-end.</p>

        <ul class="flex flex-col gap-2 px-3 py-3">
          <li class="flex items-center gap-3">
            <Icon name="material-symbols:code-rounded" size="1.1em" class="text-primary shrink-0" />
            <span class="relative">
              Líder técnico
              <UiUvMark class="top-1/2 left-full ms-2 flex -translate-y-1/2 items-center gap-1 text-uv-pink">
                <svg viewBox="0 0 40 16" class="w-9 overflow-visible" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M38 10 C 28 2, 14 14, 3 8 M9 3 L2 8 L9 13" />
                </svg>
                <span class="-rotate-6 font-marker text-base whitespace-nowrap">chefe de quê?</span>
              </UiUvMark>
            </span>
          </li>
          <li class="flex items-center gap-3">
            <Icon name="material-symbols:location-on-outline-rounded" size="1.1em" class="text-primary shrink-0" />
            Campo Grande, MS - Brasil
          </li>
          <li class="flex items-center gap-3">
            <Icon name="material-symbols:mail-outline-rounded" size="1.1em" class="text-primary shrink-0" />
            <a href="mailto:pro.andresilveira@gmail.com" class="underline underline-offset-3 hover:text-primary">pro.andresilveira@gmail.com</a>
          </li>
        </ul>
      </div>
    </UiCard>

    <UiDivider />

    <UiCard class="relative flex flex-wrap justify-center gap-10 px-4 py-8">
      <UiSticker kind="badge" shape="square" icon="mdi:album" color="#F4EEDD" background="#14161B" peel :size="84" :rotate="6" top="3rem" offset="5rem" />

      <div class="relative">
        <HomeStamp
          href="https://www.linkedin.com/in/andrrms"
          name="LinkedIn"
          handle="andrrms"
          icon="mdi:linkedin"
          color="#0A66C2"
          style="--rotate: -2deg"
        />
        <!-- Carinha dormindo: o LinkedIn dá sono. -->
        <UiUvMark class="-top-7 right-1 rotate-8 text-uv-lime">
          <svg viewBox="0 0 30 30" class="size-8 overflow-visible" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
            <path d="M15 3 C 7 3, 3 9, 3.5 16 C 4 24, 10 27.5, 16 27 C 23 26.5, 27 21, 26.5 14 C 26 7, 21 3, 15 3 Z" />
            <path d="M8.5 13 q 2.5 2 5 0 M16.5 12.5 q 2.5 2 5 0" />
            <path d="M12 20 q 3 -1.5 6 0.5" />
            <path d="M17 21 q 0.5 3 -0.5 5" stroke-width="1.4" />
          </svg>
          <span class="absolute -top-4 left-7 font-marker text-sm">z</span>
          <span class="absolute -top-8 left-10 font-marker text-base">Z</span>
          <span class="absolute -top-13 left-14 font-marker text-xl">Z</span>
        </UiUvMark>
      </div>
      <div class="relative">
        <HomeStamp
          href="https://www.github.com/andrrms"
          name="GitHub"
          handle="andrrms"
          icon="mdi:github"
          color="#181717"
          style="--rotate: 1.5deg"
        />
        <!-- O GitHub ela aprova. -->
        <UiUvMark class="-top-4 -right-4 -rotate-12 text-uv-pink">
          <svg viewBox="0 0 26 24" class="size-7 overflow-visible" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M13 21 C 6 16, 1.5 11.5, 2.5 7 C 3.5 2.5, 9.5 1.5, 12.5 6.5 C 15 1, 22.5 1.5, 23.5 7.5 C 24 12, 19 16.5, 12 22.5" />
          </svg>
        </UiUvMark>
      </div>
    </UiCard>

    <UiDivider />

    <UiSection title="Sobre Mim">
      <UiSticker icon="mdi:star" color="#F5B700" :size="68" :rotate="16" top="0.25rem" offset="1.75rem" />
      <div class="p-4 space-y-3">
        <p>Sou desenvolvedor full-stack e <span class="relative whitespace-nowrap">aprendi a programar sozinho<UiUvMark class="inset-0">
          <svg viewBox="0 0 100 8" preserveAspectRatio="none" class="absolute inset-x-0 -bottom-1.5 h-2 w-full overflow-visible text-uv-pink" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
            <path d="M0 4 l4 -3 l4 6 l4 -6 l4 6 l4 -6 l4 6 l4 -6 l4 6 l4 -6 l4 6 l4 -6 l4 6 l4 -6 l4 6 l4 -6 l4 6 l4 -6 l4 6 l4 -6 l4 6 l4 -6 l4 6 l4 -6 l4 6 l4 -3" vector-effect="non-scaling-stroke" />
          </svg>
          <span class="absolute right-0 bottom-[calc(100%+0.1rem)] rotate-2 font-hand text-xl font-bold whitespace-nowrap text-uv-cyan">eu aprendi a explodir sozinha</span>
        </UiUvMark></span>. Desde 2023 trabalho na Catálise Investimentos, cuidando do front-end em Vue e Nuxt e do back-end em PHP.</p>
        <p>Gosto de construir coisas complexas do jeito mais simples possível. Me importo MUITO com interface: acessibilidade, performance e os detalhes pequenos que <span class="relative whitespace-nowrap">quase ninguém nota<UiUvMark class="-inset-x-3 -inset-y-1.5 text-uv-cyan">
          <svg viewBox="0 0 100 30" preserveAspectRatio="none" class="absolute inset-0 size-full overflow-visible" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M52 3 C 85 1, 99 8, 98 15 C 97 25, 70 29, 45 28 C 15 27, 1 22, 2 14 C 3 6, 25 2, 60 4 C 80 5, 96 10, 95 17 C 93 26, 60 30, 30 26" vector-effect="non-scaling-stroke" />
          </svg>
          <svg viewBox="0 0 60 30" class="absolute top-full right-0 h-8 w-16 overflow-visible" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M8 2 C 12 18, 30 26, 54 22 M46 16 l9 6 l-9 5" />
          </svg>
          <span class="absolute top-[calc(100%+1.25rem)] -right-26 rotate-5 font-marker text-lg whitespace-nowrap">EU NOTEI ;)</span>
        </UiUvMark></span> (mas todo mundo sente).</p>
        <p>Fora do trabalho, vivo <span class="relative whitespace-nowrap">começando projeto pessoal<UiUvMark class="inset-0 text-uv-lime">
          <svg viewBox="0 0 100 8" preserveAspectRatio="none" class="absolute inset-x-0 -bottom-1 h-2 w-full overflow-visible" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round">
            <path d="M0 3 C 30 6, 60 1, 100 4 M4 7 C 40 5, 70 8, 98 6" vector-effect="non-scaling-stroke" />
          </svg>
          <span class="absolute top-[calc(100%+0.35rem)] left-1/2 -rotate-3 font-marker text-base whitespace-nowrap">e não termina nenhum :P</span>
        </UiUvMark></span> pra aprender coisa nova, quase sempre com Vue, React ou Node.</p>
      </div>
    </UiSection>

    <UiDivider />

    <HomeProjects />

    <UiDivider />

    <ExperienceSection />

    <UiDivider />

    <HomeNow />

    <UiDivider />

    <HomeGames />

    <UiDivider />

    <HomeButtons />

    <UiDivider />

    <UiCard class="relative flex items-center justify-center p-4">
      <UiSticker icon="mdi:lightning-bolt" color="#FF7A1A" side="left" :size="64" :rotate="-18" top="0.25rem" offset="5.5rem" />
      <p class="font-mono text-sm text-foreground-accent cursor-default">Feito com &lt;3 por <abbr title="André Silveira">mim</abbr>. <!-- O código-fonte está disponível no GitHub. --></p>
      <!-- A assinatura dela, embaixo da dele. -->
      <UiUvMark class="top-1/2 right-3 flex -translate-y-1/2 -rotate-3 items-center gap-1.5">
        <span class="font-hand text-2xl font-bold text-uv-cyan">e estragado com &lt;3 por mim</span>
        <svg viewBox="0 0 30 30" class="size-7 overflow-visible text-uv-pink" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 2.5 C 7 2.5, 2.5 8, 3 15.5 C 3.5 23, 9 27.5, 15.5 27 C 22.5 26.5, 27.5 21.5, 27 14 C 26.5 6.5, 21.5 2.5, 15 2.5 Z" />
          <path d="M8 9 l4 4 M12 9 l-4 4 M17.5 8.5 l4 4 M21.5 8.5 l-4 4" />
          <path d="M8 18 Q 15 23 22.5 17.5" />
          <path d="M14 20.5 q 0 5 3.5 4.5 q 2 -0.5 1.5 -4" />
        </svg>
      </UiUvMark>
    </UiCard>

    <!-- <UiCard variant="stripped" class="flex items-center justify-center">
      <div class="flex h-fit">
        <a href="#" class="w-fit p-4 font-mono text-xs text-foreground-muted border-x border-foreground-muted bg-background">llms.txt</a>
        <a href="#" class="w-12 aspect-square flex items-center justify-center font-mono text-xs text-foreground-muted border-r border-foreground-muted bg-background">
          <Icon name="mdi:rss" size="2em" />
        </a>
        <a href="#" class="w-fit px-4 font-mono text-xs text-foreground-muted border-r border-foreground-muted bg-background inline-flex items-center gap-2">
          <Icon name="mdi:github" size="2em" /> Código Fonte
        </a>
      </div>
    </UiCard> -->

    <div class="h-5" />

    <ClientOnly>
      <HomeLamp />
    </ClientOnly>
  </div>
</template>
