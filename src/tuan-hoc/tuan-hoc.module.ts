import { Module } from '@nestjs/common';
import { TuanHocService } from './tuan-hoc.service';
import { TuanHocController } from './tuan-hoc.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TuanHocSchema } from './tuan-hoc.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'tuan_hoc',
                collection: 'tuan_hoc',
                schema: TuanHocSchema,
            },
        ]),
    ],
    controllers: [TuanHocController],
    providers: [TuanHocService],
})
export class TuanHocModule {}
