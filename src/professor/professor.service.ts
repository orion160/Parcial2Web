import { Injectable } from '@nestjs/common'
import { CreateProfessorDto } from './dto/create-professor.dto'
import { UpdateProfessorDto } from './dto/update-professor.dto'

@Injectable()
export class ProfessorService {
  async crearProfesor(createProfessorDto: CreateProfessorDto) {}
}
