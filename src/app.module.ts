import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { TweetModule } from './tweet/tweet.module';

import { EmployeesModule } from './employees/employees.module';

import { PrismaModule } from './prisma/prisma.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/.env`,
    }),
    PostsModule,
    UsersModule,
    TweetModule,

    EmployeesModule,
    PrismaModule,
  ],
  exports: [PrismaModule],
})
export class AppModule {}
