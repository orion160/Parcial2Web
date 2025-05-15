import { Test, TestingModule } from '@nestjs/testing'
import { TravelClassService } from './travel-class.service'

describe('TravelClassService', () => {
  let service: TravelClassService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TravelClassService],
    }).compile()

    service = module.get<TravelClassService>(TravelClassService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
