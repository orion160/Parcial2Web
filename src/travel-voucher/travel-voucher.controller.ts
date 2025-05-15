import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { TravelVoucherService } from './travel-voucher.service'
import { CreateTravelVoucherDto } from './dto/create-travel-voucher.dto'
import { UpdateTravelVoucherDto } from './dto/update-travel-voucher.dto'

@Controller('travel-voucher')
export class TravelVoucherController {
  constructor(private readonly travelVoucherService: TravelVoucherService) {}

  // @Post()
  // create(@Body() createTravelVoucherDto: CreateTravelVoucherDto) {
  //   return this.travelVoucherService.create(createTravelVoucherDto)
  // }

  // @Get()
  // findAll() {
  //   return this.travelVoucherService.findAll()
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.travelVoucherService.findOne(+id)
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateTravelVoucherDto: UpdateTravelVoucherDto,
  // ) {
  //   return this.travelVoucherService.update(+id, updateTravelVoucherDto)
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.travelVoucherService.remove(+id)
  // }
}
