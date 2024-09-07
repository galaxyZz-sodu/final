import { Controller, Post, Get, Body, Delete, Put, Param, Query } from '@nestjs/common';
import { PostService, PostsRo } from './post.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreatePostDto, FindPostDto, UpdatePostDto } from './dto/create-post.dto';
interface deleteType {
    id: string | number;
}

@ApiTags('文章')
@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    /**
     * 创建文章
     * @param post
     */
    @Post()
    @ApiOperation({
        summary: '创建文章'
    })
    async create(@Body() post: CreatePostDto) {
        console.log(post, '创建post');
        
        return await this.postService.create(post);
    }

    /**
     * 获取所有文章
     */
     @Get()
     @ApiOperation({
        summary: '获取所有文章'
    })
     async findAll(@Query() query: FindPostDto):Promise<PostsRo>{
         return await this.postService.findAll(query)
     }
 
     /**
      * 获取指定文章
      * @param id 
      */
     @Get('getArticle')
     @ApiOperation({
        summary: '获取指定文章'
    })
     async findById(@Body('id') id) {
        
        return await this.postService.findById(id)
     }
 
     /**
      * 更新文章
      * @param id 
      * @param post 
      */
     @Post('update')
     @ApiOperation({
        summary: '更新文章'
    })
     async update(@Body() post: UpdatePostDto){
        console.log(post, '更新');
        
        return await this.postService.updateById(post)
     }
 
     /**
      * 删除文章
      * @param id
      */
     @Get('delete')
     @ApiOperation({
        summary: '删除文章'
    })
     async remove(@Body('id') id){
        // const { id } = post
        console.log(id, 'wat');
        
        return await this.postService.remove(id)
     }
 


}
