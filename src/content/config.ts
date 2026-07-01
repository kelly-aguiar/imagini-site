import { defineCollection, z } from 'astro:content';

const noticias = defineCollection({
  type: 'content',
  schema: z.object({
    titulo: z.string(),
    resumo: z.string(),
    data: z.coerce.date(),
    categoria: z.string().optional(),
    imagem: z.string().optional(),
    destaque: z.boolean().default(false),
  }),
});

export const collections = { noticias };
