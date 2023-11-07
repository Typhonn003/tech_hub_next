import z from "zod";

export const newTechSchema = z.object({
  title: z
    .string()
    .min(1, "Nome obrigatório*")
    .max(16, "Nome máximo de 16 caracteres"),
  status: z.enum(["Iniciante", "Intermediário", "Avançado"]),
});
