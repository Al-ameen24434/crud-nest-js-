import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from './database.service';

@Module({
  providers: [
    DatabaseService,
    {
      provide: 'DATABASE_URL',
      useFactory: (config: ConfigService) => config.get('DATABASE_URL'),
      inject: [ConfigService],
    },
  ],
  exports: [DatabaseService],
})
export class DatabaseModule {}
