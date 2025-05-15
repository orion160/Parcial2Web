import { z } from 'zod'

export const createProfessorSchema = z
  .object({
    dni: z.number().positive().finite(),
    name: z.string().trim().min(1).max(32),
    faculty: z.string().trim().min(1).max(32),
    extension: z.number().positive().finite(),
    peerReviewed: z.boolean(),
  })
  .required()
  .strict()

export type CreateProfessorDto = z.infer<typeof createProfessorSchema>
