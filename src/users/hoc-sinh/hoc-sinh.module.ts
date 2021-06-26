import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CheckAuthMiddleware } from '../../checkAuth.middleware';
import { BangDiemModule } from '../../models/bang-diem/bang-diem.module';
import { DanhGiaModule } from '../../models/danh-gia/danh-gia.module';
import { DiemDanhModule } from '../../models/diem-danh/diem-danh.module';
import { NguoiDungModule } from '../../models/nguoi-dung/nguoi-dung.module';
import { HocSinhController } from './hoc-sinh.controller';
import { HocSinhService } from './hoc-sinh.service';

@Module({
    imports: [BangDiemModule, DiemDanhModule, DanhGiaModule, NguoiDungModule],
    controllers: [HocSinhController],
    providers: [HocSinhService],
})
export class HocSinhModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(CheckAuthMiddleware).forRoutes('hoc-sinh')
	}
}
