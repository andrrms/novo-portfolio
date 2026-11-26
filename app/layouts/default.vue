<template>
  <div class="flex flex-col items-center">
    <!-- Filtro de giz usado pelas anotações (UiChalkMark): borra o traço e abre falhas nele. -->
    <svg width="0" height="0" class="absolute" aria-hidden="true">
      <filter id="chalk" x="-10%" y="-60%" width="120%" height="220%">
        <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" result="displaced" />
        <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="1" seed="8" result="grain" />
        <feColorMatrix in="grain" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -2.2 1.5" result="holes" />
        <feComposite in="displaced" in2="holes" operator="in" />
      </filter>
    </svg>

    <UiNavigationBar />
    <main class="w-full">
      <slot />
    </main>
  </div>
</template>
