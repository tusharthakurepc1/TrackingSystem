import {z} from 'zod'
 
const OrganizationValidationSchema = z.object({
  name: z.string({required_error: "Organization name is required"})
  .trim()
  .min(5, {message: "Organization name is too small"})
  .max(100, {message: "Organization name is too long"}),
  max_wfh: z.string({required_error: "Work from home is required"}).trim()
})

export {OrganizationValidationSchema};