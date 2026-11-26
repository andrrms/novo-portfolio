<script lang="ts" setup>
import type { Position } from './ExperiencePosition.vue';

interface Company {
  name: string;
  website: string;
  logo: string;
  location?: string;
  current: boolean;
}

const props = defineProps<{
  company: Company;
  positions: Position[];
  /** Abre o primeiro cargo (o mais recente). */
  expandLatest?: boolean;
}>();

const totalTimeStr = computed(() => {
  if (props.positions.length === 0) {
    return '';
  }
  
  const startDate = props.positions[props.positions.length - 1]!.startDate;
  // positions vem do mais recente para o mais antigo: o fim é o do primeiro cargo.
  const endDate = props.company.current ? new Date().toISOString() : props.positions[0]!.endDate;

  return readableTimeStr(startDate, endDate);
});

const imageUrl = ref<string|null>(null);

const imageModules = import.meta.glob('~/assets/images/*.*{png,jpg,jpeg,svg,gif}', {
  eager: true,
  query: '?url',
  import: 'default',
});

function getProcessedImageUrl(logoPath: string) {
  const pathKey = `/assets/images/${logoPath}`;
  return imageModules[pathKey] as string || null;
}

onMounted(() => {
  imageUrl.value = getProcessedImageUrl(props.company.logo);
});
</script>

<template>
  <div class="flex items-center gap-3">
    <img v-if="imageUrl" draggable="false" :src="imageUrl" alt="" class="h-8 w-8 rounded-full border-2 border-foreground-muted select-none" />
    <!-- <NuxtImg draggable="false" src="/images/logo-catalise.jpg" alt="Logo Catálise Investimentos" class="h-8 w-8 rounded-full border-2 border-foreground-muted select-none" /> -->
    <div class="flex flex-col">
      <div class="flex items-center gap-3">
        <h3 class="text-lg font-medium">{{ company.name }}</h3>
        <UiChalkMark v-if="company.current" variant="circle" class="ms-1">
          <span class="bg-primary text-primary-foreground font-bold text-xs rounded-full px-1.5 py-0.5 select-none">Atualmente</span>
        </UiChalkMark>
      </div>
      <div class="flex items-center gap-2 text-xs text-foreground-accent">
        <span class="inline-flex items-center gap-1">
          <Icon name="material-symbols:location-on-outline-rounded" size="1.2em" />
          <span>{{ company.location }}</span>
        </span>
        <span>—</span>
        <span>{{ totalTimeStr }}</span>
      </div>
    </div>
  </div>
  
  <ul class="mt-5">
    <ExperiencePosition
      v-for="(position, index) in positions"
      :key="position.title"
      :position="position"
      :default-open="expandLatest && index === 0"
    />
  </ul>
</template>