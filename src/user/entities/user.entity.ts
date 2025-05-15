import { TravelClass } from 'src/travel-class/entities/travel-class.entity'
import { TravelVoucher } from 'src/travel-voucher/entities/travel-voucher.entity'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number
  @Column()
  dni!: string
  @Column()
  name!: string
  @Column()
  extensionNumber!: number
  @Column()
  researchGroup!: string
  @Column()
  role!: 'Profesor' | 'Decana'
  @ManyToOne(() => User, (user) => user.employees, { nullable: true })
  boss!: Relation<User | null>
  @OneToMany(() => User, (user) => user.boss)
  employees!: Relation<User[]>
  @OneToMany(() => TravelVoucher, (voucher) => voucher.user)
  vouchers!: Relation<TravelVoucher[]>
  @OneToMany(() => TravelClass, (travelClass) => travelClass.user)
  classes!: Relation<TravelClass[]>
  constructor(user: Partial<User>) {
    Object.assign(this, user)
  }
}
