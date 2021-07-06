import { Injectable } from '@nestjs/common';
import { MonHocService } from '../../models/mon-hoc/mon-hoc.service';

@Injectable()
export class GiaoVienService {
    constructor(private readonly mhSer: MonHocService) {}

    async giaoVien_theoMon(mon: string) {
        const sub = await (
            await this.mhSer.findOne(mon)
        )
            .populate({
                path: 'giaoVien',
                model: 'nguoi_dung',
            })
            .execPopulate();
        const result = [];

        for (let i = 0; i < sub.giaoVien.length; i++) {
            result.push(sub.giaoVien[i].hoTen);
        }
        return result;
    }
}
