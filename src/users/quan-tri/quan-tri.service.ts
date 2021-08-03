import { Injectable } from '@nestjs/common';
import { DanhGiaService } from '../../models/danh-gia/danh-gia.service';
import { LopHocService } from '../../models/lop-hoc/lop-hoc.service';
import { TietHocService } from '../../models/tiet-hoc/tiet-hoc.service';
import { TuanHocService } from '../../models/tuan-hoc/tuan-hoc.service';

@Injectable()
export class QuanTriService {
    constructor(
        private readonly dgSer: DanhGiaService,
        private readonly thSer: TietHocService,
        private readonly lhSer: LopHocService,
        private readonly tuanSer: TuanHocService,
    ) {}

    async tatCa_danhGia() {
        return await this.dgSer.findAll();
    }

    async layDG_chuaXong(hs: string, tuan: string) {
        return this.dgSer.findUnfinished(hs, tuan);
    }

    async traLichHoc(tuan: string, lop: string) {
        const week = await this.tuanSer.findOne(tuan);
        const classe = await this.lhSer.findOne(lop);
        const tiet = await this.thSer.findAll();
        const result = [];

        for (let i = 0; i < tiet.length; i++) {
            if (
                tiet[i].buoiHoc &&
                tiet[i].buoiHoc.tuanHoc.soTuan == week.soTuan &&
                tiet[i].lopHoc &&
                tiet[i].lopHoc &&
                tiet[i].lopHoc == classe.maLH
            ) {
                const { lopHoc, buoiHoc, thuTiet, thoiGian, ...t } =
                    tiet[i];
                result.push(t);
            }
        }
        return result;
    }
}
