import { forwardRef, Module } from '@nestjs/common';
import { LopHocService } from './lop-hoc.service';
import { LopHocController } from './lop-hoc.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LopHocSchema } from './lop-hoc.entity';
import { NguoiDungModule } from '../nguoi-dung/nguoi-dung.module';
import { NamHocModule } from '../nam-hoc/nam-hoc.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'lop_hoc',
                collection: 'lop_hoc',
                schema: LopHocSchema,
            },
        ]),
        forwardRef(() => NguoiDungModule),
        NamHocModule,
    ],
    controllers: [LopHocController],
    providers: [LopHocService],
    exports: [LopHocService],
})
export class LopHocModule {}
