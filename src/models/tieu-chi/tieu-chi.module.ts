import { Module } from '@nestjs/common';
import { TieuChiService } from './tieu-chi.service';
import { TieuChiController } from './tieu-chi.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TieuChiSchema } from './tieu-chi.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'tieu_chi', collection: 'tieu_chi', schema: TieuChiSchema },
        ]),
    ],
    controllers: [TieuChiController],
    providers: [TieuChiService],
    exports: [TieuChiService],
})
export class TieuChiModule {}
