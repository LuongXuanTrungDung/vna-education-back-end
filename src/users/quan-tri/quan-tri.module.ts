import { Module } from '@nestjs/common';
import { DanhGiaModule } from '../../models/danh-gia/danh-gia.module';
import { NguoiDungModule } from '../../models/nguoi-dung/nguoi-dung.module';
import { QuanTriController } from './quan-tri.controller';
import { QuanTriService } from './quan-tri.service';

@Module({
    imports: [NguoiDungModule, DanhGiaModule],
    controllers: [QuanTriController],
    providers: [QuanTriService],
})
export class QuanTriModule {}
