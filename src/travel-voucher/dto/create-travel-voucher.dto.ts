import { z } from 'zod'

export const createTravelVoucherSchema = z
  .object({
    amount: z.number().positive().finite(),
    score: z.number().positive().finite(),
    code: z.string().trim().min(1).max(32),
    userId: z.number().positive().finite(),
    travelClassId: z.number().positive().finite(),
  })
  .required()
  .strict()

export type CreateTravelVoucherDto = z.infer<typeof createTravelVoucherSchema>
