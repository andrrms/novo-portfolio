<template>
  <header class="sticky top-0 z-20 w-full border-b border-foreground-muted/25 bg-background/90 backdrop-blur-xl">
    <nav class="mx-auto flex min-h-16 max-w-5xl items-center justify-between gap-5 px-5 md:px-8" aria-label="Navegação principal">
      <NuxtLink to="/" class="font-mono text-lg font-extrabold text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
        /ASILVEIRA
      </NuxtLink>

      <div class="hidden items-center gap-6 text-sm text-foreground-accent sm:flex">
        <NuxtLink to="/#projetos" class="nav-link">Projetos</NuxtLink>
        <NuxtLink to="/#experiencia" class="nav-link">Experiência</NuxtLink>
        <NuxtLink to="/#sobre" class="nav-link">Sobre</NuxtLink>
        <NuxtLink to="/#contato" class="nav-link">Contato</NuxtLink>
      </div>

      <a href="https://github.com/andrrms" target="_blank" rel="noopener noreferrer" aria-label="GitHub de André Silveira" class="inline-flex min-h-10 items-center gap-2 rounded-md border border-foreground-muted/40 px-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
        <Icon name="mdi:github" size="1.35em" />
        <span class="hidden md:inline">GitHub</span>
      </a>
    </nav>
  </header>
</template>
