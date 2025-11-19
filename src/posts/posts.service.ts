import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './interfaces/post.interface';

@Injectable()
export class PostsService {
  private posts: Post[] = [
    {
      id: 1,
      title: 'First Post',
      content: 'This is the content of the first post.',
      authorName: 'alameen',
      createdAt: new Date(),
    },
  ];
  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: number): Post {
    const singlePost = this.posts.find((post) => post.id === id);
    if (!singlePost) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return singlePost;
  }

  create(createPostData: Omit<Post, 'id' | 'createdAt'>): Post {
    const newPost: Post = {
      id: this.generateId(),
      ...createPostData,
      createdAt: new Date(),
    };
    this.posts.push(newPost);
    return newPost;
  }

  // private getNextId(): number {
  //   return this.posts.length > 0
  //     ? Math.max(
  //         ...this.posts.map((post) =>
  //           typeof post.id === 'number' ? post.id : 0,
  //         ),
  //       ) + 1
  //     : 1;
  // }

  private generateId(): number {
    return parseInt(Math.random().toString(36).substr(2, 9), 10);
  }
}
