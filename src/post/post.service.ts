import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { PostsEntity } from './post.entity';
export interface PostsRo {
    list: PostsEntity[];
    count: number;
    pageNum: number;
    pageSize: number
}

export interface PostUpdate {
  id: number;
  article: PostsEntity;
}
@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostsEntity)
        private readonly postsRepository: Repository<PostsEntity>,
    ) {}

    // 创建文章
  async create(post: Partial<PostsEntity>): Promise<PostsEntity> {
    console.log(this.postsRepository, 'post整张表');
    
    const { title, content, author } = post;
    if (!title) {
      throw new HttpException('缺少文章标题', 405);
    } else if (!content) {
      throw new HttpException('缺少内容', 405)
    } else if (!author) {
      throw new HttpException('缺少作者', 405)
    }
    const doc = await this.postsRepository.findOne({ where: { title } });
    if (doc) {
      throw new HttpException('文章已存在', 401);
    }
    return await this.postsRepository.save(post);
  }
  
  // 获取文章列表
  async findAll(query): Promise<PostsRo> {
    const qb = await this.postsRepository.createQueryBuilder("post")
    console.log(query, 'query');
    
    // const qb = await getRepository(PostsEntity).createQueryBuilder('post');
    qb.where('1 = 1');
    qb.orderBy('post.create_time', 'DESC');

    
    const { pageNum = 1, pageSize = 10, ...params } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));
    const count = await qb.getCount();

    const posts = await qb.getMany();
    return { list: posts, count: count, pageSize, pageNum  };
  }

  // 获取指定文章
  async findById(id): Promise<PostsEntity> {
    console.log(id, 'iiid');
    const article = await this.postsRepository.findOne({where: {id}});
    if (!article) {
      throw new HttpException('文章不存在', 401)
    }
    return article;
  }

  // 更新文章
  async updateById(post): Promise<PostsEntity> {
    // console.log(post, 'nowPost');
    const { id, article } = post;
    console.log(id, article);
    
    const existPost = await this.postsRepository.findOne({where: {id: post.id}});
    console.log(existPost, 'existPost');
    
    if (!existPost) {
      throw new HttpException(`id为${post.id}的文章不存在`, 401);
    }
    const updatePost = this.postsRepository.merge(existPost, article);
    return this.postsRepository.save(updatePost);
  }

  // 刪除文章
  async remove(id) {
    // try {
      
    // } catch(e) {
    //   console.log(e);
    //   throw new HttpException(e.sqlMessage, 401)
    // }
    const existPost = await this.postsRepository.findOne({where: {id}});
    if (!existPost) {
      throw new HttpException(`id为${id}的文章不存在`, 401);
    }
    return await this.postsRepository.remove(existPost);
    
  }
}
