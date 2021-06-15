import { Module } from '@nestjs/common';
import { NguoiDungService } from './nguoi-dung.service';
import { NguoiDungController } from './nguoi-dung.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NguoiDungSchema } from './nguoi-dung.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'nguoi_dung',
                collection: 'nguoi_dung',
                schema: NguoiDungSchema,
            },
        ]),
    ],
    controllers: [NguoiDungController],
    providers: [NguoiDungService],
    exports: [NguoiDungService],
})
export class NguoiDungModule {}
