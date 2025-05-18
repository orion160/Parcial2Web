import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { ProjectService } from './project.service'
import { CreateProjectDto } from './dto/create-project.dto'

@Controller('project')
export default class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  // Not implemented validation with pipes or zod ;C though
  // It is only a simple @blatada da!
  @Post()
  async crearProyecto(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.crearProyecto(createProjectDto)
  }

  @Patch(':id/avanzar')
  async avanzarProyecto(@Param('id') id: string) {
    return this.projectService.avanzarProyecto(Number(id))
  }

  @Get(':id/estudiantes')
  async findAllEstudiantes(@Param('id') id: string) {
    return this.projectService.findAllEstudiantes(Number(id))
  }
}
