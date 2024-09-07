import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter  } from './core/filter/http-exception/http-exception.filter'
import { TransformInterceptor } from './core/intercepter/transform/transform.interceptor'
const listenPort = 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(`listen in http://localhost:${listenPort}`);
  // 这里添加一个全局路由前缀，该服务的所以路由都要加上这个
  app.setGlobalPrefix('api')

  const config = new DocumentBuilder()
    .setTitle('管理后台')
    .setDescription('管理后台接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    // .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  // 若请求出问题，则封装返回的值
  app.useGlobalFilters(new HttpExceptionFilter())

  // 请求成功，也封装统一一下返回值
  app.useGlobalInterceptors(new TransformInterceptor())



  await app.listen(listenPort);
}
bootstrap();
