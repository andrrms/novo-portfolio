<template>
  <div class="w-full *:px-4 md:*:px-0">
    <UiDivider />

    <UiCard class="relative grid sm:grid-cols-[auto_1fr]">
      <UiSticker kind="badge" icon="mdi:emoticon-happy-outline" color="#1B1B1B" background="#F5C518" side="left" :size="88" :rotate="9" top="4.5rem" offset="4rem" />

      <div class="flex justify-center border-b border-foreground-muted py-3 sm:block sm:border-b-0 sm:border-r sm:py-0">
        <div class="border border-foreground-muted rounded-full">
          <img src="~/assets/images/eu.jpg" alt="" class="h-44 aspect-square rounded-full m-0.5" />
        </div>
      </div>

      <div class="flex flex-col">
        <h1 class="text-2xl font-bold px-3 pt-4 pb-3">
          <UiChalkMark>André Rufino M. Silveira</UiChalkMark>
        </h1>
        <p class="text-foreground-accent text-sm border-y border-foreground-muted px-3 py-1">Desenvolvedor full-stack com base sólida em front-end.</p>

        <ul class="flex flex-col gap-2 px-3 py-3">
          <li class="flex items-center gap-3">
            <Icon name="material-symbols:code-rounded" size="1.1em" class="text-primary shrink-0" />
            Líder técnico
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

      <HomeStamp
        href="https://www.linkedin.com/in/andrrms"
        name="LinkedIn"
        handle="andrrms"
        icon="mdi:linkedin"
        color="#0A66C2"
        style="--rotate: -2deg"
      />
      <HomeStamp
        href="https://www.github.com/andrrms"
        name="GitHub"
        handle="andrrms"
        icon="mdi:github"
        color="#181717"
        style="--rotate: 1.5deg"
      />
    </UiCard>

    <UiDivider />

    <UiSection title="Sobre Mim">
      <UiSticker icon="mdi:star" color="#F5B700" :size="68" :rotate="16" top="0.25rem" offset="1.75rem" />
      <div class="p-4 space-y-3">
        <p>Sou desenvolvedor full-stack e aprendi a programar sozinho. Desde 2023 trabalho na Catálise Investimentos, cuidando do front-end em Vue e Nuxt e do back-end em PHP.</p>
        <p>Gosto de construir coisas complexas do jeito mais simples possível. Me importo MUITO com interface: acessibilidade, performance e os detalhes pequenos que quase ninguém nota (mas todo mundo sente).</p>
        <p>Fora do trabalho, vivo começando projeto pessoal pra aprender coisa nova, quase sempre com Vue, React ou Node.</p>
      </div>
    </UiSection>

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
  </div>
</template>
