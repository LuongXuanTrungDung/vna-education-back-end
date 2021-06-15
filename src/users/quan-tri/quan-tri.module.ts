import { Module } from '@nestjs/common';
import { QuanTriController } from './quan-tri.controller';
import { QuanTriService } from './quan-tri.service';

@Module({
  controllers: [QuanTriController],
  providers: [QuanTriService]
})
export class QuanTriModule {}
