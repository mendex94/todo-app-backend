import { z } from "zod";

export const authRequestDtoSchema = z.object({
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
});
