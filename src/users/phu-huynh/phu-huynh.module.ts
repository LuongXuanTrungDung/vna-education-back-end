import { Module } from '@nestjs/common';
import { NguoiDungModule } from '../../models/nguoi-dung/nguoi-dung.module';
import { PhuHuynhController } from './phu-huynh.controller';
import { PhuHuynhService } from './phu-huynh.service';

@Module({
    imports: [NguoiDungModule],
    controllers: [PhuHuynhController],
    providers: [PhuHuynhService],
})
export class PhuHuynhModule {}
