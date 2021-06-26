import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CheckAuthMiddleware } from '../../checkAuth.middleware';
import { NguoiDungModule } from '../../models/nguoi-dung/nguoi-dung.module';
import { PhuHuynhController } from './phu-huynh.controller';
import { PhuHuynhService } from './phu-huynh.service';

@Module({
	imports: [NguoiDungModule],
    controllers: [PhuHuynhController],
    providers: [PhuHuynhService],
})
export class PhuHuynhModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(CheckAuthMiddleware).forRoutes('phu-huynh');
    }
}
