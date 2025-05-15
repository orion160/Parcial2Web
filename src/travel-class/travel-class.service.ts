import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateTravelClassDto } from './dto/create-travel-class.dto'
import { UpdateTravelClassDto } from './dto/update-travel-class.dto'
import { TravelClass } from './entities/travel-class.entity'
import { EntityManager } from 'typeorm'

@Injectable()
export class TravelClassService {
  constructor(private readonly entityManager: EntityManager) {}

  async create(createTravelClassDto: CreateTravelClassDto) {
    const travelClass = new TravelClass(createTravelClassDto)
    return this.entityManager.save(travelClass)
  }

  async findAll() {
    return await this.entityManager.find(TravelClass)
  }

  findOne(id: number) {
    return this.entityManager.findOneBy(TravelClass, {
      id,
    })
  }

  async update(id: number, updateTravelClassDto: UpdateTravelClassDto) {
    const travelClass = await this.entityManager.preload(TravelClass, {
      id,
      ...updateTravelClassDto,
    })

    if (!travelClass) {
      throw new NotFoundException(`Voucher with id ${id} not found`)
    }

    return await this.entityManager.save(travelClass)
  }

  remove(id: number) {
    return this.entityManager.delete(TravelClass, {
      id,
    })
  }
}
