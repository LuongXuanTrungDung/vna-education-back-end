import { Module } from '@nestjs/common';
import { NguoiDungModule } from '../../models/nguoi-dung/nguoi-dung.module';
import { GiaoVienController } from './giao-vien.controller';
import { GiaoVienService } from './giao-vien.service';

@Module({
    imports: [NguoiDungModule],
    controllers: [GiaoVienController],
    providers: [GiaoVienService],
})
export class GiaoVienModule {}
