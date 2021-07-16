import { Injectable } from '@nestjs/common';
import { BangDiemTongService } from '../../models/bang-diem-tong/bang-diem-tong.service';
import { DanhGiaService } from '../../models/danh-gia/danh-gia.service';
import { HSDGDto } from '../../models/danh-gia/dto/HSDG.dto';
import { LopHocService } from '../../models/lop-hoc/lop-hoc.service';
import { HocSinhDTO } from '../../models/nguoi-dung/dto/hoc-sinh.dto';
import { NguoiDungService } from '../../models/nguoi-dung/nguoi-dung.service';

@Injectable()
export class HocSinhService {
    constructor(
        private readonly dgSer: DanhGiaService,
        private readonly lhSer: LopHocService,
        private readonly bdtSer: BangDiemTongService,
        private readonly ndSer: NguoiDungService,
    ) {}

    async create(dto: HocSinhDTO) {
        return await this.ndSer.createHS(dto);
    }

    async update(id: string, dto: HocSinhDTO) {
        return await this.ndSer.updateHS(id, dto);
    }

    async list() {
        return await this.ndSer.findAll_byRole('HS');
    }

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
