import { StudentService } from './student.service'
import { EntityManager } from 'typeorm'
import { Student } from './entities/student.entity'

describe('StudentService', () => {
  let service: StudentService
  let mockEntityManager: {
    findOne: jest.Mock
    save: jest.Mock
    remove: jest.Mock
  }

  beforeEach(() => {
    mockEntityManager = {
      findOne: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    }
    service = new StudentService(mockEntityManager as unknown as EntityManager)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create student with valid pga and semester', async () => {
    const dto = {
      dni: 123456,
      name: 'Test',
      semester: 5,
      program: 'Engineering',
      pga: 3.5,
    }
    const savedStudent = { ...dto, id: 1 }
    mockEntityManager.save.mockResolvedValue(savedStudent)
    const result = await service.crearEstudiante(dto)
    expect(mockEntityManager.save).toHaveBeenCalled()
    expect(result).toEqual(savedStudent)
  })

  it('should throw if pga <= 3.2', async () => {
    const dto = {
      dni: 123456,
      name: 'Test',
      semester: 5,
      program: 'Engineering',
      pga: 3.0,
    }
    await expect(service.crearEstudiante(dto)).rejects.toThrow(
      'No se puede crear el estudiante',
    )
  })

  it('should throw if semester < 4', async () => {
    const dto = {
      dni: 123456,
      name: 'Test',
      semester: 2,
      program: 'Engineering',
      pga: 3.5,
    }
    await expect(service.crearEstudiante(dto)).rejects.toThrow(
      'No se puede crear el estudiante',
    )
  })

  it('should remove student if exists and has projects', async () => {
    const student = { id: 1, projects: [{}] } as Student
    mockEntityManager.findOne.mockResolvedValue(student)
    mockEntityManager.remove.mockResolvedValue(student)
    const result = await service.eliminarEstudiante(1)
    expect(mockEntityManager.findOne).toHaveBeenCalled()
    expect(mockEntityManager.remove).toHaveBeenCalledWith(student)
    expect(result).toEqual(student)
  })

  it('should throw if student does not exist', async () => {
    mockEntityManager.findOne.mockResolvedValue(null)
    await expect(service.eliminarEstudiante(1)).rejects.toThrow(
      'Estudiante no existe',
    )
  })

  it('should throw if student has no projects', async () => {
    const student = { id: 1, projects: [] } as unknown as Student
    mockEntityManager.findOne.mockResolvedValue(student)
    await expect(service.eliminarEstudiante(1)).rejects.toThrow(
      'El estudiante tiene proyectos asignados',
    )
  })
})
