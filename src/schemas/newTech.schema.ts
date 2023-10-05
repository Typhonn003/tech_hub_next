import z from "zod";

export const newTechSchema = z.object({
  title: z
    .string()
    .nonempty({ message: "Nome obrigatório*" })
    .max(16, "Nome máximo de 16 caracteres"),
  status: z.enum(["Iniciante", "Intermediário", "Avançado"]),
});
