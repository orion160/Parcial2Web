import { Evaluation } from 'src/evaluation/entities/evaluation.entity'
import { Project } from 'src/project/entities/project.entity'
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm'

@Entity()
export class Professor {
  @PrimaryGeneratedColumn()
  id!: number
  @Column()
  dni!: number
  @Column()
  name!: string
  @Column()
  faculty!: string
  @Column()
  extension!: number
  @Column()
  peerReviewed!: boolean
  @OneToMany(() => Project, (project) => project.evaluations)
  mentorings!: Relation<Project[]>
  @OneToMany(() => Evaluation, (evaluation) => evaluation.professor)
  evaluations!: Relation<Evaluation[]>
  constructor(professor: Partial<Professor>) {
    Object.assign(this, professor)
  }
}
