import { z } from "zod";

const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Email has to be valid."),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(32, { message: "Password can be up to 32 characters long." })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/\d/, { message: "Password must contain at least one digit." })
    .regex(/[^a-zA-Z0-9]/, {
      message:
        "Password must contain at least one special character (e.g., !@#$%^&*).",
    }),
});

const signUpSchema = signInSchema
  .extend({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .max(32, { message: "Name can be up to 32 characters long." }),
    lastName: z
      .string()
      .min(1, { message: "Last name is required" })
      .max(32, { message: "Last name can be up to 32 characters long." }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

type SignInSchemaType = z.infer<typeof signInSchema>;
type SignUpSchemaType = z.infer<typeof signUpSchema>;

export { signInSchema, signUpSchema };
export type { SignInSchemaType, SignUpSchemaType };
