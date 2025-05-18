import { Module } from '@nestjs/common'
import { DbModule } from './db/db.module'
import { StudentModule } from './student/student.module'
import { EvaluationModule } from './evaluation/evaluation.module'
import { ProfessorModule } from './professor/professor.module'
import { ProjectModule } from './project/project.module'

@Module({
  imports: [
    DbModule,
    StudentModule,
    EvaluationModule,
    ProfessorModule,
    ProjectModule,
  ],
})
export class AppModule {}
