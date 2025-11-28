import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { TweetModule } from './tweet/tweet.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [PostsModule, UsersModule, TweetModule, DatabaseModule, EmployeesModule],
})
export class AppModule {}
