import { z } from 'zod'

export const updateTravelClassSchema = z
  .object({
    name: z.string().trim().min(1).max(32),
    code: z.string().trim().min(10).max(32),
    creditNumber: z.number().positive().finite(),
  })
  .partial()
  .strict()

export type UpdateTravelClassDto = z.infer<typeof updateTravelClassSchema>
