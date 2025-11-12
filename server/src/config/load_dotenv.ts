import z from "zod";

const envSchema = z.object({
  FRONTEND_URL: z.string().trim(),
  PORT: z
    .string()
    .trim()
    .refine(
      (PORT) => Number(PORT) > 1024 && Number(PORT) < 49151,
      "INVALID PORT NUMBER" 
    ) 
});

type ENV = z.infer<typeof envSchema>;

const Env: ENV = envSchema.parse(process.env);

export default Env;
