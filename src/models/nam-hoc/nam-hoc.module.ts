import { forwardRef, Module } from '@nestjs/common';
import { NamHocService } from './nam-hoc.service';
import { NamHocController } from './nam-hoc.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NamHocSchema } from './nam-hoc.entity';
import { NguoiDungModule } from '../nguoi-dung/nguoi-dung.module';
import { TuanHocModule } from '../tuan-hoc/tuan-hoc.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'nam_hoc',
                collection: 'nam_hoc',
                schema: NamHocSchema,
            },
        ]),
        forwardRef(() => NguoiDungModule),
        TuanHocModule,
    ],
    controllers: [NamHocController],
    providers: [NamHocService],
    exports: [NamHocService],
})
export class NamHocModule {}
