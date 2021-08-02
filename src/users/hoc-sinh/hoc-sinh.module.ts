import { Module } from '@nestjs/common';
import { BangDiemTongModule } from '../../models/bang-diem-tong/bang-diem-tong.module';
import { DanhGiaModule } from '../../models/danh-gia/danh-gia.module';
import { DiemDanhModule } from '../../models/diem-danh/diem-danh.module';
import { LopHocModule } from '../../models/lop-hoc/lop-hoc.module';
import { NguoiDungModule } from '../../models/nguoi-dung/nguoi-dung.module';
import { HocSinhController } from './hoc-sinh.controller';
import { HocSinhService } from './hoc-sinh.service';

@Module({
    imports: [
        DanhGiaModule,
        NguoiDungModule,
        LopHocModule,
        BangDiemTongModule,
        DiemDanhModule,
    ],
    controllers: [HocSinhController],
    providers: [HocSinhService],
})
export class HocSinhModule {}
