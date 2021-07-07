import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { BangDiemService } from './models/bang-diem/bang-diem.service';
import { DanhGiaService } from './models/danh-gia/danh-gia.service';
import { LopHocService } from './models/lop-hoc/lop-hoc.service';
import { MauDanhGiaService } from './models/mau-danh-gia/mau-danh-gia.service';
import { MonHocService } from './models/mon-hoc/mon-hoc.service';
import { NgayHocService } from './models/ngay-hoc/ngay-hoc.service';
import { NguoiDungService } from './models/nguoi-dung/nguoi-dung.service';
import { ThongBaoService } from './models/thong-bao/thong-bao.service';

@Injectable()
export class AppService {
    constructor(
        private readonly ndSer: NguoiDungService,
        private readonly dgSer: DanhGiaService,
        private readonly tbSer: ThongBaoService,
        private readonly ngaySer: NgayHocService,
        private readonly mhSer: MonHocService,
        private readonly lhSer: LopHocService,
        private readonly bdSer: BangDiemService,
        private readonly mauSer: MauDanhGiaService,
    ) {}

    async traMonHoc_vaGiaoVien() {
        const result = [];
        const subjects = await this.mhSer.findAll();

        for (let i = 0; i < subjects.length; i++) {
            const s = await subjects[i]
                .populate({
                    path: 'giaoVien',
                    model: 'nguoi_dung',
                })
                .execPopulate();
            result.push(s);
        }
        return result;
    }

    async traLopHoc_HSvaGV() {
        const result = [];
        const classes = await this.lhSer.findAll();

        for (let i = 0; i < classes.length; i++) {
            const c = await classes[i]
                .populate([
                    {
                        path: 'hocSinh',
                        model: 'nguoi_dung',
                    },
                    {
                        path: 'GVCN',
                        model: 'nguoi_dung',
                    },
                ])
                .execPopulate();
            result.push(c);
        }
        return result;
    }

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
            hocSinh: await this.ndSer.forSelect_hocSinh(),
            giaoVien: await this.ndSer.forSelect_giaoVien(),
            mauDG: await this.mauSer.forSelect(),
            monHoc: await this.mhSer.forSelect(),
        };
    }

    async traTietHoc_trongNgay(ngay: string) {
        return await (await this.ngaySer.findOne(ngay))
            .populate('tietHoc')
            .execPopulate();
    }
}
