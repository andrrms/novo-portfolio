<script lang="ts" setup>
const { quoteOfTheDay } = useQuoteOfTheDay();

useSeoMeta({
  title: 'André Silveira — Desenvolvedor full-stack',
  description: 'Portfólio de André Silveira, desenvolvedor full-stack focado em produtos claros, rápidos e sustentáveis.',
  ogTitle: 'André Silveira — Desenvolvedor full-stack',
  ogDescription: 'Produtos digitais claros, rápidos e sustentáveis — do front-end à arquitetura.',
});
</script>

<template>
  <main id="inicio" class="w-full overflow-hidden">
    <section class="mx-auto grid min-h-[calc(100svh-5rem)] max-w-5xl items-center gap-12 px-5 py-16 md:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
      <div class="relative z-10">
        <p class="mb-6 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-foreground-accent">
          <span class="h-2 w-2 rounded-full bg-primary shadow-[0_0_18px_var(--primary)]" />
          Desenvolvedor full-stack · Campo Grande, MS
        </p>

        <h1 class="max-w-3xl text-balance text-5xl font-bold leading-[0.94] tracking-[-0.055em] text-foreground sm:text-6xl lg:text-7xl">
          André Silveira
        </h1>
        <p class="mt-6 max-w-2xl text-pretty text-xl leading-relaxed text-foreground-accent sm:text-2xl">
          Desenvolvedor full-stack que transforma sistemas complexos em produtos
          <span class="text-primary">claros, rápidos e sustentáveis.</span>
        </p>

        <div class="mt-9 flex flex-col gap-3 sm:flex-row">
          <a href="#projetos" class="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-5 font-semibold text-background transition-colors hover:bg-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
            Ver projetos
            <Icon name="material-symbols:arrow-downward-rounded" size="1.2em" />
          </a>
          <a href="mailto:pro.andresilveira@gmail.com" class="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-foreground-muted/60 px-5 font-semibold text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
            Entrar em contato
          </a>
        </div>

        <dl class="mt-12 grid grid-cols-1 gap-5 border-t border-foreground-muted/30 pt-6 sm:grid-cols-3">
          <div>
            <dt class="font-mono text-xs uppercase tracking-wider text-foreground-muted">Experiência</dt>
            <dd class="mt-1 font-semibold text-foreground">3+ anos</dd>
          </div>
          <div>
            <dt class="font-mono text-xs uppercase tracking-wider text-foreground-muted">Atuação</dt>
            <dd class="mt-1 font-semibold text-foreground">Fintech e B2B</dd>
          </div>
          <div>
            <dt class="font-mono text-xs uppercase tracking-wider text-foreground-muted">Base</dt>
            <dd class="mt-1 font-semibold text-foreground">Vue · Nuxt · PHP</dd>
          </div>
        </dl>
      </div>

      <div class="relative mx-auto w-full max-w-md lg:mx-0">
        <div class="absolute -inset-10 -z-10 bg-[radial-gradient(circle,var(--primary-soft),transparent_65%)] blur-2xl" />
        <div class="overflow-hidden rounded-xl border border-foreground-muted/35 bg-background-muted shadow-2xl shadow-black/30">
          <div class="flex items-center gap-1.5 border-b border-foreground-muted/25 px-4 py-3" aria-hidden="true">
            <span class="h-2.5 w-2.5 rounded-full bg-foreground-muted/50" />
            <span class="h-2.5 w-2.5 rounded-full bg-foreground-muted/35" />
            <span class="h-2.5 w-2.5 rounded-full bg-primary/80" />
            <span class="ml-auto font-mono text-[10px] text-foreground-muted">andre@portfolio:~</span>
          </div>
          <div class="grid grid-cols-[1fr_6rem] gap-2 p-4 sm:grid-cols-[1fr_8rem]">
            <pre class="min-w-0 overflow-hidden whitespace-pre-wrap font-mono text-[10px] leading-relaxed text-foreground-accent sm:text-xs">{{ cowsay(quoteOfTheDay[0]?.q ?? 'Ship it.') }}</pre>
            <div class="relative self-end overflow-hidden rounded-md bg-primary/20">
              <img src="~/assets/images/eu.jpg" alt="André Silveira" class="aspect-[3/4] h-full w-full object-cover grayscale contrast-110 mix-blend-luminosity" />
              <div class="pointer-events-none absolute inset-0 border border-primary/30" />
            </div>
          </div>
          <p class="border-t border-foreground-muted/25 px-4 py-3 font-mono text-xs text-primary">
            $ construindo produtos que duram<span class="terminal-cursor">_</span>
          </p>
        </div>
      </div>
    </section>

    <section id="projetos" class="border-y border-foreground-muted/25 bg-background-muted/45 scroll-mt-20">
      <div class="mx-auto max-w-5xl px-5 py-20 md:px-8 md:py-28">
        <div class="mb-10 grid gap-4 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p class="section-label">01 / Trabalhos selecionados</p>
            <h2 class="section-title">Evidência antes de adjetivos.</h2>
          </div>
          <p class="max-w-xl text-pretty leading-relaxed text-foreground-accent md:justify-self-end">
            Projetos em que produto, experiência e engenharia precisaram funcionar como uma coisa só.
          </p>
        </div>

        <div class="grid gap-5 lg:grid-cols-2">
          <article class="project-card lg:row-span-2">
            <div class="project-visual min-h-64 bg-[linear-gradient(135deg,var(--primary-soft),transparent_55%)]">
              <div class="w-[82%] rounded-lg border border-primary/25 bg-background/85 p-4 shadow-xl">
                <div class="mb-4 flex gap-1.5"><span /><span /><span /></div>
                <div class="space-y-3">
                  <div class="h-2 w-2/5 rounded bg-primary/70" />
                  <div class="grid grid-cols-3 gap-2"><div class="h-16 rounded bg-primary/15" /><div class="h-16 rounded bg-primary/10" /><div class="h-16 rounded bg-primary/20" /></div>
                  <div class="h-2 w-4/5 rounded bg-foreground-muted/25" />
                  <div class="h-2 w-3/5 rounded bg-foreground-muted/20" />
                </div>
              </div>
            </div>
            <div class="p-6 md:p-8">
              <p class="project-kicker">Case profissional · Produto financeiro</p>
              <h3 class="mt-2 text-2xl font-semibold text-foreground">Modernização incremental de um sistema legado</h3>
              <p class="mt-4 leading-relaxed text-foreground-accent">Criação de um front-end moderno para portar fluxos existentes sem interromper a operação, conciliando requisitos de negócio, experiência do usuário e manutenção de longo prazo.</p>
              <ul class="mt-6 flex flex-wrap gap-2" aria-label="Tecnologias usadas">
                <li class="tech-tag">Vue.js</li><li class="tech-tag">Nuxt</li><li class="tech-tag">Pinia</li><li class="tech-tag">Tailwind CSS</li>
              </ul>
            </div>
          </article>

          <article class="project-card">
            <div class="p-6 md:p-8">
              <p class="project-kicker">Case profissional · Operações</p>
              <h3 class="mt-2 text-2xl font-semibold text-foreground">Automação de processos internos</h3>
              <p class="mt-4 leading-relaxed text-foreground-accent">Integrações entre Jenkins, Pipefy e Workato para reduzir trabalho manual e dar mais previsibilidade a rotinas internas.</p>
              <ul class="mt-6 flex flex-wrap gap-2" aria-label="Tecnologias usadas">
                <li class="tech-tag">Jenkins</li><li class="tech-tag">Pipefy</li><li class="tech-tag">Workato</li>
              </ul>
            </div>
          </article>

          <article class="project-card">
            <div class="p-6 md:p-8">
              <p class="project-kicker">Projeto aberto · Este portfólio</p>
              <h3 class="mt-2 text-2xl font-semibold text-foreground">Terminal retrô, composição contemporânea</h3>
              <p class="mt-4 leading-relaxed text-foreground-accent">Uma experiência editorial construída com Nuxt, mantendo a personalidade do terminal sem sacrificar clareza, responsividade e acessibilidade.</p>
              <a href="https://github.com/andrrms/novo-portfolio" target="_blank" rel="noopener noreferrer" class="mt-6 inline-flex items-center gap-2 font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                Ver código-fonte <Icon name="material-symbols:arrow-outward-rounded" size="1.2em" />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="competencias" class="mx-auto max-w-5xl scroll-mt-20 px-5 py-20 md:px-8 md:py-28">
      <p class="section-label">02 / Como eu trabalho</p>
      <h2 class="section-title max-w-2xl">Visão de produto com profundidade técnica.</h2>
      <div class="mt-10 grid gap-px overflow-hidden rounded-xl border border-foreground-muted/25 bg-foreground-muted/25 sm:grid-cols-2 lg:grid-cols-4">
        <article class="skill-card"><span>01</span><h3>Produto</h3><p>Decisões guiadas por negócio, usuário e manutenção.</p></article>
        <article class="skill-card"><span>02</span><h3>Front-end</h3><p>Interfaces rápidas, responsivas e acessíveis com Vue e Nuxt.</p></article>
        <article class="skill-card"><span>03</span><h3>Back-end</h3><p>APIs e integrações confiáveis com PHP, Laravel e SQL.</p></article>
        <article class="skill-card"><span>04</span><h3>Arquitetura</h3><p>Migração incremental e código preparado para evoluir.</p></article>
      </div>
    </section>

    <ExperienceSection />

    <section id="sobre" class="mx-auto grid max-w-5xl scroll-mt-20 gap-10 px-5 py-20 md:grid-cols-[0.75fr_1.25fr] md:px-8 md:py-28">
      <div>
        <p class="section-label">04 / Sobre</p>
        <h2 class="section-title">Código é meio. Clareza é o objetivo.</h2>
      </div>
      <div class="space-y-5 text-lg leading-relaxed text-foreground-accent">
        <p>Sou um desenvolvedor full-stack autodidata, baseado em Campo Grande, com foco especial em front-end, performance e arquitetura sustentável.</p>
        <p>No trabalho, atuo entre produto e engenharia: lidero melhorias, resolvo anomalias críticas, construo integrações e modernizo sistemas sem perder de vista quem usa e mantém cada fluxo.</p>
      </div>
    </section>

    <section id="contato" class="border-t border-foreground-muted/25 bg-primary text-background scroll-mt-20">
      <div class="mx-auto grid max-w-5xl gap-8 px-5 py-16 md:grid-cols-[1fr_auto] md:items-end md:px-8 md:py-20">
        <div>
          <p class="font-mono text-xs font-bold uppercase tracking-[0.18em] opacity-70">05 / Contato</p>
          <h2 class="mt-4 max-w-2xl text-4xl font-bold leading-tight tracking-[-0.04em] sm:text-5xl">Tem um problema difícil para simplificar?</h2>
        </div>
        <a href="mailto:pro.andresilveira@gmail.com" class="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-background px-5 font-semibold text-foreground transition-colors hover:bg-background-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-background">
          Vamos conversar <Icon name="material-symbols:arrow-outward-rounded" size="1.2em" />
        </a>
      </div>
    </section>

    <footer class="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-8 font-mono text-xs text-foreground-muted sm:flex-row sm:items-center sm:justify-between md:px-8">
      <p>© {{ new Date().getFullYear() }} André Silveira</p>
      <div class="flex gap-5">
        <a href="https://www.linkedin.com/in/andrrms" target="_blank" rel="noopener noreferrer" class="hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">LinkedIn</a>
        <a href="https://github.com/andrrms" target="_blank" rel="noopener noreferrer" class="hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">GitHub</a>
      </div>
    </footer>
  </main>
</template>
