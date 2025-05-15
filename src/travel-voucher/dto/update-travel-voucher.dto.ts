import { z } from 'zod'

export const updateTravelVoucherSchema = z
  .object({
    amount: z.number().positive().finite(),
    score: z.number().positive().finite(),
    code: z.string().trim().min(1).max(32),
  })
  .partial()
  .strict()

export type UpdateTravelVoucherDto = z.infer<typeof updateTravelVoucherSchema>
