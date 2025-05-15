import { Test, TestingModule } from '@nestjs/testing'
import { TravelVoucherController } from './travel-voucher.controller'
import { TravelVoucherService } from './travel-voucher.service'

describe('TravelVoucherController', () => {
  let controller: TravelVoucherController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TravelVoucherController],
      providers: [TravelVoucherService],
    }).compile()

    controller = module.get<TravelVoucherController>(TravelVoucherController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
