import { z } from 'zod';

const envSchema = z.object({
  VITE_GRAPHQL_URL: z.string().default('http://localhost:4000/graphql'),
});

const env = envSchema.parse(import.meta.env);

export const GRAPHQL_URL = env.VITE_GRAPHQL_URL;
