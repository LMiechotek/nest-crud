// Interceptor assincrono
import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { tap } from "rxjs";

export class TimingConnectionInterceptor implements NestInterceptor {
    async intercept(context: ExecutionContext, next: CallHandler<any>,) {
        const startTime = Date.now();
        console.log('TimingConnectionInterceptor executado antes');

        //await new Promise(resolve => setTimeout(resolve, 3000));

        return next.handle().pipe(
            tap(() => {
                const endTime = Date.now();
                const elapsedTime = endTime - startTime;
                console.log(`TimingConnectionInterceptor: levou ${elapsedTime}ms para executar.`);
            }),
        );
    }

}