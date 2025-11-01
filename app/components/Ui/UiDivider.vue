<script lang="ts" setup>
const props = withDefaults(defineProps<{
  height?: string;
}>(), { height: '30px' });

const heightStyle = computed(() => {
  return props.height ? { height: props.height } : {};
});
</script>

<template>
  <UiCard variant="stripped" leak :style="heightStyle" />
</template>
