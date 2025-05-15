import { z } from 'zod'

export const createUserSchema = z
  .object({
    dni: z.string().trim().length(13),
    name: z.string().trim().min(1).max(32),
    extensionNumber: z.number().positive().finite(),
    researchGroup: z.string().trim().min(1).max(32),
    role: z.enum(['Profesor', 'Decana']),
  })
  .required()
  .strict()

export type CreateUserDto = z.infer<typeof createUserSchema>
