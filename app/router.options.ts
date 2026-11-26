import type { RouterConfig } from 'nuxt/schema';
import { START_LOCATION } from 'vue-router';

/**
 * Posição da âncora só na vertical. Com `el`, o vue-router também rola na horizontal, e durante a
 * view transition a página transborda pela largura da barra de rolagem: às vezes ela parava 15 px
 * para o lado.
 */
function hashPosition(hash: string) {
  const el = document.getElementById(hash.slice(1));
  if (!el) return false;
  const margin = Number.parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  return { left: 0, top: el.getBoundingClientRect().top + window.scrollY - margin };
}

/**
 * Igual ao padrão do Nuxt, mas a rolagem da página nova acontece no instante em que ela entra, e
 * não um quadro depois. A view transition fotografa a página nova nesse instante: rolando depois,
 * as partes do projeto chegavam no lugar errado e pulavam no fim.
 */
export default {
  scrollBehavior(to, from, savedPosition) {
    if (from === START_LOCATION) return to.hash ? hashPosition(to.hash) : false;
    if (to.path === from.path) return to.hash ? hashPosition(to.hash) : false;

    return new Promise((resolve) => {
      useNuxtApp().hooks.hookOnce('page:finish', () => {
        resolve(savedPosition ?? (to.hash ? hashPosition(to.hash) : { top: 0 }));
      });
    });
  },
} satisfies RouterConfig;
