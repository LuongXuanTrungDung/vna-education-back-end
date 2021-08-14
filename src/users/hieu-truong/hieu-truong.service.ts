import { Injectable } from '@nestjs/common';
import { DanhGiaService } from '../../models/danh-gia/danh-gia.service';
import { ChoHieuTruongService } from '../../models/danh-gia/roles/choHT.service';
import { NguoiDungService } from '../../models/nguoi-dung/nguoi-dung.service';

@Injectable()
export class HieuTruongService {
    constructor(
        private dgSer: DanhGiaService,
        private ndSer: NguoiDungService,
        private ht: ChoHieuTruongService,
    ) {}

    // async tatCa_DanhGia() {
    //     return await this.dgSer.findAll();
    // }

    async danhGiaGVBM(gv: string, lop: string) {
        return await this.ht.findAll_ofGVBM(gv, lop);
    }

    async danhGiaGVCN(dg: string) {
        return await this.ht.findOne_ofGVCN(dg);
    }

    async tatCa_HocSinh() {
        const result = [];
        const hs = await this.ndSer.findAll_byRole('HS');

        for (let i = 0; i < hs.length; i++) {
            const temp = {
                _id: hs[i]._id,
                maND: hs[i].maND,
                lopHoc: hs[i].lopHoc,
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
                _id: gv[i]._id,
                maND: gv[i].maND,
                chuNhiem: gv[i].chuNhiem,
                hoTen: gv[i].hoTen,
            };
            result.push(temp);
        }
        return result;
    }
}
