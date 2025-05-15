import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateProfessorDto } from './dto/create-professor.dto'
import { EntityManager } from 'typeorm'
import { Professor } from './entities/professor.entity'
import { Evaluation } from 'src/evaluation/entities/evaluation.entity'

@Injectable()
export class ProfessorService {
  constructor(private readonly entityManager: EntityManager) {}

  async crearProfesor(createProfessorDto: CreateProfessorDto) {
    if (createProfessorDto.extension.toString().length != 5) {
      throw new BadRequestException('Extension debe tener 5 digitos')
    }
    const professor = new Professor(createProfessorDto)
    return await this.entityManager.save(professor)
  }

  async asignarEvaluador(id: number) {
    const professor = await this.entityManager.findOne(Professor, {
      where: { id: id },
      relations: {
        evaluations: true,
      },
    })

    if (!professor) {
      throw new BadRequestException('Profesor no existe')
    }

    if (professor.evaluations.length >= 3) {
      throw new BadRequestException(
        'El profesor ya tiene 3 evaluaciones asignadas',
      )
    }

    const evaluation = new Evaluation({})
    // this.entityManager.save(evaluation)
    evaluation.professor = professor
    await this.entityManager.save(professor)
  }
}
