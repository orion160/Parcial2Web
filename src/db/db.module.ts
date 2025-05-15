import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'pg',
        port: 5432,
        database: 'postgres',
        username: 'postgres',
        password: 'password',
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
  ],
})
export class DbModule {}
