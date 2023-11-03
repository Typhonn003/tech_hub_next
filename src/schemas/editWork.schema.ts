import z from "zod";

export const editWorkSchema = z.object({
  title: z
    .string()
    .min(1, "Nome obrigatório*")
    .max(16, "Nome máximo de 16 caracteres"),
  description: z
    .string()
    .min(1, "Descrição obrigatória*")
    .max(200, "Descrição máxima de 200 caracteres"),
});
