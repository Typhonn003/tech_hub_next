import z from "zod";

export const editProfileSchema = z.object({
  name: z
    .string()
    .min(1, "Nome obrigatório*")
    .min(5, "Nome mínimo de 5 caracteres")
    .max(30, "Nome máximo de 30 caracteres"),
  contact: z
    .string()
    .min(1, "Opção de contato obrigatório*")
    .min(10, "Pelo menos 10 caracteres")
    .max(50, "Máximo de 50 caracteres"),
});
