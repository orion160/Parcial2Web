import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateStudentDto } from './dto/create-student.dto'
import { EntityManager } from 'typeorm'
import { Student } from './entities/student.entity'

@Injectable()
export class StudentService {
  constructor(private readonly entityManager: EntityManager) {}
  async crearEstudiante(createStudentDto: CreateStudentDto) {
    if (createStudentDto.pga <= 3.2 || createStudentDto.semester < 4) {
      throw new BadRequestException('No se puede crear el estudiante')
    }
    const student = new Student(createStudentDto)
    return await this.entityManager.save(student)
  }

  async eliminarEstudiante(id: number) {
    const student = await this.entityManager.findOne(Student, {
      where: { id: id },
      relations: {
        projects: true,
      },
    })

    if (!student) {
      throw new BadRequestException('Estudiante no existe')
    }

    if (student.projects.length != 0) {
      throw new BadRequestException('El estudiante tiene proyectos asignados')
    }

    return await this.entityManager.remove(student)
  }
}
