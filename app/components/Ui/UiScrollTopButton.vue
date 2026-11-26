<script lang="ts" setup>
const { y } = useWindowScroll();

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const isVisible = computed(() => y.value > 200);
</script>

<template>
  <Transition name="scroll-button">
    <button
      v-if="isVisible"
      @click="scrollToTop"
      class="fixed flex items-center justify-center bottom-5 right-5 bg-background-muted text-foreground-accent border border-foreground-muted hover:bg-background hover:text-foreground p-3 rounded-full aspect-square transition-colors"
      aria-label="Voltar ao topo"
    >
      <Icon name="material-symbols:arrow-upward-rounded" size="1.5em" />
    </button>
  </Transition>
</template>

<style scoped>
.scroll-button-enter-active {
  transition: all 0.3s ease-out;
}

.scroll-button-leave-active {
  transition: all 0.2s ease-in;
}

.scroll-button-enter-from,
.scroll-button-leave-to {
  opacity: 0;
  transform: translateY(1rem);
}

.scroll-button-enter-to,
.scroll-button-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>