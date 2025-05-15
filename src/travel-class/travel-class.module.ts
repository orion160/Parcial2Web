import { Module } from '@nestjs/common'
import { TravelClassService } from './travel-class.service'
import { TravelClassController } from './travel-class.controller'

@Module({
  controllers: [TravelClassController],
  providers: [TravelClassService],
})
export class TravelClassModule {}
