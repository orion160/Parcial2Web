import { z } from 'zod'

export const createProjectSchema = z
  .object({
    title: z.string().trim().min(1).max(32), // Hmmmmmm ;D
    field: z.string().trim().min(1).max(32),
    budget: z.number().positive().finite(),
    finalGrade: z.number().positive().finite(),
    state: z.number().positive().finite(),
    startDate: z.string().trim().min(1).max(32),
    endDate: z.string().trim().min(1).max(32),
  })
  .required()
  .strict()

export type CreateProjectDto = z.infer<typeof createProjectSchema>
