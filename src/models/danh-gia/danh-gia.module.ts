import { forwardRef, Module } from '@nestjs/common';
import { DanhGiaService } from './danh-gia.service';
import { DanhGiaController } from './danh-gia.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DanhGiaSchema } from './danh-gia.entity';
import { NguoiDungModule } from '../nguoi-dung/nguoi-dung.module';
import { LopHocModule } from '../lop-hoc/lop-hoc.module';
import { MonHocModule } from '../mon-hoc/mon-hoc.module';
import { MauDanhGiaModule } from '../mau-danh-gia/mau-danh-gia.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'danh_gia', collection: 'danh_gia', schema: DanhGiaSchema },
        ]),
        NguoiDungModule,
        LopHocModule,
        MonHocModule,
        // MauDanhGiaModule,
		forwardRef(()=>MauDanhGiaModule)
    ],
    controllers: [DanhGiaController],
    providers: [DanhGiaService],
    exports: [DanhGiaService],
})
export class DanhGiaModule {}
