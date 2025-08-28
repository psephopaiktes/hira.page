import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      draft: z.boolean().optional(),
      redirect: z.string().optional(),
      cover: image(),
      tags: z.array(z.string()),
      customCSS: z.string().optional(),
    }),
});

const works = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/works" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      draft: z.boolean().optional(),
      url: z.string().optional(),
      priority: z.number().default(0),
      thumbnail: image(),
      cover: image(),
      tags: z.array(z.string()),
    }),
});

export const collections = { blog, works };
