import { defineContentConfig, defineCollection, z } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: {
        include: '**/*.md',
        exclude: ['projetos/**'],
      },
    }),
    // Cada arquivo vira um card na home e a página /projetos/<arquivo>.
    projetos: defineCollection({
      type: 'page',
      source: 'projetos/*.md',
      schema: z.object({
        host: z.string(),
        tags: z.array(z.string()),
        order: z.number(),
      }),
    }),
  },
});
