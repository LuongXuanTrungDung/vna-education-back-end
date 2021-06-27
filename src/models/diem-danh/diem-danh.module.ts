import { Module } from '@nestjs/common';
import { DiemDanhService } from './diem-danh.service';
import { DiemDanhController } from './diem-danh.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DiemDanhSchema } from './diem-danh.entity';
import { NguoiDungModule } from '../nguoi-dung/nguoi-dung.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'diem_danh',
                collection: 'diem_danh',
                schema: DiemDanhSchema,
            },
        ]),
        NguoiDungModule,
    ],
    controllers: [DiemDanhController],
    providers: [DiemDanhService],
    exports: [DiemDanhService],
})
export class DiemDanhModule {}
