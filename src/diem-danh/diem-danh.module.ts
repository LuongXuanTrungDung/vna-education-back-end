import { Module } from '@nestjs/common';
import { DiemDanhService } from './diem-danh.service';
import { DiemDanhController } from './diem-danh.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DiemDanhSchema } from './diem-danh.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'diem_danh',
                collection: 'diem_danh',
                schema: DiemDanhSchema,
            },
        ]),
    ],
    controllers: [DiemDanhController],
    providers: [DiemDanhService],
})
export class DiemDanhModule {}
