import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { TravelVoucherModule } from './travel-voucher/travel-voucher.module'
import { TravelClassModule } from './travel-class/travel-class.module'
import { DbModule } from './db/db.module'

@Module({
  imports: [UserModule, TravelVoucherModule, TravelClassModule, DbModule],
})
export class AppModule {}
