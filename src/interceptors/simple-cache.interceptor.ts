import { BadRequestException, CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { catchError, throwError } from "rxjs";

export class SimpleCacheInterceptor implements NestInterceptor {
    private readonly cache = new Map();


    async intercept(context: ExecutionContext, next: CallHandler<any>,) {
        console.log('SimpleCacheInterceptor executado antes');

        return next.handle();
    }

}