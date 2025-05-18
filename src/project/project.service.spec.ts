import { EntityManager } from 'typeorm'
import { ProjectService } from './project.service'
import { Project } from './entities/project.entity'

describe('ProjectService', () => {
  let service: ProjectService
  let mockEntityManager: {
    findOne: jest.Mock
    find: jest.Mock
    save: jest.Mock
  }

  beforeEach(() => {
    mockEntityManager = {
      findOne: jest.fn(),
      find: jest.fn(),
      save: jest.fn(),
    }
    service = new ProjectService(mockEntityManager as unknown as EntityManager)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create project with valid title', async () => {
    const dto = {
      title: 'A valid project title',
      field: 'Science',
      budget: 1000,
      finalGrade: 5,
      state: 1,
      startDate: '2025-01-01',
      endDate: '2025-12-31',
    }
    const savedProject = { ...dto, id: 1 }
    mockEntityManager.save.mockResolvedValue(savedProject)
    const result = await service.crearProyecto(dto)
    expect(mockEntityManager.save).toHaveBeenCalled()
    expect(result).toEqual(savedProject)
  })

  it('should throw if project title is too short', async () => {
    const dto = {
      title: 'Short',
      field: 'Science',
      budget: 1000,
      finalGrade: 5,
      state: 1,
      startDate: '2025-01-01',
      endDate: '2025-12-31',
    }
    await expect(service.crearProyecto(dto)).rejects.toThrow(
      'El título del proyecto debe tener al menos 15 caracteres',
    )
  })

  it('should advance project state if project exists and not at max', async () => {
    const project = {
      id: 1,
      state: 1,
    } as Project
    mockEntityManager.findOne.mockResolvedValue(project)
    mockEntityManager.save.mockResolvedValue({ ...project, state: 2 })
    await service.avanzarProyecto(1)
    expect(mockEntityManager.findOne).toHaveBeenCalled()
    expect(mockEntityManager.save).toHaveBeenCalled()
  })

  it('should throw if project does not exist', async () => {
    mockEntityManager.findOne.mockResolvedValue(null)
    await expect(service.avanzarProyecto(1)).rejects.toThrow(
      'Proyecto no existe',
    )
  })

  it('should throw if project is at max state', async () => {
    const project = {
      id: 1,
      state: 3,
    } as Project
    mockEntityManager.findOne.mockResolvedValue(project)
    await expect(service.avanzarProyecto(1)).rejects.toThrow(
      'El proyecto esta en su maximo',
    )
  })

  it('should return students if project exists', async () => {
    const project = [{ id: 1, leader: { id: 2, name: 'Student' } }]
    mockEntityManager.find.mockResolvedValue(project)
    const result = await service.findAllEstudiantes(1)
    expect(mockEntityManager.find).toHaveBeenCalled()
    expect(result).toEqual(project)
  })

  it('should throw if project not found in findAllEstudiantes', async () => {
    mockEntityManager.find.mockResolvedValue(null)
    await expect(service.findAllEstudiantes(1)).rejects.toThrow(
      'No se encontró el proyecto',
    )
  })
})
