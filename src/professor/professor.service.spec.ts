import { Test, TestingModule } from '@nestjs/testing'
import { ProfessorService } from './professor.service'
import { EntityManager } from 'typeorm'
import { Professor } from './entities/professor.entity'
import { BadRequestException } from '@nestjs/common'

describe('ProfessorService', () => {
  let service: ProfessorService
  let mockEntityManager: { findOne: jest.Mock; save: jest.Mock }

  beforeEach(async () => {
    mockEntityManager = {
      findOne: jest.fn(),
      save: jest.fn(),
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfessorService,
        { provide: EntityManager, useValue: mockEntityManager },
      ],
    }).compile()
    service = module.get<ProfessorService>(ProfessorService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should assign evaluator if professor exists and has less than 3 evaluations', async () => {
    const professor = {
      id: 1,
      evaluations: [],
      dni: '',
      name: '',
      faculty: '',
      extension: '',
      user: undefined,
    } as unknown as Professor
    mockEntityManager.findOne.mockResolvedValue(professor)
    mockEntityManager.save.mockResolvedValue(professor)
    await service.asignarEvaluador(1)
    expect(mockEntityManager.findOne).toHaveBeenCalled()
    expect(mockEntityManager.save).toHaveBeenCalledWith(professor)
  })

  it('should throw if professor does not exist', async () => {
    mockEntityManager.findOne.mockResolvedValue(null)
    await expect(service.asignarEvaluador(1)).rejects.toThrow(
      BadRequestException,
    )
  })

  it('should throw if professor already has 3 evaluations', async () => {
    const professor = {
      id: 1,
      evaluations: [{}, {}, {}],
      dni: '',
      name: '',
      faculty: '',
      extension: '',
      user: undefined,
    } as unknown as Professor
    mockEntityManager.findOne.mockResolvedValue(professor)
    await expect(service.asignarEvaluador(1)).rejects.toThrow(
      'El profesor ya tiene 3 evaluaciones asignadas',
    )
  })

  it('should create professor with valid extension', async () => {
    const dto = {
      dni: 123456789,
      name: 'Test',
      faculty: 'Engineering',
      extension: 12345,
      peerReviewed: false,
    } satisfies {
      dni: number
      name: string
      faculty: string
      extension: number
      peerReviewed: boolean
    }
    const savedProfessor = { ...dto, id: 1 }
    mockEntityManager.save.mockResolvedValue(savedProfessor)
    const result = await service.crearProfesor(dto)
    expect(mockEntityManager.save).toHaveBeenCalled()
    expect(result).toEqual(savedProfessor)
  })

  it('should throw if extension is not 5 digits', async () => {
    const dto = {
      dni: 123456789,
      name: 'Test',
      faculty: 'Engineering',
      extension: 1234,
      peerReviewed: false,
    } satisfies {
      dni: number
      name: string
      faculty: string
      extension: number
      peerReviewed: boolean
    }
    await expect(service.crearProfesor(dto)).rejects.toThrow(
      'Extension debe tener 5 digitos',
    )
  })
})
