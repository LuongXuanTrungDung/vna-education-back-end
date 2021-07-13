import { Module } from '@nestjs/common';
import { DanhGiaModule } from '../../models/danh-gia/danh-gia.module';
import { LopHocModule } from '../../models/lop-hoc/lop-hoc.module';
import { NguoiDungModule } from '../../models/nguoi-dung/nguoi-dung.module';
import { HocSinhController } from './hoc-sinh.controller';
import { HocSinhService } from './hoc-sinh.service';

@Module({
    imports: [DanhGiaModule, NguoiDungModule, LopHocModule],
    controllers: [HocSinhController],
    providers: [HocSinhService],
})
export class HocSinhModule {}
