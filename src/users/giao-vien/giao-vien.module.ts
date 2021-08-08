import { Module } from '@nestjs/common';
import { DanhGiaModule } from '../../models/danh-gia/danh-gia.module';
import { LopHocModule } from '../../models/lop-hoc/lop-hoc.module';
import { MonHocModule } from '../../models/mon-hoc/mon-hoc.module';
import { NguoiDungModule } from '../../models/nguoi-dung/nguoi-dung.module';
import { GiaoVienController } from './giao-vien.controller';
import { GiaoVienService } from './giao-vien.service';

@Module({
    imports: [NguoiDungModule, MonHocModule, LopHocModule, DanhGiaModule],
    controllers: [GiaoVienController],
    providers: [GiaoVienService],
})
export class GiaoVienModule {}
