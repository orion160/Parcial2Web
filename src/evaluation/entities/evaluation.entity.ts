import { Professor } from 'src/professor/entities/professor.entity'
import { Project } from 'src/project/entities/project.entity'
import { Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm'

@Entity()
export class Evaluation {
  @PrimaryGeneratedColumn()
  id!: number
  @ManyToOne(() => Project, (project) => project.evaluations)
  project!: Relation<Project>
  @ManyToOne(() => Professor, (professor) => professor.evaluations)
  professor!: Relation<Professor>
  constructor(evaluation: Partial<Evaluation>) {
    Object.assign(this, evaluation)
  }
}
