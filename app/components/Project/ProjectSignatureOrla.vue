<script lang="ts">
const DURATION = 7000;

// Relógio comum às capas da home e da página do projeto: na transição entre elas, os anéis não pulam.
let origin: number | undefined;
</script>

<script lang="ts" setup>
/*
 * Os anéis andam uns 2px por segundo. Uma animação CSS da fase recalcularia o estilo e repintaria
 * o gradiente a cada quadro (o navegador não passa isso para a GPU), mesmo com a capa fora da tela.
 * Dez passos por segundo dão o mesmo movimento, e só enquanto a capa aparece.
 */
const root = useTemplateRef<HTMLElement>('root');
const visible = useElementVisibility(root);
const motion = usePreferredReducedMotion();
const phase = ref(0);

const { pause, resume } = useIntervalFn(() => {
  origin ??= performance.now();
  phase.value = ((performance.now() - origin) % DURATION) / DURATION;
}, 100, { immediate: false, immediateCallback: true });

watchEffect(() => (visible.value && motion.value !== 'reduce' ? resume() : pause()));
</script>

<template>
  <!-- A guilhoche do Cédula, o design system do Orla, como no card principal do dashboard dele. -->
  <div ref="root" class="orla" :style="{ '--t': phase }" aria-hidden="true" />
</template>

<style scoped>
/*
 * Duas famílias de anéis finos que se afastam do centro sem parar. O que anda é o raio dos anéis,
 * de zero a exatamente um período (--t de 0 a 1), então o fim coincide com o começo. Os centros ficam
 * a uma distância fixa do meio da caixa, para as famílias se cruzarem no mesmo ângulo em qualquer proporção.
 */
.orla {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: #102225;
}

/* A máscara apaga a gravura à esquerda, onde fica o texto. */
.orla::before,
.orla::after {
  --periodo: 13.4px;
  --centro: calc(50% + 732px) calc(50% - 403px);
  --fase: calc(var(--t, 0) * var(--periodo));
  content: '';
  position: absolute;
  inset: 0;
  mask-image: linear-gradient(110deg, transparent 25%, black 70%);
  background: repeating-radial-gradient(
    circle at var(--centro),
    transparent var(--fase) calc(var(--fase) + var(--periodo) - 1px),
    rgb(121 228 240 / .16) calc(var(--fase) + var(--periodo) - 1px) calc(var(--fase) + var(--periodo))
  );
}

.orla::after {
  --periodo: 17.4px;
  --centro: calc(50% - 113px) calc(50% + 622px);
}
</style>
