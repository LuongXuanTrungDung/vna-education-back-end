import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CheckAuthMiddleware } from '../../checkAuth.middleware';
import { GiaoVienController } from './giao-vien.controller';
import { GiaoVienService } from './giao-vien.service';

@Module({
    controllers: [GiaoVienController],
    providers: [GiaoVienService],
})
export class GiaoVienModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(CheckAuthMiddleware).forRoutes('giao-vien')
	}
}
