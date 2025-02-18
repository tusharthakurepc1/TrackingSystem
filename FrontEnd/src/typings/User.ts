import { z } from 'zod';
import {ApplicationSchema} from './Applications'

const UserSchema = z.object({
  _id: z.string(),
  name: z.string(),
  userEmail: z.array(z.string()),
  max_wfh: z.number(),
  admin: z.string(),
  email: z.string(),
  application: z.array(ApplicationSchema)
})

export type User = z.infer<typeof UserSchema>
