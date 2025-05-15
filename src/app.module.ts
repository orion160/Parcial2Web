import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { TravelVoucherModule } from './travel-voucher/travel-voucher.module'
import { TravelClassModule } from './travel-class/travel-class.module'
import { DbModule } from './db/db.module'
import { StudentModule } from './student/student.module'
import { EvaluationModule } from './evaluation/evaluation.module'
import { ProfessorModule } from './professor/professor.module'
import { ProjectModule } from './project/project.module'

@Module({
  imports: [
    UserModule,
    TravelVoucherModule,
    TravelClassModule,
    DbModule,
    StudentModule,
    EvaluationModule,
    ProfessorModule,
    ProjectModule,
  ],
})
export class AppModule {}
