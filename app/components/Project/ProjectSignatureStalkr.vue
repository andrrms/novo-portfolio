<template>
  <!-- Fundo do topo do Stalkr: as cores do app desfocadas, em duas camadas que giram em sentidos opostos. -->
  <div class="stalkr" aria-hidden="true">
    <div class="glow">
      <div class="layer layer-a" />
      <div class="layer layer-b" />
    </div>
    <div class="scrim" />
  </div>
</template>

<style scoped>
.stalkr {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: #0a0a0a;
}

/* Apagado, como no tema escuro do Stalkr: o texto por cima precisa de contraste. */
.glow {
  position: absolute;
  inset: 0;
  isolation: isolate;
  opacity: .6;
}

/* Violeta, magenta e pêssego, as cores do app. */
.layer {
  position: absolute;
  top: 50%;
  left: 50%;
  width: max(150%, 40rem);
  aspect-ratio: 1;
  translate: -50% -50%;
  background:
    radial-gradient(circle at 25% 28%, #6d5cff 0 38%, transparent 38.5%),
    radial-gradient(circle at 78% 32%, #e0479e 0 33%, transparent 33.5%),
    radial-gradient(circle at 53% 78%, #ff9a62 0 38%, transparent 38.5%);
  filter: blur(48px) saturate(1.6);
  will-change: transform;
  animation: spin 40s linear infinite;
}

.layer-b {
  width: max(110%, 30rem);
  opacity: .8;
  mix-blend-mode: soft-light;
  animation-duration: 28s;
  animation-direction: reverse;
}

/* Escurece a base, onde fica o texto, para ele manter o contraste sobre qualquer cor. */
.scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgb(10 10 10 / .8), transparent 70%);
}

@keyframes spin {
  to {
    rotate: 1turn;
  }
}

@media (prefers-reduced-motion: reduce) {
  .layer {
    animation: none;
  }
}
</style>
