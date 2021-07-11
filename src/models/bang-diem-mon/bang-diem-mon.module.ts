import { Module } from '@nestjs/common';
import { BangDiemMonService } from './bang-diem-mon.service';
import { BangDiemMonController } from './bang-diem-mon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BangDiemMonSchema } from './bang-diem-mon.entity';
import { NguoiDungModule } from '../nguoi-dung/nguoi-dung.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'bang_diem_mon',
                collection: 'bang_diem_mon',
                schema: BangDiemMonSchema,
            },
        ]),
        NguoiDungModule,
    ],
    controllers: [BangDiemMonController],
    providers: [BangDiemMonService],
})
export class BangDiemMonModule {}
