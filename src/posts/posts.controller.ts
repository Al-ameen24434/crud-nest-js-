import { Controller, Get, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostInterface } from './interfaces/post.interface';

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
}
