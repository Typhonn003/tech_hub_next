import z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email obrigatório*" })
    .email({ message: "Email inválido*" }),
  password: z.string().nonempty({ message: "Senha obrigatória*" }),
});
