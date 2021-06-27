import { Module } from '@nestjs/common';
import { MonHocService } from './mon-hoc.service';
import { MonHocController } from './mon-hoc.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MonHocSchema } from './mon-hoc.entity';
import { NguoiDungModule } from '../nguoi-dung/nguoi-dung.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'mon_hoc',
                collection: 'mon_hoc',
                schema: MonHocSchema,
            },
        ]),
        NguoiDungModule,
    ],
    controllers: [MonHocController],
    providers: [MonHocService],
    exports: [MonHocService],
})
export class MonHocModule {}
