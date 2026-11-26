<template>
  <!-- A guilhoche do Cédula, o design system do Orla, como no card principal do dashboard dele. -->
  <div class="orla" aria-hidden="true" />
</template>

<style scoped>
/*
 * Duas famílias de anéis finos que se afastam do centro sem parar. O que anda é o raio dos anéis,
 * de zero a exatamente um período, então o fim coincide com o começo. Os centros ficam a uma
 * distância fixa do meio da caixa, para as famílias se cruzarem no mesmo ângulo em qualquer proporção.
 */
@property --fase {
  syntax: '<length>';
  inherits: false;
  initial-value: 0px;
}

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
  content: '';
  position: absolute;
  inset: 0;
  mask-image: linear-gradient(110deg, transparent 25%, black 70%);
  background: repeating-radial-gradient(
    circle at var(--centro),
    transparent var(--fase) calc(var(--fase) + var(--periodo) - 1px),
    rgb(121 228 240 / .16) calc(var(--fase) + var(--periodo) - 1px) calc(var(--fase) + var(--periodo))
  );
  animation: rings 7s linear infinite;
}

.orla::after {
  --periodo: 17.4px;
  --centro: calc(50% - 113px) calc(50% + 622px);
}

@keyframes rings {
  to {
    --fase: var(--periodo);
  }
}

@media (prefers-reduced-motion: reduce) {
  .orla::before,
  .orla::after {
    animation: none;
  }
}
</style>
