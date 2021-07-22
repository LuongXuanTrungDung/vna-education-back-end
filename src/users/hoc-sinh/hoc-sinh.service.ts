import { Injectable } from '@nestjs/common';
import { BangDiemTongService } from '../../models/bang-diem-tong/bang-diem-tong.service';
import { DanhGiaService } from '../../models/danh-gia/danh-gia.service';
import { HSDGDto } from '../../models/danh-gia/dto/HSDG.dto';
import { LopHocService } from '../../models/lop-hoc/lop-hoc.service';
import { ImportHSDTO } from '../../models/nguoi-dung/dto/import-hs.dto';
import { HocSinhUtils } from '../../models/nguoi-dung/roles/hoc-sinh.utils';

@Injectable()
export class HocSinhService {
    constructor(
        private readonly dgSer: DanhGiaService,
        private readonly lhSer: LopHocService,
        private readonly bdtSer: BangDiemTongService,
        private readonly hsU: HocSinhUtils,
    ) {}

    async importHS(dto: ImportHSDTO) {
        return await this.hsU.importHS(dto);
    }

    async enroll(hs: string, lop: string) {
        return await this.lhSer.addHS(hs, lop);
    }

    async makeReview(id: string, dto: HSDGDto) {
        return await this.dgSer.update_fromHS(id, dto);
    }

    async ofClass(lop: string) {
        return await this.lhSer.onlyHS(lop);
    }

    async seeReport(hs: string) {
        return await this.bdtSer.findOne_byHS(hs);
    }
}
