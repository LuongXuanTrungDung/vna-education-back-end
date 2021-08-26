import { Module } from '@nestjs/common';
import { QuenMatKhauService } from './quen-mat-khau.service';
import { QuenMatKhauController } from './quen-mat-khau.controller';
import { NguoiDungModule } from '../nguoi-dung/nguoi-dung.module';
import { MongooseModule } from '@nestjs/mongoose';
import { QuenMatKhauSchema } from './quen-mat-khau.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'quen_matKhau',
                collection: 'quen_matKhau',
                schema: QuenMatKhauSchema,
            },
        ]),
        NguoiDungModule,
    ],
    controllers: [QuenMatKhauController],
    providers: [QuenMatKhauService],
    exports: [QuenMatKhauService],
})
export class QuenMatKhauModule {}
