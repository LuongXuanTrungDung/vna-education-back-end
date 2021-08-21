import { Injectable } from '@nestjs/common';
import { sessionSort } from '../../helpers/utilities';
import { DanhGiaService } from '../../models/danh-gia/danh-gia.service';
import { LopHocService } from '../../models/lop-hoc/lop-hoc.service';
import { AccountService } from '../../models/nguoi-dung/actions/account.service';
import { TietHocService } from '../../models/tiet-hoc/tiet-hoc.service';
import { TuanHocService } from '../../models/tuan-hoc/tuan-hoc.service';

@Injectable()
export class QuanTriService {
    constructor(
        private readonly dgSer: DanhGiaService,
        private readonly thSer: TietHocService,
        private readonly lhSer: LopHocService,
        private readonly tuanSer: TuanHocService,

        private readonly accSer: AccountService,
    ) {}

    async tatCa_danhGia() {
        return await this.dgSer.findAll();
    }

    async layDG_chuaXong(hs: string, tuan: string) {
        return await this.dgSer.getUnfinished(hs, tuan);
    }

    async traLichHoc(tuan: string, lop: string) {
        const week = await this.tuanSer.findOne(tuan);
        const tiet = await this.thSer.findAll({ lopHoc: Object(lop) });
        const result = [];

        for (let i = 0; i < tiet.length; i++) {
            if (tiet[i].buoiHoc.tuanHoc === week.soTuan) {
                const { lopHoc, buoiHoc, thoiGian, ...t } = tiet[i];
                result.push(t);
            }
        }

        return result.sort((a, b) => {
            return sessionSort(a.thuTiet, b.thuTiet);
        });
    }

    async dongMo_taiKhoan(tk: string, trangThai: boolean) {
        return await this.accSer.toggleActivation(tk, trangThai);
    }
}
