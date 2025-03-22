import z from 'zod';

const envSchema = z.object({
  PORT: z.string(),
  DB_DRIVER: z.string(),
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_DATABASE: z.string(),
  DB_URI: z.string(),
  DB_AUTH_SOURCE: z.string(),
  DB_PASSWORD: z.string(),
  DB_PORT: z.string(),
  JWT_SECRET: z.string(),
  SALTS_PASSWORD: z.string().transform((val) => {
    const parsed = parseInt(val, 10);
    if (isNaN(parsed)) {
      throw new Error('SALTS_PASSWORD precisa ser um número');
    }
    return parsed;
  }),
});

export const env = envSchema.parse(process.env);
