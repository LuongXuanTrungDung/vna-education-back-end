import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CheckAuthMiddleware } from '../../checkAuth.middleware';
import { PhuHuynhController } from './phu-huynh.controller';
import { PhuHuynhService } from './phu-huynh.service';

@Module({
    controllers: [PhuHuynhController],
    providers: [PhuHuynhService],
})
export class PhuHuynhModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(CheckAuthMiddleware).forRoutes('phu-huynh')
	}
}
