import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CheckAuthMiddleware } from '../../checkAuth.middleware';
import { DanhGiaModule } from '../../models/danh-gia/danh-gia.module';
import { NguoiDungModule } from '../../models/nguoi-dung/nguoi-dung.module';
import { HieuTruongController } from './hieu-truong.controller';
import { HieuTruongService } from './hieu-truong.service';

@Module({
    imports: [DanhGiaModule, NguoiDungModule],
    controllers: [HieuTruongController],
    providers: [HieuTruongService],
})
export class HieuTruongModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(CheckAuthMiddleware).forRoutes('hieu-truong');
    }
}
