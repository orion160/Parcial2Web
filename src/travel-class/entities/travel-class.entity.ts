import { TravelVoucher } from 'src/travel-voucher/entities/travel-voucher.entity'
import { User } from 'src/user/entities/user.entity'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm'

@Entity()
export class TravelClass {
  @PrimaryGeneratedColumn()
  id!: number
  @Column()
  name!: string
  @Column()
  code!: string
  @Column()
  creditNumber!: number
  @ManyToOne(() => User, (user) => user.classes)
  user!: Relation<User>
  @OneToMany(() => TravelVoucher, (voucher) => voucher.travelClass)
  voucher!: Relation<TravelVoucher[]>
  constructor(travelClass: Partial<TravelClass>) {
    Object.assign(this, travelClass)
  }
}
