import { Injectable } from '@nestjs/common'
import { CreateProjectDto } from './dto/create-project.dto'
import { EntityManager } from 'typeorm'

@Injectable()
export class ProjectService {
  constructor(private readonly entityManager: EntityManager) {}

  async crearProyecto(createProfessorDto: CreateProjectDto) {
    if (createProfessorDto.extension.toString().length != 5) {
      throw new BadRequestException('Extension debe tener 5 digitos')
    }
    const professor = new Professor(createProfessorDto)
    return await this.entityManager.save(professor)
  }
}
