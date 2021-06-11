import { Module } from '@nestjs/common';
import { NgayHocService } from './ngay-hoc.service';
import { NgayHocController } from './ngay-hoc.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NgayHocSchema } from './ngay-hoc.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'ngay_hoc',
                collection: 'ngay_hoc',
                schema: NgayHocSchema,
            },
        ]),
    ],
    controllers: [NgayHocController],
    providers: [NgayHocService],
    exports: [NgayHocService],
})
export class NgayHocModule {}
