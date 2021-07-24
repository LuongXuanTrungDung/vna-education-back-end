import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { BuoiHocService } from './models/buoi-hoc/buoi-hoc.service';
import { DanhGiaService } from './models/danh-gia/danh-gia.service';
import { LopHocService } from './models/lop-hoc/lop-hoc.service';
import { MauDanhGiaService } from './models/mau-danh-gia/mau-danh-gia.service';
import { MonHocService } from './models/mon-hoc/mon-hoc.service';
import { NguoiDungService } from './models/nguoi-dung/nguoi-dung.service';
import { GiaoVienUtils } from './models/nguoi-dung/roles/giao-vien.utils';
import { HocSinhUtils } from './models/nguoi-dung/roles/hoc-sinh.utils';
import { ThongBaoService } from './models/thong-bao/thong-bao.service';
import { TuanHocService } from './models/tuan-hoc/tuan-hoc.service';

@Injectable()
export class AppService {
    constructor(
        private readonly ndSer: NguoiDungService,
        private readonly dgSer: DanhGiaService,
        private readonly tbSer: ThongBaoService,
        private readonly mhSer: MonHocService,
        private readonly lhSer: LopHocService,
        private readonly mauSer: MauDanhGiaService,
        private readonly tSer: TuanHocService,
        private readonly bhSer: BuoiHocService,

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
        const week = await this.tSer.findOne(tuan);
        const classe = await this.lhSer.findOne(lop);
        const buoi = await this.bhSer.findAll();
        const result = { ...week, lopHoc: classe.maLH, buoiHoc: [] };

        for (let i = 0; i < buoi.length; i++) {
            if (buoi[i].tuanHoc == week.soTuan) {
                const { tietHoc, ...moment } = buoi[i];
                const m = { ...moment, tietHoc: [] };

                for (let j = 0; j < tietHoc.length; j++) {
                    const { lopHoc, diemDanh, ...rest } = tietHoc[j];
                    if (lopHoc == classe.maLH) m.tietHoc.push(rest);
                }

                result.buoiHoc.push(m);
            }
        }
        return result;
    }
}
