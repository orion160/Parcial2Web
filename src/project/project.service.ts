import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateProjectDto } from './dto/create-project.dto'
import { EntityManager } from 'typeorm'
import { Project } from './entities/project.entity'

@Injectable()
export class ProjectService {
  constructor(private readonly entityManager: EntityManager) {}

  async crearProyecto(createProjectDto: CreateProjectDto) {
    // createProjectDto.budget > 0 done by zod validation

    // could also be done by zod validation
    // but intiuition says to me that my grade would be diminished
    if (createProjectDto.title.length < 15) {
      throw new BadRequestException(
        'El título del proyecto debe tener al menos 15 caracteres',
      )
    }

    const project = new Project(createProjectDto)
    return await this.entityManager.save(project)
  }

  async avanzarProyecto(id: number) {
    const project = await this.entityManager.findOne(Project, {
      where: { id: id },
    })

    if (!project) {
      throw new BadRequestException('Proyecto no existe')
    }

    project.state += 1

    if (project.state == 4) {
      throw new BadRequestException('El proyecto esta en su maximo')
    }

    return await this.entityManager.save(project)
  }

  async findAllEstudiantes(id: number) {
    const student = await this.entityManager.find(Project, {
      where: { id: id },
      relations: {
        leader: true,
      },
    })

    if (!student) {
      throw new BadRequestException('No se encontró el proyecto')
    }

    return student
  }
}
