import { Module } from '@nestjs/common';
import { BangDiemService } from './bang-diem.service';
import { BangDiemController } from './bang-diem.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BangDiemSchema } from './bang-diem.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'bang_diem',
                collection: 'bang_diem',
                schema: BangDiemSchema,
            },
        ]),
    ],
    controllers: [BangDiemController],
    providers: [BangDiemService],
    exports: [BangDiemService],
})
export class BangDiemModule {}
