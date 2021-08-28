import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NguoiDungModule } from '../nguoi-dung/nguoi-dung.module';
import { QuenMatKhauController } from './quen-mat-khau.controller';
import { QuenMatKhauSchema } from './quen-mat-khau.entity';
import { QuenMatKhauService } from './quen-mat-khau.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'quen_matKhau',
                collection: 'quen_matKhau',
                schema: QuenMatKhauSchema,
            },
        ]),
        forwardRef(() => NguoiDungModule),
    ],
    controllers: [QuenMatKhauController],
    providers: [QuenMatKhauService],
    exports: [QuenMatKhauService],
})
export class QuenMatKhauModule {}
