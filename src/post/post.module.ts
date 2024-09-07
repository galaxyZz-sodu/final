import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostsEntity } from './post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([PostsEntity])],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
