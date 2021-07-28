import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { removeDuplicates } from './helpers/utilities';
import { BuoiHocService } from './models/buoi-hoc/buoi-hoc.service';
import { LopHocService } from './models/lop-hoc/lop-hoc.service';
import { MauDanhGiaService } from './models/mau-danh-gia/mau-danh-gia.service';
import { MonHocService } from './models/mon-hoc/mon-hoc.service';
import { NguoiDungService } from './models/nguoi-dung/nguoi-dung.service';
import { GiaoVienUtils } from './models/nguoi-dung/roles/giao-vien.utils';
import { HocSinhUtils } from './models/nguoi-dung/roles/hoc-sinh.utils';
import { TietHocService } from './models/tiet-hoc/tiet-hoc.service';
import { TuanHocService } from './models/tuan-hoc/tuan-hoc.service';

@Injectable()
export class AppService {
    constructor(
        private readonly ndSer: NguoiDungService,
        private readonly mhSer: MonHocService,
        private readonly lhSer: LopHocService,
        private readonly mauSer: MauDanhGiaService,
        private readonly tuanSer: TuanHocService,
        private readonly bhSer: BuoiHocService,
        private readonly thSer: TietHocService,

        private readonly hsU: HocSinhUtils,
        private readonly gvU: GiaoVienUtils,
    ) {}

    async kiemTra_dangNhap(username: string, password: string) {
        const user = await this.ndSer.findOne_byMaND(username);
        const pass = await this.ndSer.onlyPassword(username);
        if (user && pass) {
            if (await compare(password, pass))
                return {
                    id: user.id,
                    resOK: true,
                };
            else
                return {
                    id: null,
                    resOK: false,
                };
        } else {
            return {
                id: null,
                resOK: false,
            };
        }
    }

    async layGiaTri_choSelects() {
        return {
            hocSinh: await this.hsU.forSelect_hocSinh(),
            giaoVien: await this.gvU.forSelect_giaoVien(),
            mauDG: await this.mauSer.forSelect(),
            monHoc: await this.mhSer.forSelect(),
            lopHoc: await this.lhSer.forSelect(),
        };
    }

    async taoLichHoc(tuan: string, lop: string) {
        const week = await this.tuanSer.findOne(tuan);
        const classe = await this.lhSer.findOne(lop);
        const tiet = await this.thSer.findAll();
        const t1 = [];
        const result = { ...week, lopHoc: classe.maLH, buoiHoc: [] };

        for (let i = 0; i < tiet.length; i++) {
            if (tiet[i].buoiHoc && tiet[i].buoiHoc.tuanHoc == week.soTuan) {
                const { tuanHoc, ...b } = tiet[i].buoiHoc;
                t1.push({ ...b, tietHoc: [] });
            }
        }
        const t2 = removeDuplicates(t1, 'id');

        for (let j = 0; j < t2.length; j++) {
            for (let k = 0; k < tiet.length; k++) {
                if (tiet[k].lopHoc.maLH && tiet[k].lopHoc.maLH == classe.maLH) {
                    const { lopHoc, diemDanh, buoiHoc, ...t } = tiet[k];
                    t2[j].tietHoc.push(t);
                }
            }
            t2[j].tietHoc = removeDuplicates(t2[j].tietHoc, 'thuTiet');
        }

        result.buoiHoc = t2;
        return result;
    }
}
