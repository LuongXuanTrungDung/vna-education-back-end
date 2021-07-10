import { Module } from '@nestjs/common';
import { BangDiemTongService } from './bang-diem-tong.service';
import { BangDiemTongController } from './bang-diem-tong.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BangDiemTongSchema } from './bang-diem-tong.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'bang_diem_tong',
                collection: 'bang_diem_tong',
                schema: BangDiemTongSchema,
            },
        ]),
    ],
    controllers: [BangDiemTongController],
    providers: [BangDiemTongService],
    exports: [BangDiemTongService],
})
export class BangDiemTongModule {}
