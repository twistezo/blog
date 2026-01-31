import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const postsCollection = defineCollection({
  loader: glob({ pattern: ['**/*.md', '**/*.mdx'], base: './src/content/posts' }),
  schema: () =>
    z.object({
      title: z.string(),
      published: z.coerce.date(),
      description: z.string().optional(),
      author: z.string().optional(),
      tags: z.array(z.string()).optional().default([]),
      toc: z.boolean().optional().default(true),
    }),
})

export const collections = {
  posts: postsCollection,
}
