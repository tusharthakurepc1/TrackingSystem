import {z} from 'zod'

const UserSchema = z.object({
  _id: z.string(),
  organization_list: z.array(z.string()),
  isAdmin: z.boolean(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string(),
  dob: z.string(),
  doj: z.string()
})

export type User = z.infer<typeof UserSchema>
