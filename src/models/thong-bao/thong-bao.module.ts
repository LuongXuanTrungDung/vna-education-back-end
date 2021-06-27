import { Module } from '@nestjs/common';
import { ThongBaoService } from './thong-bao.service';
import { ThongBaoController } from './thong-bao.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ThongBaoSchema } from './thong-bao.entity';
import { NguoiDungModule } from '../nguoi-dung/nguoi-dung.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'thong_bao',
                collection: 'thong_bao',
                schema: ThongBaoSchema,
            },
        ]),
        NguoiDungModule,
    ],
    controllers: [ThongBaoController],
    providers: [ThongBaoService],
    exports: [ThongBaoService],
})
export class ThongBaoModule {}
