import { TravelClass } from 'src/travel-class/entities/travel-class.entity'
import { User } from 'src/user/entities/user.entity'
import { Column, Entity, ManyToOne, PrimaryColumn, Relation } from 'typeorm'

@Entity()
export class TravelVoucher {
  @PrimaryColumn()
  id!: number
  @Column()
  amount!: number
  @Column('double precision')
  score!: number
  @Column()
  code!: string
  @ManyToOne(() => User, (user) => user.vouchers)
  user!: Relation<User>
  @ManyToOne(() => TravelClass, (travelClass) => travelClass.voucher)
  travelClass!: Relation<TravelClass>
  constructor(travelVoucher: Partial<TravelVoucher>) {
    Object.assign(this, travelVoucher)
  }
}
