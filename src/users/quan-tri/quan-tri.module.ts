import { Module } from '@nestjs/common';
import { DanhGiaModule } from '../../models/danh-gia/danh-gia.module';
import { LopHocModule } from '../../models/lop-hoc/lop-hoc.module';
import { NguoiDungModule } from '../../models/nguoi-dung/nguoi-dung.module';
import { TietHocModule } from '../../models/tiet-hoc/tiet-hoc.module';
import { TuanHocModule } from '../../models/tuan-hoc/tuan-hoc.module';
import { QuanTriController } from './quan-tri.controller';
import { QuanTriService } from './quan-tri.service';

@Module({
    imports: [
        NguoiDungModule,
        DanhGiaModule,
        TuanHocModule,
        LopHocModule,
        TietHocModule,
    ],
    controllers: [QuanTriController],
    providers: [QuanTriService],
})
export class QuanTriModule {}
