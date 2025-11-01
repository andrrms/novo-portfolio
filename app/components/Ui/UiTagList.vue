<script lang="ts" setup>
interface Props {
	tags: string[];
	maxVisible?: number;
}

const props = withDefaults(defineProps<Props>(), {
	maxVisible: 3,
});

const isExpanded = ref(false);

const visibleTags = computed(() => {
  if (isExpanded.value || props.tags.length <= props.maxVisible) {
    return props.tags;
  }
  return props.tags.slice(0, props.maxVisible);
});

const remainingCount = computed(() => {
  return props.tags.length - props.maxVisible;
});

const showExpandButton = computed(() => {
  return !isExpanded.value && props.tags.length > props.maxVisible;
});

const expandTags = () => {
  isExpanded.value = true;
};
</script>

<template>
  <div v-if="tags && tags.length" class="flex flex-wrap gap-2 mt-2">
    <span
      v-for="(tag, index) in visibleTags"
      :key="index"
      class="bg-background-muted text-foreground-accent text-xs rounded-full px-2 py-1"
    >
      {{ tag }}
    </span>
    
    <button
      v-if="showExpandButton"
      @click="expandTags"
      class="bg-background-muted text-foreground-accent ring ring-inset ring-foreground-muted text-xs rounded-full px-2 py-1 hover:bg-background-muted/80 transition-colors cursor-pointer"
    >
      Ver outras {{ remainingCount }}
    </button>
  </div>
</template>
