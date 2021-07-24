import { Injectable } from '@nestjs/common';
import { MonHocService } from '../../models/mon-hoc/mon-hoc.service';

@Injectable()
export class GiaoVienService {
    constructor(
        private readonly mhSer: MonHocService,
    ) {}

    async giaoVien_theoMon(mon: string) {
        const sub1 = await this.mhSer.findOne(mon);
        const sub2 = await sub1
            .populate({
                path: 'giaoVien',
                model: 'nguoi_dung',
            })
            .execPopulate();
        const result = [];

        for (let i = 0; i < sub2.giaoVien.length; i++) {
            result.push({
                _id: sub1.giaoVien[i],
                hoTen: sub2.giaoVien[i].hoTen,
            });
        }
        return result;
    }
}
