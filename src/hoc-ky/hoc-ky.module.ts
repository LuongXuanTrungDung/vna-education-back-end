import { Module } from '@nestjs/common';
import { HocKyService } from './hoc-ky.service';
import { HocKyController } from './hoc-ky.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HocKySchema } from './hoc-ky.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'hoc_ky',
                schema: HocKySchema,
                collection: 'hoc_ky',
            },
        ]),
    ],
    controllers: [HocKyController],
    providers: [HocKyService],
	exports: [HocKyService]
})
export class HocKyModule {}
