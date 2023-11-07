import { z } from "zod";

export const newWorkSchema = z.object({
  title: z
    .string()
    .min(1, "Nome obrigatório*")
    .max(16, "Nome máximo de 16 caracteres"),
  description: z
    .string()
    .min(1, "Descrição obrigatória*")
    .max(200, "Descrição máxima de 200 caracteres"),
  deploy_url: z.string().min(1, "Url obrigatório*"),
});
