import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { TravelClassService } from './travel-class.service'
import { CreateTravelClassDto } from './dto/create-travel-class.dto'
import { UpdateTravelClassDto } from './dto/update-travel-class.dto'

@Controller('travel-class')
export class TravelClassController {
  constructor(private readonly travelClassService: TravelClassService) {}

  // @Post()
  // create(@Body() createTravelClassDto: CreateTravelClassDto) {
  //   return this.travelClassService.create(createTravelClassDto)
  // }

  // @Get()
  // findAll() {
  //   return this.travelClassService.findAll()
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.travelClassService.findOne(+id)
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateTravelClassDto: UpdateTravelClassDto,
  // ) {
  //   return this.travelClassService.update(+id, updateTravelClassDto)
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.travelClassService.remove(+id)
  // }
}
