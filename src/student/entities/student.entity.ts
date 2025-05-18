import { Project } from '../../project/entities/project.entity'
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from 'typeorm'

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id!: number
  @Column()
  dni!: number
  @Column()
  name!: string
  @Column()
  semester!: number
  @Column()
  program!: string
  @Column()
  pga!: number
  @OneToMany(() => Project, (project) => project.leader)
  projects!: Relation<Project[]>
  constructor(student: Partial<Student>) {
    Object.assign(this, student)
  }
}
