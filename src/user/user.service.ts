import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { EntityManager } from 'typeorm'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(private readonly entityManager: EntityManager) {}

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.role === 'Profesor') {
      if (
        !['TICSW', 'IMAGINE', 'COMIT'].includes(createUserDto.researchGroup)
      ) {
        throw new BadRequestException()
      }
    } else if (createUserDto.role === 'Decana') {
      if (createUserDto.extensionNumber.toString().length !== 6) {
        throw new BadRequestException()
      }
    }

    const user = new User(createUserDto)
    return await this.entityManager.save(user)
  }

  async findAll() {
    return await this.entityManager.find(User)
  }

  findOne(id: number) {
    return this.entityManager.findOneBy(User, {
      id,
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updatedProduct = await this.entityManager.preload(User, {
      id,
      ...updateUserDto,
    })

    if (!updatedProduct) {
      throw new NotFoundException(`User with id ${id} not found`)
    }

    return await this.entityManager.save(updatedProduct)
  }

  async remove(id: number) {
    const user = await this.entityManager.findOne(User, {
      where: { id },
      relations: {
        vouchers: true,
      },
    })

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`)
    }

    if (user.role == 'Decana') {
      throw new BadRequestException()
    }

    if (user.vouchers.length > 0) {
      throw new BadRequestException()
    }

    return this.entityManager.delete(User, {
      id,
    })
  }
}
