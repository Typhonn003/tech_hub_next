import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty({ message: "Nome obrigatório*" })
      .min(5, "Nome mínimo de 5 caracteres")
      .max(30, "Nome máximo de 30 caracteres"),
    email: z
      .string()
      .nonempty({ message: "Email obrigatório*" })
      .email({ message: "Email inválido*" }),
    password: z
      .string()
      .nonempty({ message: "Senha obrigatória*" })
      .regex(/(?=.*?[A-Z])/, "Precisa ter uma letra maiúscula")
      .regex(/(?=.*?[a-z])/, "Precisa ter uma letra minúscula")
      .regex(/(?=.*?[0-9])/, "Precisa conter um número")
      .regex(/(?=.*?[#?!@$%^&*-])/, "Precisa ter um caractere especial")
      .min(8, "Tamanho mínimo de 8 caracteres"),
    confirm_password: z
      .string()
      .nonempty({ message: "Confirmação de senha obrigatória*" }),
    bio: z
      .string()
      .nonempty("Descrição obrigatória*")
      .min(10, "Pelo menos 10 caracteres")
      .max(50, "Máximo de 50 caracteres"),
    contact: z
      .string()
      .nonempty("Opção de contato obrigatório*")
      .min(10, "Pelo menos 10 caracteres")
      .max(50, "Máximo de 50 caracteres"),
    course_module: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "As senhas precisam ser iguais",
  });
