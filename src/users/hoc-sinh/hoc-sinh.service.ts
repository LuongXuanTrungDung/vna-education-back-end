import { Injectable } from '@nestjs/common';
import { BangDiemTongService } from '../../models/bang-diem-tong/bang-diem-tong.service';
import { DanhGiaService } from '../../models/danh-gia/danh-gia.service';
import { HSDGDto } from '../../models/danh-gia/dto/HSDG.dto';
import { DiemDanhService } from '../../models/diem-danh/diem-danh.service';
import { LopHocService } from '../../models/lop-hoc/lop-hoc.service';

@Injectable()
export class HocSinhService {
    constructor(
        private readonly dgSer: DanhGiaService,
        private readonly lhSer: LopHocService,
        private readonly bdtSer: BangDiemTongService,
        private readonly ddSer: DiemDanhService,
    ) {}

    async enroll(hs: string[], lop: string) {
        return await this.lhSer.addHS(hs, lop);
    }

    async makeReview(id: string, dto: HSDGDto) {
        return await this.dgSer.update_fromHS(id, dto);
    }

    async ofClass(lop: string) {
        return await this.lhSer.onlyHS(lop);
    }

    async seeReport(hs: string) {
        return await this.bdtSer.getOne_byHS(hs);
    }

    async getReviews(hs: string, week: string) {
        return await this.dgSer.getAll_byUser(hs, week);
    }

    async getReview(rev: string) {
        return await this.dgSer.getOne(rev);
    }

    async getPresented(hs: string) {
        return await this.ddSer.findAll({ hocSinh: Object(hs) });
    }
}
