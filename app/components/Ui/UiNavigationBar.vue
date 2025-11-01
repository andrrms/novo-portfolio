<script lang="ts" setup>
// const route = useRoute();
// const currentRoute = computed(() => route.path);
</script>

<template>
	<div class="w-full sticky top-0 z-20 bg-background">
		<div class="mt-2 bg-background border-y border-foreground-muted px-4 md:px-0">
			<nav class="max-w-3xl mx-auto border-x border-foreground-muted grid grid-cols-3">
				<NuxtLink to="/" class="text-lg font-mono font-extrabold text-primary ps-4 py-3">/ASILVEIRA</NuxtLink>
			
				<div class="flex justify-center items-center space-x-4 px-2 py-3">
					<!-- <NuxtLink
						to="/"
						class="font-mono font-medium text-foreground-muted hover:text-primary transition"
						active-class="text-primary underline"
					>Portfolio</NuxtLink>
					<NuxtLink
						to="/projects"
						class="font-mono font-medium text-foreground-muted hover:text-primary transition"
						active-class="text-primary underline"
					>Projetos</NuxtLink>
					<NuxtLink
						to="/blog"
						class="font-mono font-medium text-foreground-muted hover:text-primary transition"
						active-class="text-primary underline"
					>Blog</NuxtLink> -->
				</div>

				<div class="flex justify-end items-center">
					<a
						href="https://github.com/andrrms"
						target="_blank" rel="noopener noreferrer"
						class="h-full inline-flex items-center justify-center aspect-square font-mono font-medium border-l border-foreground-muted text-primary hover:text-foreground-muted transition"
					>
						<Icon name="mdi:github" size="1.8em" />
					</a>
					<!-- <button class="h-full inline-flex items-center justify-center aspect-square font-mono font-medium border-l border-foreground-muted text-primary hover:text-foreground-muted transition">
						<Icon name="material-symbols:dark-mode-outline-rounded" size="1.8em" />
					</button> -->
				</div>
			</nav>
		</div>
	</div>
</template>
