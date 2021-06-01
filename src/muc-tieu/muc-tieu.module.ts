import { Module } from '@nestjs/common';
import { MucTieuService } from './muc-tieu.service';
import { MucTieuController } from './muc-tieu.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MucTieuSchema } from './muc-tieu.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'muc_tieu', collection: 'muc_tieu', schema: MucTieuSchema },
        ]),
    ],
    controllers: [MucTieuController],
    providers: [MucTieuService],
    exports: [MucTieuService],
})
export class MucTieuModule {}
