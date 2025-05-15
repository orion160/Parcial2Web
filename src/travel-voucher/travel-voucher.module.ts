import { Module } from '@nestjs/common'
import { TravelVoucherService } from './travel-voucher.service'
import { TravelVoucherController } from './travel-voucher.controller'

@Module({
  controllers: [TravelVoucherController],
  providers: [TravelVoucherService],
})
export class TravelVoucherModule {}
