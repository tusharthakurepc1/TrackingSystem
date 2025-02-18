import {z} from 'zod'
import {OrganizationUser} from '../typings/common'

const OrganizationUserValidationSchema = z.object({
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
  doj: z.string({message: "Date of Joining is required"})
    .trim(),
  _orginizationName: z.string({message: "Select the organization"})
    .trim()
})

const OrganizationUserUpdateValidationSchema = z.object({
  email: z.string({message: "Email is required"})
    .email({message: "Not a valid Email"})
    .min(10, {message: "Email is too short"})
    .trim(),
  user: z.object({
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
      .trim()
  })
})

export {OrganizationUserValidationSchema, OrganizationUserUpdateValidationSchema};