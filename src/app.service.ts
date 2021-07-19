import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { DanhGiaService } from './models/danh-gia/danh-gia.service';
import { LopHocService } from './models/lop-hoc/lop-hoc.service';
import { MauDanhGiaService } from './models/mau-danh-gia/mau-danh-gia.service';
import { MonHocService } from './models/mon-hoc/mon-hoc.service';
import { NguoiDungService } from './models/nguoi-dung/nguoi-dung.service';
import { ThongBaoService } from './models/thong-bao/thong-bao.service';

@Injectable()
export class AppService {
    constructor(
        private readonly ndSer: NguoiDungService,
        private readonly dgSer: DanhGiaService,
        private readonly tbSer: ThongBaoService,
        private readonly mhSer: MonHocService,
        private readonly lhSer: LopHocService,
        private readonly mauSer: MauDanhGiaService,
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
            hocSinh: await this.ndSer.forSelect_hocSinh(),
            giaoVien: await this.ndSer.forSelect_giaoVien(),
            mauDG: await this.mauSer.forSelect(),
            monHoc: await this.mhSer.forSelect(),
            lopHoc: await this.lhSer.forSelect(),
        };
    }
}
