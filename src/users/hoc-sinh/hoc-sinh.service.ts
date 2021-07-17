import { Injectable } from '@nestjs/common';
import { BangDiemTongService } from '../../models/bang-diem-tong/bang-diem-tong.service';
import { DanhGiaService } from '../../models/danh-gia/danh-gia.service';
import { HSDGDto } from '../../models/danh-gia/dto/HSDG.dto';
import { LopHocService } from '../../models/lop-hoc/lop-hoc.service';
import { HocSinhDTO } from '../../models/nguoi-dung/dto/hoc-sinh.dto';

@Injectable()
export class HocSinhService {
    constructor(
        private readonly dgSer: DanhGiaService,
        private readonly lhSer: LopHocService,
        private readonly bdtSer: BangDiemTongService,
    ) {}

    async enroll(hs: string, lop: string) {
        return await this.lhSer.addHS(hs, lop);
    }

    async makeReview(id: string, dto: HSDGDto) {
        return await this.dgSer.update_fromHS(id, dto);
    }

    async seeReport(hs: string) {
        return await this.bdtSer.findOne_byHS(hs);
    }
}
