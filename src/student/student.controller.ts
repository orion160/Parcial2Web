import { Controller, Post, Body, Param, Delete } from '@nestjs/common'
import { StudentService } from './student.service'
import { type CreateStudentDto } from './dto/create-student.dto'

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async crearEstudiante(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.crearEstudiante(createStudentDto)
  }

  @Delete(':id')
  async eliminarEstudiante(@Param('id') id: string) {
    return this.studentService.eliminarEstudiante(Number(id))
  }
}
