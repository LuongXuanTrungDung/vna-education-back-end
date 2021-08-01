import { Injectable } from '@nestjs/common';
import { MonHocService } from '../../models/mon-hoc/mon-hoc.service';
import { NguoiDungService } from '../../models/nguoi-dung/nguoi-dung.service';

@Injectable()
export class GiaoVienService {
    constructor(
        private readonly mhSer: MonHocService,
        private readonly ndSer: NguoiDungService,
    ) {}

    async giaoVien_theoMon(mon: string) {
        const sub = await this.mhSer.findOne(mon);
        return sub.giaoVien;
    }

    async laGVCN() {
        return await this.ndSer.findGVCN();
    }
}
