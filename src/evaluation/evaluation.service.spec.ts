import { Test, TestingModule } from '@nestjs/testing'
import { EntityManager } from 'typeorm'
import { EvaluationService } from './evaluation.service'
import { Evaluation } from './entities/evaluation.entity'

describe('EvaluationService', () => {
  let service: EvaluationService
  let mockEntityManager: { save: jest.Mock }

  beforeEach(async () => {
    mockEntityManager = {
      save: jest.fn(),
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EvaluationService,
        { provide: EntityManager, useValue: mockEntityManager },
      ],
    }).compile()

    service = module.get<EvaluationService>(EvaluationService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create an evaluation', async () => {
    const savedEval = { id: 1 }
    mockEntityManager.save.mockResolvedValue(savedEval)
    const result = await service.crearEvaluacion()
    expect(mockEntityManager.save).toHaveBeenCalledWith(expect.any(Evaluation))
    expect(result).toBe(savedEval)
  })

  it('should throw if db fails', async () => {
    mockEntityManager.save.mockRejectedValue(new Error('DB error'))
    await expect(service.crearEvaluacion()).rejects.toThrow('DB error')
  })
})
