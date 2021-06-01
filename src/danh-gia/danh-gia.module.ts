import { Module } from '@nestjs/common';
import { DanhGiaService } from './danh-gia.service';
import { DanhGiaController } from './danh-gia.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DanhGiaSchema } from './danh-gia.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'danh_gia', collection: 'danh_gia', schema: DanhGiaSchema },
        ]),
    ],
    controllers: [DanhGiaController],
    providers: [DanhGiaService],
    exports: [DanhGiaService],
})
export class DanhGiaModule {}
