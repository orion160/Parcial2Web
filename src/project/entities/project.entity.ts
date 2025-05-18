import { Evaluation } from '../../evaluation/entities/evaluation.entity'
import { Professor } from '../../professor/entities/professor.entity'
import { Student } from '../../student/entities/student.entity'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from 'typeorm'

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id!: number
  @Column()
  title!: string
  @Column()
  field!: string
  @Column()
  budget!: number
  @Column()
  finalGrade!: number
  @Column()
  state!: number
  @Column()
  startDate!: string
  @Column()
  endDate!: string
  @ManyToOne(() => Student, (student) => student.projects)
  leader!: Relation<Student>
  @OneToMany(() => Professor, (professor) => professor.mentorings)
  mentor!: Relation<Project>
  @OneToMany(() => Evaluation, (evaluation) => evaluation.project)
  evaluations!: Relation<Evaluation[]>
  constructor(project: Partial<Project>) {
    Object.assign(this, project)
  }
}
