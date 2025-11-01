<script lang="ts" setup>
import { cva } from 'class-variance-authority';

defineOptions({
  inheritAttrs: false,
});

interface UiCardProps {
  variant?: "default" | "dotted" | "stripped";
  leak?: boolean;
  topBorder?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<UiCardProps>(), {
  variant: "default",
  leak: false,
  topBorder: false,
  as: "div",
});

const containerVariants = cva(
  "w-full border-b border-foreground-muted relative",
  {
    variants: {
      variant: {
        default: "bg-background",
        dotted: "bg-dotted",
        stripped: "bg-stripped",
      },
      topBorder: {
        true: "border-t",
      },
    },
    defaultVariants: {
      variant: "default",
      topBorder: false,
    },
  },
);
const containerClasses = computed(() => containerVariants({ variant: props.leak ? props.variant : "default", topBorder: props.topBorder }));

const innerContainerVariants = cva(
  "max-w-3xl mx-auto border-x border-foreground-muted",
  {
    variants: {
      variant: {
        default: "bg-background",
        dotted: "bg-dotted",
        stripped: "bg-stripped",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
const innerContainerClasses = computed(() => innerContainerVariants({ variant: props.variant }));
</script>

<template>
  <component :is="props.as" :class="containerClasses">
    <div :class="innerContainerClasses" v-bind="$attrs">
      <slot />
    </div>
  </component>
</template>
