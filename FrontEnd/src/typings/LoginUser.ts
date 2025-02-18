import {z} from 'zod';

const LoginUserSchema = z.object({
  email: z.string(),
  password: z.string(),
  otp: z.string()
})

export type LoginUser = z.infer<typeof LoginUserSchema>
