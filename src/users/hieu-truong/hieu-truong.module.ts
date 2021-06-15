import { Module } from '@nestjs/common';
import { DanhGiaModule } from '../../models/danh-gia/danh-gia.module';
import { NguoiDungModule } from '../../models/nguoi-dung/nguoi-dung.module';
import { HieuTruongController } from './hieu-truong.controller';
import { HieuTruongService } from './hieu-truong.service';

@Module({
    imports: [DanhGiaModule, NguoiDungModule],
    controllers: [HieuTruongController],
    providers: [HieuTruongService],
})
export class HieuTruongModule {}
