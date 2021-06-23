import { Module } from '@nestjs/common';
import { MonHocModule } from '../../models/mon-hoc/mon-hoc.module';
import { NgayHocModule } from '../../models/ngay-hoc/ngay-hoc.module';
import { NguoiDungModule } from '../../models/nguoi-dung/nguoi-dung.module';
import { QuanTriController } from './quan-tri.controller';
import { QuanTriService } from './quan-tri.service';

@Module({
    imports: [NguoiDungModule, NgayHocModule, MonHocModule],
    controllers: [QuanTriController],
    providers: [QuanTriService],
})
export class QuanTriModule {}
