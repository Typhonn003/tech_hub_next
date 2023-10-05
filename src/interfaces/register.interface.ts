import { registerSchema } from "@/schemas";
import z from "zod";

export type RegisterData = z.infer<typeof registerSchema>;
