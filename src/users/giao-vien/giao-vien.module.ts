import { Module } from '@nestjs/common';
import { GiaoVienController } from './giao-vien.controller';
import { GiaoVienService } from './giao-vien.service';

@Module({
    controllers: [GiaoVienController],
    providers: [GiaoVienService],
})
export class GiaoVienModule {}
