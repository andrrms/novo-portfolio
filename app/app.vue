<script lang="ts" setup>
// Aqui e não no nuxt.config: lá o template precisa ser serializável, e a home não tem título próprio.
useHead({ titleTemplate: title => (title ? `${title} · André Silveira` : 'André Silveira') });
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
      <UiScrollTopButton />
    </NuxtLayout>
  </div>
</template>
