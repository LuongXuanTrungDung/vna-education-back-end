import { forwardRef, Module } from '@nestjs/common';
import { NguoiDungService } from './nguoi-dung.service';
import { NguoiDungController } from './nguoi-dung.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NguoiDungSchema } from './nguoi-dung.entity';
import { LopHocModule } from '../lop-hoc/lop-hoc.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'nguoi_dung',
                collection: 'nguoi_dung',
                schema: NguoiDungSchema,
            },
        ]),
        forwardRef(() => LopHocModule),
    ],
    controllers: [NguoiDungController],
    providers: [NguoiDungService],
    exports: [NguoiDungService],
})
export class NguoiDungModule {}
