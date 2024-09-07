import { Controller, Get, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller("test")
@ApiTags('公共接口')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("list")
  @ApiOperation({
    summary: '测试接口2'
  })
  getGoodBye(): string {
    return this.appService.getGoobye();
  }

  @Post("list")
  @ApiOperation({
    summary: '可以post'
  })
  getLost() {
    return '可以post'
  }

  @Get("user_*")
  getUser() {
    return '拿到user'
  }

  @Put('list/user')
  putList2() {
    return '拿到putListUser'
  }

  @Put('list/:id')
  putList() {
    return '拿到putList'
  }




}
