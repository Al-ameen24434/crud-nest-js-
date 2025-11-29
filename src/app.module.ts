import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { TweetModule } from './tweet/tweet.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { DatabaseService } from './database/database.service';

@Module({
  controllers: [AppController],
  providers: [AppService, DatabaseService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PostsModule,
    UsersModule,
    TweetModule,
    DatabaseModule,
    EmployeesModule,
  ],
  exports: [DatabaseService],
})
export class AppModule {}
