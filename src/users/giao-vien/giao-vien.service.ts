import { Injectable } from '@nestjs/common';
import { MonHocService } from '../../models/mon-hoc/mon-hoc.service';
import { ImportGVDTO } from '../../models/nguoi-dung/dto/import-gv.dto';
import { GiaoVienUtils } from '../../models/nguoi-dung/roles/giao-vien.utils';

@Injectable()
export class GiaoVienService {
    constructor(
        private readonly mhSer: MonHocService,
        private readonly gvU: GiaoVienUtils,
    ) {}

    async importGV(dto: ImportGVDTO) {
        return await this.gvU.importGV(dto);
    }

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
