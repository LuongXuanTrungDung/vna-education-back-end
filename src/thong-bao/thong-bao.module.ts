import { Module } from '@nestjs/common';
import { ThongBaoService } from './thong-bao.service';
import { ThongBaoController } from './thong-bao.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ThongBaoSchema } from './thong-bao.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'thong_bao',
                collection: 'thong_bao',
                schema: ThongBaoSchema,
            },
        ]),
    ],
    controllers: [ThongBaoController],
    providers: [ThongBaoService],
})
export class ThongBaoModule {}
