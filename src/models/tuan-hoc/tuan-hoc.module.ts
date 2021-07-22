import { Module } from '@nestjs/common';
import { TuanHocService } from './tuan-hoc.service';
import { TuanHocController } from './tuan-hoc.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TuanHocSchema } from './tuan-hoc.entity';
import { NguoiDungModule } from '../nguoi-dung/nguoi-dung.module';
import { BuoiHocModule } from '../buoi-hoc/buoi-hoc.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'tuan_hoc',
                collection: 'tuan_hoc',
                schema: TuanHocSchema,
            },
        ]),
        NguoiDungModule,
        BuoiHocModule,
    ],
    controllers: [TuanHocController],
    providers: [TuanHocService],
    exports: [TuanHocService],
})
export class TuanHocModule {}
