import {z} from 'zod'

export const ApplicationSchema = z.object({
  _id: z.string(),
  approvedDate: z.string(),
  createdDate: z.string(),
  email: z.string(),
  orgName: z.string(),
  reason: z.string(),
  status: z.number()
})
export type Application = z.infer<typeof ApplicationSchema>


