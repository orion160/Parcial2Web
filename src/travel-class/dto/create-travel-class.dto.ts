import { z } from 'zod'

export const createTravelClassSchema = z
  .object({
    name: z.string().trim().min(1).max(32),
    code: z.string().trim().min(10).max(32),
    creditNumber: z.number().positive().finite(),
  })
  .required()
  .strict()

export type CreateTravelClassDto = z.infer<typeof createTravelClassSchema>
