import { Injectable } from '@nestjs/common';
import { MonHocService } from '../../models/mon-hoc/mon-hoc.service';

@Injectable()
export class GiaoVienService {
    constructor(private readonly mhSer: MonHocService) {}

    async giaoVien_theoMon(mon: string) {
        const sub = await this.mhSer.findOne(mon);
        return sub.giaoVien;
    }
}
