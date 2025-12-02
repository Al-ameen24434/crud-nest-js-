import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from 'generated/prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neon } from '@neondatabase/serverless';

@Injectable()
export class DatabaseService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private config: ConfigService) {
    // read env via ConfigService to be safe
    const url = config.get<string>('DATABASE_URL');

    if (!url) {
      console.error('DATABASE_URL is missing! config.get returned undefined.');
      throw new Error('DATABASE_URL is missing from environment');
    }

    console.log(
      'Using DATABASE_URL:',
      url.replace(/(:\/\/.+?:).+?@/, '$1***@'),
    ); // redacted log

    const sql = neon(url);
    const adapter = new PrismaNeon(sql as any);

    // pass adapter to Prisma (Prisma v7 serverless adapter pattern)
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('Prisma connected');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('Prisma disconnected');
  }
}
