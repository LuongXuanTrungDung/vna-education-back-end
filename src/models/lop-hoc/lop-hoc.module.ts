import { Module } from '@nestjs/common';
import { LopHocService } from './lop-hoc.service';
import { LopHocController } from './lop-hoc.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LopHocSchema } from './lop-hoc.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'lop_hoc',
                collection: 'lop_hoc',
                schema: LopHocSchema,
            },
        ]),
    ],
    controllers: [LopHocController],
    providers: [LopHocService],
    exports: [LopHocService],
})
export class LopHocModule {}
