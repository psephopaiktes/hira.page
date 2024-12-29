import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      draft: z.boolean().optional(),
      redirect: z.string().optional(),
      cover: image()
        .default("./cover.png"),
      tags: z.array(z.string()),
    }),
});

const works = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      draft: z.boolean().optional(),
      url: z.string().optional(),
      priority: z.number().default(0),
      thumbnail: image()
        .default("./thumbnail.png"),
      cover: image()
        .default("./cover.png"),
      tags: z.array(z.string()),
    }),
});

export const collections = { blog, works };
