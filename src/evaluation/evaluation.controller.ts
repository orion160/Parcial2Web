import { Controller, Post } from '@nestjs/common'
import { EvaluationService } from './evaluation.service'

@Controller('evaluation')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Post()
  async crearEvaluacion() {
    return this.evaluationService.crearEvaluacion()
  }
}
