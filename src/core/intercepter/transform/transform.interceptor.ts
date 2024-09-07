import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
// 获取请求成功的上下文，再统一返回值规范
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((result) => {
        return {
          result,
          code: 0,
          msg: '请求成功',
        };
      }),
    );
  }
}
