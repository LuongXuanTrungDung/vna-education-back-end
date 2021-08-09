import { forwardRef, Module } from '@nestjs/common';
import { DanhGiaService } from './danh-gia.service';
import { DanhGiaController } from './danh-gia.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DanhGiaSchema } from './danh-gia.entity';
import { NguoiDungModule } from '../nguoi-dung/nguoi-dung.module';
import { LopHocModule } from '../lop-hoc/lop-hoc.module';
import { MonHocModule } from '../mon-hoc/mon-hoc.module';
import { MauDanhGiaModule } from '../mau-danh-gia/mau-danh-gia.module';
import { TuanHocModule } from '../tuan-hoc/tuan-hoc.module';
import { ChoHocSinhService } from './roles/choHS.service';
import { ChoGiaoViehService } from './roles/choGV.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'danh_gia', collection: 'danh_gia', schema: DanhGiaSchema },
        ]),
        NguoiDungModule,
        LopHocModule,
        MonHocModule,
        TuanHocModule,
        forwardRef(() => MauDanhGiaModule),
    ],
    controllers: [DanhGiaController],
    providers: [DanhGiaService, ChoHocSinhService, ChoGiaoViehService],
    exports: [DanhGiaService, ChoHocSinhService, ChoGiaoViehService],
})
export class DanhGiaModule {}
