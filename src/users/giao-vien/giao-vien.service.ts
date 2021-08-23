import { Injectable } from '@nestjs/common';
import { ChoGiaoVienService } from '../../models/danh-gia/roles/choGV.service';
import { LopHocService } from '../../models/lop-hoc/lop-hoc.service';
import { MonHocService } from '../../models/mon-hoc/mon-hoc.service';

@Injectable()
export class GiaoVienService {
    constructor(
        private readonly mhSer: MonHocService,
        private readonly lhSer: LopHocService,
        private readonly dgSer: ChoGiaoVienService,
    ) {}

    async xemHet_danhGia(gv: string, tuan: string) {
        return await this.dgSer.getAll_byGV(gv, tuan);
    }

    async xemMot_danhGia(rev: string) {
        return await this.dgSer.getOne_forGV(rev);
    }

    async giaoVien_theoMon(mon: string) {
        const sub = await this.mhSer.findOne(mon);
        return sub.giaoVien;
    }

    async laGVCN() {
        return await this.lhSer.onlyGV();
    }
}
