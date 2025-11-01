<script lang="ts" setup>
defineOptions({
  inheritAttrs: false,
});

interface UiCollapsibleCardProps {
  open?: boolean;
}

const props = withDefaults(defineProps<UiCollapsibleCardProps>(), {
  open: false,
});

const isOpen = defineModel<boolean>('open', { default: false });
const contentId = useId();
const triggerId = useId();

onMounted(() => {
  isOpen.value = props.open;
});

function toggle() {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <div class="w-full" v-bind="$attrs">
    <button
      :id="triggerId"
      type="button"
			class="cursor-pointer text-start grid grid-cols-[1fr_auto] items-center"
      :aria-expanded="isOpen"
      :aria-controls="contentId"
      @click="toggle"
    >
      <slot name="trigger" :is-open="isOpen" />
			<Icon name="material-symbols:expand-more" size="1.5em" class="transition-transform text-primary" :class="{ 'rotate-180': isOpen }" />
    </button>

    <div
      :id="contentId"
      role="region"
      :aria-labelledby="triggerId"
      :class="['collapsible-wrapper mt-3', { 'is-open': isOpen }]"
    >
      <div class="collapsible-content">
        <slot :is-open="isOpen" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.collapsible-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 200ms ease-in-out;
}

.collapsible-wrapper.is-open {
  grid-template-rows: 1fr;
}

.collapsible-content {
  overflow: hidden;
}
</style>
