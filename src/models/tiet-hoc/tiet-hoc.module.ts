import { Module } from '@nestjs/common';
import { TietHocService } from './tiet-hoc.service';
import { TietHocController } from './tiet-hoc.controller';
import { TietHocSchema } from './tiet-hoc.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { NguoiDungModule } from '../nguoi-dung/nguoi-dung.module';
import { LopHocModule } from '../lop-hoc/lop-hoc.module';
import { MonHocModule } from '../mon-hoc/mon-hoc.module';
import { TuanHocModule } from '../tuan-hoc/tuan-hoc.module';
import { DiemDanhModule } from '../diem-danh/diem-danh.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'tiet_hoc',
                collection: 'tiet_hoc',
                schema: TietHocSchema,
            },
        ]),
        NguoiDungModule,
        LopHocModule,
        MonHocModule,
        TuanHocModule,
        DiemDanhModule,
    ],
    controllers: [TietHocController],
    providers: [TietHocService],
    exports: [TietHocService],
})
export class TietHocModule {}
