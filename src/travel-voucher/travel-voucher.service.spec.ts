import { Test, TestingModule } from '@nestjs/testing'
import { TravelVoucherService } from './travel-voucher.service'

describe('TravelVoucherService', () => {
  let service: TravelVoucherService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TravelVoucherService],
    }).compile()

    service = module.get<TravelVoucherService>(TravelVoucherService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
