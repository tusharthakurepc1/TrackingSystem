import {z} from 'zod'

export type Organization = {};


const OrganizationDataSchema = z.object({
  isActive: z.boolean(),
  name: z.string(),
  max_wfh: z.number(),
  userEmail: z.array(z.string()),
  admin: z.string()
})
export type OrganizationData = z.infer<typeof OrganizationDataSchema>