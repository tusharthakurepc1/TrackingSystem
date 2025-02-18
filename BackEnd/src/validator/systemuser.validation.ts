import {z} from 'zod'

const SystemUserValidationSchema = z.object({
  firstName: z.string({message: "First Name is required"})
    .trim()
    .min(2, {message: "Firstname is too short"}),
  lastName: z.string({message: "Last Name is required"})
    .trim(),
  email: z.string({message: "Email is required"})
    .email({message: "Not a valid Email"})
    .min(10, {message: "Email is too short"})
    .trim(),
  dob: z.string({message: "Date of Birth is required"})
    .trim(),
})

export {SystemUserValidationSchema};