import { Injectable } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { Evaluation } from './entities/evaluation.entity'

@Injectable()
export class EvaluationService {
  constructor(private readonly entityManager: EntityManager) {}

  async crearEvaluacion() {
    const evaluation = new Evaluation({})
    return this.entityManager.save(evaluation)
  }
}
