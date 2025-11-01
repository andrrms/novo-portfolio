<script lang="ts" setup>
const { quoteOfTheDay } = useQuoteOfTheDay();
</script>

<template>
  <div class="w-full *:px-4 md:*:px-0">
    <UiCard variant="dotted" class="h-[200px] grid place-items-center">
      <pre class="text-foreground-muted select-none text-sm">{{ cowsay(quoteOfTheDay[0]?.q ?? 'Pensando...') }}</pre>
    </UiCard>

    <UiCard class="grid grid-cols-[auto_1fr]">
      <!-- PFP Area -->
      <div class="border-r border-foreground-muted h-full">
        <div class="border border-foreground-muted rounded-full">
          <img src="~/assets/images/eu.jpg" alt="Profile Picture" class="h-44 aspect-square rounded-full m-0.5" />
        </div>
      </div>

      <!-- Info Area -->
      <div class="flex flex-col justify-end">
        <div class="w-full h-[120px] bg-background-muted overflow-hidden">
          <p class="font-mono text-xs text-foreground-accent leading-tight p-1.5">
            linux@andre:~$ git log --oneline -n 3<br>
            <br>
            d4f40a1 (HEAD -> main) feat: Implementar novo design de portfólio<br>
            a1b9c3d (origin/main) refactor: Otimizar build de projetos<br>
            c8e0f1a chore: Atualizar dependências de carreira<br>
            <br>
            linux@andre:~$ █
          </p>
        </div>
        <h1 class="text-2xl text-primary font-bold border-t border-foreground-muted ps-3 py-0.5">André Rufino M. Silveira</h1>
        <p class="text-foreground-accent text-sm border-t border-foreground-muted ps-3 py-0.5">Desenvolvedor full-stack com base sólida em front-end.</p>
      </div>
    </UiCard>

    <UiDivider />

    <UiCard class="flex flex-col w-full px-3 py-2 space-y-2">
      <div class="flex items-center gap-3">
        <div class="bg-background-muted rounded-sm p-1 inline-flex items-center justify-center">
          <Icon name="material-symbols:code-rounded" size="1em" class="text-primary" />
        </div>

        <p class="text-primary">Desenvolvedor Full-stack Pleno</p>
      </div>

      <div class="flex items-center gap-3">
        <div class="bg-background-muted rounded-sm p-1 inline-flex items-center justify-center">
          <Icon name="material-symbols:location-on-outline-rounded" size="1em" class="text-primary" />
        </div>

        <p class="text-primary">Campo Grande, MS - Brasil</p>
      </div>

      <!-- <div class="flex items-center gap-3">
        <div class="bg-background-muted rounded-sm p-1 inline-flex items-center justify-center">
          <Icon name="material-symbols:call-outline-rounded" size="1em" class="text-primary" />
        </div>

        <a href="tel:+5567991301333" class="text-primary hover:underline">+55 (67) 99130-1333</a>
      </div> -->

      <div class="flex items-center gap-3">
        <div class="bg-background-muted rounded-sm p-1 inline-flex items-center justify-center">
          <Icon name="material-symbols:mail-outline-rounded" size="1em" class="text-primary" />
        </div>

        <a href="mailto:pro.andresilveira@gmail.com" class="text-primary hover:underline">pro.andresilveira@gmail.com</a>
      </div>
    </UiCard>

    <UiDivider />

    <UiCard class="flex flex-col gap-4 w-full">
      <div class="grid grid-cols-2 gap-4">
        <a
          href="https://www.linkedin.com/in/andrrms"
          target="_blank" rel="noopener noreferrer"
          class="group flex items-center gap-3 p-3 border-r border-foreground-muted"
        >
          <div class="rounded-md border border-foreground-muted inline-flex items-center justify-center">
            <Icon name="mdi:linkedin" size="3em" class="text-primary" />
          </div>

          <div class="w-full flex flex-col leading-tight">
            <p class="text-primary font-medium group-hover:underline">LinkedIn</p>
            <p class="text-foreground-accent text-sm">andrrms</p>
          </div>

          <Icon name="material-symbols:arrow-outward-rounded" size="1.5em" class="text-foreground-muted ml-auto" />
        </a>

        <a
          href="https://www.github.com/andrrms"
          target="_blank" rel="noopener noreferrer"
          class="group flex items-center gap-3 p-3 border-l border-foreground-muted"
        >
          <div class="rounded-md border border-foreground-muted inline-flex items-center justify-center">
            <Icon name="mdi:github" size="3em" class="text-primary" />
          </div>

          <div class="w-full flex flex-col leading-tight">
            <p class="text-primary font-medium group-hover:underline">GitHub</p>
            <p class="text-foreground-accent text-sm">andrrms</p>
          </div>

          <Icon name="material-symbols:arrow-outward-rounded" size="1.5em" class="text-foreground-muted ml-auto" />
        </a>
      </div>
    </UiCard>

    <UiDivider />

    <UiCard class="flex flex-col w-full">
      <h2 class="w-full border-b border-foreground-muted text-xl font-mono font-extrabold text-primary ps-4 py-3">Sobre Mim</h2>

      <div class="p-4 space-y-3">
        <p>Olá! Eu sou André Silveira — um desenvolvedor full-stack com uma base sólida em front-end e um forte foco em performance, código limpo e arquitetura eficiente.</p>
        <p>Minha jornada autodidata me levou a especializar na construção de aplicações web rápidas e robustas. Como full-stack, tenho mais de 2 anos de experiência na Catálise Investimentos, onde atuo tanto no front-end com Vue.js (Nuxt 3, Pinia) e TailwindCSS, quanto no back-end com PHP.</p>
        <p>Estou sempre explorando novas linguagens e tecnologias. Além do meu stack profissional, tenho grande afinidade com o ecossistema JavaScript, desenvolvendo projetos pessoais com React, Next.js e Node.js. Seja otimizando o back-end, construindo interfaces dinâmicas ou refatorando sistemas para escalabilidade, meu foco é transformar desafios complexos em experiências digitais elegantes.</p>
        <p>Além do código, trago uma mentalidade estratégica — cada decisão que tomo visa apoiar os objetivos do negócio, as necessidades do usuário e a manutenibilidade do projeto a longo prazo.</p>
        <p>Vamos construir algo de impacto?</p>
      </div>
    </UiCard>

    <UiDivider />

    <ExperienceSection />

    <UiDivider />

    <UiCard class="flex items-center justify-center p-4">
      <p class="font-mono text-sm text-primary cursor-default">Feito com &lt;3 por <abbr title="André Silveira">mim</abbr>. <!-- O código-fonte está disponível no GitHub. --></p>
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
