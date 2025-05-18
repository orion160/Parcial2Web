import { Controller, Post, Body, Patch, Param } from '@nestjs/common'
import { ProfessorService } from './professor.service'
import { CreateProfessorDto } from './dto/create-professor.dto'

@Controller('professor')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @Post()
  async crearProfesor(@Body() createProfessorDto: CreateProfessorDto) {
    return this.professorService.crearProfesor(createProfessorDto)
  }

  @Patch(':id/asignar-evaluador')
  async asignarEvaluador(@Param('id') id: string) {
    return this.professorService.asignarEvaluador(Number(id))
  }
}
