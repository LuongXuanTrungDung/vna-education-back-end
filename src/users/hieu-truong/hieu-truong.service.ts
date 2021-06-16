import { Injectable } from '@nestjs/common';
import { DanhGiaService } from '../../models/danh-gia/danh-gia.service';
import { NguoiDungService } from '../../models/nguoi-dung/nguoi-dung.service';

@Injectable()
export class HieuTruongService {
    constructor(
        private dgSer: DanhGiaService,
        private ndSer: NguoiDungService,
    ) {}

    async tatCa_DanhGia() {
        return await this.dgSer.findAll();
    }

    async tatCa_HocSinh() {
        const result = [];
        const hs = await this.ndSer.findAll_byRole('HS');

        for (let i = 0; i < hs.length; i++) {
            const temp = {
                id: hs[i]._id,
                ma: hs[i].maND,
                lop: hs[i].lopHoc,
                hoTen: hs[i].hoTen,
            };
            result.push(temp);
        }
        return result;
    }

    async tatCa_GiaoVien() {
        const result = [];
        const gv = await this.ndSer.findAll_byRole('GV');

        for (let i = 0; i < gv.length; i++) {
            const temp = {
                id: gv[i]._id,
                ma: gv[i].maND,
                chuNhiem: gv[i].chuNhiem,
                hoTen: gv[i].hoTen,
            };
            result.push(temp);
        }
        return result;
    }
}
