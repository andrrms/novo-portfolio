<script lang="ts" setup>
/**
 * Faixa de botões 88×31 de ponta a ponta da tela, rolando sem parar. Passar o mouse num deles pausa a faixa,
 * acinzenta os outros e aumenta um pouco o escolhido. Com movimento reduzido, a faixa
 * fica parada e rola na mão.
 *
 * De madrugada, num computador, o botão "dark mode" (`lamp`) solta a cordinha da luminária (useLamp).
 * Enquanto a cordinha não desce, ele pisca como neon e ganha um "psst!" pichado em cima.
 */
const BUTTONS: { file: string; alt: string; href?: string; lamp?: true }[] = [
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
  { file: 'spotify.gif', alt: 'Spotify', href: 'https://open.spotify.com/user/andre_silveira07' },
  { file: 'nintendo-switch.png', alt: 'Nintendo Switch' },
  { file: 'winamp.gif', alt: 'Nullsoft Winamp' },
  { file: '1080p.gif', alt: '1920×1080, best 1080p' },
  { file: 'minecraft.gif', alt: 'Minecraft' },
  { file: '3ds.png', alt: 'Nintendo 3DS' },
  { file: 'dark-mode.gif', alt: 'Made for dark mode', lamp: true },
  { file: 'say-no-to-web3.gif', alt: 'Keep the web free, say no to web3' },
  { file: 'antinft.gif', alt: 'This is an anti-NFT site' },
  { file: 'anybrowser.gif', alt: 'Any browser' },
];

// Cada volta precisa ser mais larga que a tela para o laço não mostrar buraco: 2 × 25 × 88px = 4.400px.
const LAP = [...BUTTONS, ...BUTTONS];

const { cord } = useLamp();
// Decidido depois de montar: depende da hora e do aparelho de quem visita, e o servidor não sabe.
// Conferido de novo a cada minuto para acender à meia-noite com a página aberta.
const awake = ref(false);
onMounted(() => {
  awake.value = isLampAwake();
});
const visibility = useDocumentVisibility();
useIntervalFn(() => {
  if (visibility.value === 'visible') awake.value = isLampAwake();
}, 60_000);

function kind(button: typeof BUTTONS[number]) {
  // Com a cordinha descida, o botão continua funcionando depois das 5h para dar para recolher.
  if (button.lamp && (awake.value || cord.value)) return 'button';
  return button.href ? 'a' : 'span';
}

function onClick(button: typeof BUTTONS[number]) {
  if (kind(button) === 'button') cord.value = !cord.value;
}
</script>

<template>
  <!--
    Foge da coluna de propósito e ocupa a largura toda, entre as hachuras.
    overflow-x: clip corta só nas laterais: o botão aumentado no hover pode passar da faixa.
    O z-10 põe a faixa acima da hachura seguinte, que é posicionada e cobriria a parte de baixo do botão.
  -->
  <div class="relative z-10 w-full overflow-x-clip border-b border-foreground-muted px-0!">
    <div class="marquee">
      <!-- A volta se repete uma vez para o laço não ter emenda; só a primeira lista conta para leitores de tela. -->
      <ul v-for="copy in 2" :key="copy" class="track" :aria-hidden="copy === 2 ? 'true' : undefined">
        <li
          v-for="(button, index) in LAP"
          :key="index"
          class="button"
          :class="{ calling: kind(button) === 'button' && !cord }"
          :aria-hidden="copy === 1 && index >= BUTTONS.length ? 'true' : undefined"
        >
          <!-- Só a primeira aparição de cada botão entra na ordem do Tab. -->
          <component
            :is="kind(button)"
            :href="button.href"
            :target="button.href?.startsWith('http') ? '_blank' : undefined"
            :rel="button.href?.startsWith('http') ? 'noopener noreferrer' : undefined"
            :tabindex="kind(button) !== 'span' && (copy === 2 || index >= BUTTONS.length) ? -1 : undefined"
            :type="kind(button) === 'button' ? 'button' : undefined"
            :aria-pressed="kind(button) === 'button' ? cord : undefined"
            class="block"
            :class="{ 'cursor-pointer': kind(button) === 'button' }"
            @click="onClick(button)"
          >
            <img :src="`/buttons/${button.file}`" :alt="copy === 1 && index < BUTTONS.length ? button.alt : ''" width="88" height="31" draggable="false">
          </component>
          <span v-if="kind(button) === 'button' && !cord" class="psst" aria-hidden="true">psst!</span>
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

.button :is(a, button):focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: -2px;
}

.button img {
  display: block;
  image-rendering: pixelated;
}

/* O botão da luminária chamando: neon rosa que falha de vez em quando, como letreiro velho. */
.calling {
  z-index: 1;
}

.calling img {
  box-shadow: 0 0 0 1px var(--color-uv-pink), 0 0 12px var(--color-uv-pink);
  animation: neon 3.2s steps(1) infinite;
}

@keyframes neon {
  0%, 100% { box-shadow: 0 0 0 1px var(--color-uv-pink), 0 0 12px var(--color-uv-pink); }
  62% { box-shadow: none; }
  64% { box-shadow: 0 0 0 1px var(--color-uv-pink), 0 0 12px var(--color-uv-pink); }
  67% { box-shadow: none; }
  69% { box-shadow: 0 0 0 1px var(--color-uv-pink), 0 0 12px var(--color-uv-pink); }
}

.psst {
  position: absolute;
  bottom: calc(100% + 2px);
  left: 50%;
  translate: -50% 0;
  rotate: -8deg;
  font: 400 17px var(--font-marker);
  color: var(--color-uv-yellow);
  text-shadow: 0 1px 0 var(--color-uv-ink), 0 0 8px rgb(255 233 74 / .6);
  white-space: nowrap;
  pointer-events: none;
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

  .calling img {
    animation: none;
  }
}
</style>
