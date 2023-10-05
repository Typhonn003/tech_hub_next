import { loginSchema } from "@/schemas";
import z from "zod";

export type LoginData = z.infer<typeof loginSchema>;
