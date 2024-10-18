import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email({
    message: "Invalid email format",
  }),
  password: z
    .string({
      message: "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    })
    .min(6)
    .max(100)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/),
  name: z
    .string({
      message: "Name must be at least 2 characters long",
    })
    .min(2),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
