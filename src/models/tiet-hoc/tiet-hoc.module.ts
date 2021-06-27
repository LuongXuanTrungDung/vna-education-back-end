import { Module } from '@nestjs/common';
import { TietHocService } from './tiet-hoc.service';
import { TietHocController } from './tiet-hoc.controller';
import { TietHocSchema } from './tiet-hoc.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { NguoiDungModule } from '../nguoi-dung/nguoi-dung.module';

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
    ],
    controllers: [TietHocController],
    providers: [TietHocService],
    exports: [TietHocService],
})
export class TietHocModule {}
