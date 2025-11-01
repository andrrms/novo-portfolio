<script lang="ts" setup>
export interface Position {
  title: string;
  startDate: string;
  endDate?: string;
  responsibilities?: string[];
  tags?: string[];
  icon?: string;
}

const props = defineProps<{
  position: Position;
}>();
</script>

<template>
  <li class="flex gap-3 group">
    <div class="flex flex-col items-center">
      <div class="bg-background-muted rounded-sm p-1 inline-flex items-center justify-center h-fit">
        <Icon v-if="position.icon" :name="position.icon" size="1.4em" class="text-primary" />
        <Icon v-else name="material-symbols:code-rounded" size="1.4em" class="text-primary" />
      </div>
      <div class="w-px h-full bg-foreground-muted group-last:hidden"></div>
    </div>

    <ExperienceCollapsibleCard :position="props.position" />
  </li>
</template>