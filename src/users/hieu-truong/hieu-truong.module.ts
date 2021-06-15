import { Module } from '@nestjs/common';
import { HieuTruongController } from './hieu-truong.controller';
import { HieuTruongService } from './hieu-truong.service';

@Module({
  controllers: [HieuTruongController],
  providers: [HieuTruongService]
})
export class HieuTruongModule {}
