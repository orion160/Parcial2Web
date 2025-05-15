import { Test, TestingModule } from '@nestjs/testing'
import { TravelClassController } from './travel-class.controller'
import { TravelClassService } from './travel-class.service'

describe('TravelClassController', () => {
  let controller: TravelClassController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TravelClassController],
      providers: [TravelClassService],
    }).compile()

    controller = module.get<TravelClassController>(TravelClassController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
