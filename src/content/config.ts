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
        .refine((img) => img.width >= 600, {
          message: "カバー画像は幅600ピクセル以上でなければなりません",
        })
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
        .refine((img) => img.width >= 600, {
          message: "サムネイル画像は幅600ピクセル以上でなければなりません",
        })
        .default("./thumbnail.png"),
      cover: image()
        .refine((img) => img.width >= 600, {
          message: "カバー画像は幅600ピクセル以上でなければなりません",
        })
        .default("./cover.png"),
      tags: z.array(z.string()),
    }),
});

export const collections = { blog, works };
