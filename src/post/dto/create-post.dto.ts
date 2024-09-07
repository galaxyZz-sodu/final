import { ApiProperty } from '@nestjs/swagger';
export class CreatePostDto {
    @ApiProperty({description: '文章标题'})
    readonly title: string;

    @ApiProperty({description: '作者'})
    readonly author: string;

    @ApiProperty({description: '内容'})
    readonly content: string;

    @ApiProperty({description: '文章封面'})
    readonly cover_url: string;

    @ApiProperty({description: '文章类型'})
    readonly type: number;
}

// 获取文章接口的传参
export class FindPostDto {
    @ApiProperty({description: '每页数据条数'})
    readonly pageSize: number;

    @ApiProperty({description: '页数'})
    readonly pageNum: number;
}

export class UpdatePostDto {
    @ApiProperty({description: '文章id'})
    readonly id: number;

    @ApiProperty({description: '需要修改的内容'})
    readonly article: CreatePostDto;
  }
