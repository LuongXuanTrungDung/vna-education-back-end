import { Module } from '@nestjs/common';
import { BuoiHocService } from './buoi-hoc.service';
import { BuoiHocController } from './buoi-hoc.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BuoiHocSchema } from './buoi-hoc.entity';
import { NguoiDungModule } from '../nguoi-dung/nguoi-dung.module';
import { TietHocModule } from '../tiet-hoc/tiet-hoc.module';
import { TuanHocModule } from '../tuan-hoc/tuan-hoc.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'buoi_hoc',
                collection: 'buoi_hoc',
                schema: BuoiHocSchema,
            },
        ]),
        NguoiDungModule,
        TietHocModule,
        TuanHocModule,
    ],
    controllers: [BuoiHocController],
    providers: [BuoiHocService],
    exports: [BuoiHocService],
})
export class BuoiHocModule {}
