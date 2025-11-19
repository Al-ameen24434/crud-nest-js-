import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import type { Post as PostInterface } from './interfaces/post.interface';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll(@Query('search') Search?: string): PostInterface[] {
    const extractAllPosts = this.postsService.findAll();
    if (Search) {
      return extractAllPosts.filter((singlePost) =>
        singlePost.title
          .toLocaleLowerCase()
          .includes(Search.toLocaleLowerCase()),
      );
    }
    return extractAllPosts;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): PostInterface {
    return this.postsService.findOne(id);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPostData: CreatePostDto): PostInterface {
    return this.postsService.create(createPostData);
  }
}
