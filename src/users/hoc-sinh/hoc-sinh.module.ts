import { Module } from '@nestjs/common';
import { BangDiemModule } from '../../models/bang-diem/bang-diem.module';
import { DiemDanhModule } from '../../models/diem-danh/diem-danh.module';
import { HocSinhController } from './hoc-sinh.controller';
import { HocSinhService } from './hoc-sinh.service';

@Module({
    imports: [BangDiemModule, DiemDanhModule],
    controllers: [HocSinhController],
    providers: [HocSinhService],
})
export class HocSinhModule {}
