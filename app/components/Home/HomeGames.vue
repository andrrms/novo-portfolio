<script lang="ts" setup>
/**
 * Jogos favoritos, em capas verticais como as da Steam. Os favoritos levam um adesivo de estrela
 * e o favorito de todos, também um círculo de giz. Passar o mouse numa capa acinzenta as outras.
 */
type Favorite = 'favorite' | 'all-time';

const GAMES: { slug: string; name: string; href: string; favorite?: Favorite }[] = [
  { slug: 'portal-2', name: 'Portal 2', href: 'https://store.steampowered.com/app/620', favorite: 'all-time' },
  { slug: 'minecraft', name: 'Minecraft', href: 'https://www.minecraft.net', favorite: 'favorite' },
  { slug: 'league-of-legends', name: 'League of Legends', href: 'https://www.leagueoflegends.com', favorite: 'favorite' },
  { slug: 'life-is-strange', name: 'Life is Strange', href: 'https://store.steampowered.com/app/319630', favorite: 'favorite' },
  { slug: 'overwatch', name: 'Overwatch', href: 'https://store.steampowered.com/app/2357570' },
  { slug: 'dead-by-daylight', name: 'Dead by Daylight', href: 'https://store.steampowered.com/app/381210' },
  { slug: 'superliminal', name: 'Superliminal', href: 'https://store.steampowered.com/app/1049410' },
  { slug: 'stanley-parable', name: 'The Stanley Parable: Ultra Deluxe', href: 'https://store.steampowered.com/app/1703340' },
  { slug: 'big-walk', name: 'Big Walk', href: 'https://store.steampowered.com/app/1478500' },
  { slug: 'civilization-vi', name: 'Civilization VI', href: 'https://store.steampowered.com/app/289070' },
  { slug: 'balatro', name: 'Balatro', href: 'https://store.steampowered.com/app/2379780' },
  { slug: 'euro-truck-simulator-2', name: 'Euro Truck Simulator 2', href: 'https://store.steampowered.com/app/227300' },
  { slug: 'sayonara-wild-hearts', name: 'Sayonara Wild Hearts', href: 'https://store.steampowered.com/app/1122720' },
  { slug: 'fez', name: 'FEZ', href: 'https://store.steampowered.com/app/224760' },
  { slug: 'battleblock-theater', name: 'BattleBlock Theater', href: 'https://store.steampowered.com/app/238460' },
  { slug: 'bioshock-infinite', name: 'BioShock Infinite', href: 'https://store.steampowered.com/app/8870' },
];

const FAVORITE_LABEL: Record<Favorite, string> = {
  'favorite': 'favorito',
  'all-time': 'favorito de todos',
};

// Onde cada adesivo de estrela foi colado: variado à mão para parecer aleatório,
// mas fixo, para não mudar a cada visita nem divergir entre servidor e navegador.
const STAR_SPOTS: Record<string, Record<string, string>> = {
  'portal-2': { 'top': '-9px', 'right': '-7px', '--rotate': '14deg' },
  'minecraft': { 'bottom': '-8px', 'left': '-9px', '--rotate': '-18deg' },
  'league-of-legends': { 'top': '38%', 'right': '-10px', '--rotate': '6deg' },
  'life-is-strange': { 'top': '-8px', 'left': '-8px', '--rotate': '-9deg' },
};
</script>

<template>
  <UiSection title="Jogos">
    <ul class="games grid grid-cols-4 gap-3 p-4 sm:grid-cols-8">
      <li v-for="game in GAMES" :key="game.slug" class="game">
        <a
          :href="game.href"
          target="_blank"
          rel="noopener noreferrer"
          class="cover"
          :aria-label="game.favorite ? `${game.name} (${FAVORITE_LABEL[game.favorite]})` : game.name"
        >
          <img :src="`/games/${game.slug}.webp`" alt="" width="200" height="300" loading="lazy" draggable="false">
        </a>

        <!-- Círculo de giz no favorito de todos; adesivo de estrela nos favoritos. -->
        <svg v-if="game.favorite === 'all-time'" class="chalk circle" viewBox="0 0 100 150" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M50 4 C 82 2, 98 30, 97 74 C 96 120, 80 147, 48 146 C 16 145, 3 118, 4 72 C 5 30, 20 5, 58 7"
            filter="url(#chalk)"
            vector-effect="non-scaling-stroke"
          />
        </svg>
        <svg v-if="game.favorite" class="star" :style="STAR_SPOTS[game.slug]" viewBox="-3 -3 30 30" aria-hidden="true">
          <path d="M12 1.5 L15 8.4 L22.5 9.1 L16.8 14 L18.5 21.5 L12 17.6 L5.5 21.5 L7.2 14 L1.5 9.1 L9 8.4 Z" />
        </svg>
      </li>
    </ul>
  </UiSection>
</template>

<style scoped>
.game {
  position: relative;
  transition: filter 150ms ease-out;
}

/* Capa, círculo e estrela sobem juntos; translate separado para não brigar com o rotate da estrela. */
.game > * {
  transition: translate 150ms ease-out;
}

.cover {
  display: block;
  border-radius: 4px;
}

.cover img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 2 / 3;
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgb(255 255 255 / .12), 0 6px 12px -6px rgb(5 10 60 / .6);
}

.cover:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 3px;
}

/* No hover, só a capa apontada (com as anotações dela) fica em cores. */
.games:hover .game:not(:hover) {
  filter: grayscale(1) opacity(.55);
}

.game:hover > * {
  translate: 0 -4px;
}

.chalk {
  position: absolute;
  pointer-events: none;
  overflow: visible;
  fill: none;
  stroke: var(--color-foreground);
  stroke-linecap: round;
  stroke-linejoin: round;
}

.circle {
  inset: -7px -6px;
  width: calc(100% + 12px);
  height: calc(100% + 14px);
  stroke-width: 4;
}

/* Adesivo: estrela recortada com borda branca, sem sombra, colada na capa. */
.star {
  position: absolute;
  width: 22px;
  height: 22px;
  overflow: visible;
  pointer-events: none;
  fill: #F5B700;
  stroke: #fff;
  stroke-width: 3.5px;
  stroke-linejoin: round;
  paint-order: stroke;
  transform: rotate(var(--rotate));
  filter: drop-shadow(0 1px 0 rgb(10 16 80 / .3));
}

@media (prefers-reduced-motion: reduce) {
  .game,
  .game > * {
    transition: none;
  }
}
</style>
