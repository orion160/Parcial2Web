import { z } from 'zod'

export const createStudentSchema = z
  .object({
    dni: z.number().positive().finite(),
    name: z.string().trim().min(1).max(32),
    semester: z.number().positive().finite(),
    program: z.string().trim().min(1).max(32),
    pga: z.number().positive().finite(),
  })
  .required()
  .strict()

export type CreateStudentDto = z.infer<typeof createStudentSchema>
