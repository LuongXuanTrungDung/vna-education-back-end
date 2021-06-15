import { Module } from '@nestjs/common';
import { PhuHuynhController } from './phu-huynh.controller';
import { PhuHuynhService } from './phu-huynh.service';

@Module({
  controllers: [PhuHuynhController],
  providers: [PhuHuynhService]
})
export class PhuHuynhModule {}
