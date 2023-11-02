import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    if (process.env.NODE_ENV === 'production') {
      return {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        synchronize: false,
        database: this.configService.get<string>('DB_NAME'),
        migrationsRun: true,
        autoLoadEntities: true,
        ssl: {
          rejectUnauthorized: false,
        },
      };
    } else {
      return {
        type: 'sqlite',
        synchronize: process.env.NODE_ENV === 'test',
        database: this.configService.get<string>('DB_NAME'),
        migrationsRun: true,
        autoLoadEntities: true,
      };
    }
  }
}
