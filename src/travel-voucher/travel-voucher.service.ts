import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateTravelVoucherDto } from './dto/create-travel-voucher.dto'
import { UpdateTravelVoucherDto } from './dto/update-travel-voucher.dto'
import { EntityManager } from 'typeorm'
import { User } from 'src/user/entities/user.entity'
import { TravelVoucher } from './entities/travel-voucher.entity'

@Injectable()
export class TravelVoucherService {
  constructor(private readonly entityManager: EntityManager) {}

  async create(createTravelVoucherDto: CreateTravelVoucherDto) {
    const role = await this.entityManager.findOne(User, {
      select: {
        role: true,
      },
      where: {
        id: createTravelVoucherDto.userId,
      },
    })

    if (!role) {
      throw new NotFoundException(
        `User with id ${createTravelVoucherDto.userId} not found`,
      )
    }

    if (role.role !== 'Profesor') {
      throw new BadRequestException()
    }

    return await this.entityManager.save(createTravelVoucherDto)
  }

  async findAll() {
    return await this.entityManager.find(TravelVoucher)
  }

  async findAllByUser(userId: number) {
    return await this.entityManager.find(TravelVoucher, {
      where: {
        user: {
          id: userId,
        },
      },
    })
  }

  async findOneByCode(code: string) {
    return await this.entityManager.findOneBy(TravelVoucher, {
      code,
    })
  }

  async update(id: number, updateTravelVoucherDto: UpdateTravelVoucherDto) {
    const updatedVoucher = await this.entityManager.preload(TravelVoucher, {
      id,
      ...updateTravelVoucherDto,
    })

    if (!updatedVoucher) {
      throw new NotFoundException(`Voucher with id ${id} not found`)
    }

    return await this.entityManager.save(updatedVoucher)
  }

  async remove(id: number) {
    const voucher = await this.entityManager.findOne(TravelVoucher, {
      select: {
        score: true,
      },
      where: {
        id,
      },
    })

    if (!voucher) {
      throw new NotFoundException(`Voucher with id ${id} not found`)
    }

    if (voucher.score > 4) {
      throw new BadRequestException()
    }

    await this.entityManager.remove(voucher)
  }
}
