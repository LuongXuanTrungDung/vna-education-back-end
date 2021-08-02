import { Injectable } from '@nestjs/common';
import { LopHocService } from '../../models/lop-hoc/lop-hoc.service';
import { MonHocService } from '../../models/mon-hoc/mon-hoc.service';

@Injectable()
export class GiaoVienService {
    constructor(
        private readonly mhSer: MonHocService,
        private readonly lhSer: LopHocService,
    ) {}

    async giaoVien_theoMon(mon: string) {
        const sub = await this.mhSer.findOne(mon);
        return sub.giaoVien;
    }

    async laGVCN() {
        return await this.lhSer.onlyGV();
    }
}
