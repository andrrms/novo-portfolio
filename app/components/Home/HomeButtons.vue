<script lang="ts" setup>
/**
 * Faixa de botões 88×31 de ponta a ponta da tela, rolando sem parar. Passar o mouse num deles pausa a faixa,
 * acinzenta os outros e aumenta um pouco o escolhido. Com movimento reduzido, a faixa
 * fica parada e rola na mão.
 */
const BUTTONS: { file: string; alt: string; href?: string }[] = [
  { file: 'asilveira.gif', alt: 'asilveira.com.br', href: '/' },
  { file: 'claude.gif', alt: 'Made with Claude', href: 'https://claude.ai' },
  { file: 't3code.gif', alt: 'T3 Code', href: 'https://t3.codes' },
  { file: 'email.gif', alt: 'Questions or comments? Mande um e-mail', href: 'mailto:pro.andresilveira@gmail.com' },
  { file: 'fedora.gif', alt: 'Powered by Fedora' },
  { file: 'portal.gif', alt: 'Portal' },
  { file: 'gnu-linux.gif', alt: 'Made on GNU/Linux' },
  { file: 'github.gif', alt: 'GitHub' },
  { file: 'cassette.gif', alt: 'Sounds better on cassette' },
  { file: 'javascript.gif', alt: 'JavaScript Now!' },
  { file: 'aperture-labs.gif', alt: 'Aperture Laboratories' },
  { file: 'php.gif', alt: 'PHP' },
  { file: 'hotmail.gif', alt: 'MSN Hotmail' },
  { file: 'css.gif', alt: 'Made with Cascading Style Sheets' },
  { file: 'save-walter-white.gif', alt: 'Save Walter White', href: 'http://www.savewalterwhite.com/' },
  { file: 'spotify.gif', alt: 'Spotify' },
  { file: 'nintendo-switch.png', alt: 'Nintendo Switch' },
  { file: 'winamp.gif', alt: 'Nullsoft Winamp' },
  { file: '1080p.gif', alt: '1920×1080, best 1080p' },
  { file: 'minecraft.gif', alt: 'Minecraft' },
  { file: '3ds.png', alt: 'Nintendo 3DS' },
  { file: 'dark-mode.gif', alt: 'Made for dark mode' },
  { file: 'say-no-to-web3.gif', alt: 'Keep the web free, say no to web3' },
  { file: 'antinft.gif', alt: 'This is an anti-NFT site' },
  { file: 'anybrowser.gif', alt: 'Any browser' },
];

// Cada volta precisa ser mais larga que a tela para o laço não mostrar buraco: 2 × 25 × 88px = 4.400px.
const LAP = [...BUTTONS, ...BUTTONS];
</script>

<template>
  <!--
    Foge da coluna de propósito e ocupa a largura toda, entre as hachuras.
    overflow-x: clip corta só nas laterais: o botão aumentado no hover pode passar da faixa.
  -->
  <div class="w-full overflow-x-clip border-b border-foreground-muted px-0!">
    <div class="marquee">
      <!-- A volta se repete uma vez para o laço não ter emenda; só a primeira lista conta para leitores de tela. -->
      <ul v-for="copy in 2" :key="copy" class="track" :aria-hidden="copy === 2 ? 'true' : undefined">
        <li v-for="(button, index) in LAP" :key="index" class="button" :aria-hidden="copy === 1 && index >= BUTTONS.length ? 'true' : undefined">
          <!-- Só a primeira aparição de cada botão entra na ordem do Tab. -->
          <component
            :is="button.href ? 'a' : 'span'"
            :href="button.href"
            :target="button.href?.startsWith('http') ? '_blank' : undefined"
            :rel="button.href?.startsWith('http') ? 'noopener noreferrer' : undefined"
            :tabindex="button.href && (copy === 2 || index >= BUTTONS.length) ? -1 : undefined"
            class="block"
          >
            <img :src="`/buttons/${button.file}`" :alt="copy === 1 && index < BUTTONS.length ? button.alt : ''" width="88" height="31" draggable="false">
          </component>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.marquee {
  display: flex;
  width: max-content;
  animation: scroll 154s linear infinite;
}

.marquee:hover,
.marquee:focus-within {
  animation-play-state: paused;
}

.track {
  display: flex;
}

.button {
  position: relative;
  transition: transform 150ms ease-out, filter 150ms ease-out;
}

.button a:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: -2px;
}

.button img {
  display: block;
  image-rendering: pixelated;
}

/* No hover, só o botão apontado fica em cores. */
.marquee:hover .button:not(:hover) {
  filter: grayscale(1) opacity(.55);
}

.marquee .button:hover {
  z-index: 1;
  transform: scale(1.25);
}

@keyframes scroll {
  to { transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
  .marquee {
    animation: none;
  }

  .marquee .track:last-child {
    display: none;
  }

  .button {
    transition: none;
  }
}
</style>
