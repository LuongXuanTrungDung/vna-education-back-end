import { Module } from '@nestjs/common';
import { TietHocService } from './tiet-hoc.service';
import { TietHocController } from './tiet-hoc.controller';
import { TietHocSchema } from './tiet-hoc.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'tiet_hoc',
                collection: 'tiet_hoc',
                schema: TietHocSchema,
            },
        ]),
    ],
    controllers: [TietHocController],
    providers: [TietHocService],
})
export class TietHocModule {}
