import { Module } from '@nestjs/common';
import { MauDanhGiaService } from './mau-danh-gia.service';
import { MauDanhGiaController } from './mau-danh-gia.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MauDanhGiaSchema } from './mau-danh-gia.entity';
import { NguoiDungModule } from '../nguoi-dung/nguoi-dung.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'mau_danh_gia',
                collection: 'mau_danh_gia',
                schema: MauDanhGiaSchema,
            },
        ]),
        NguoiDungModule,
    ],
    controllers: [MauDanhGiaController],
    providers: [MauDanhGiaService],
    exports: [MauDanhGiaService],
})
export class MauDanhGiaModule {}
