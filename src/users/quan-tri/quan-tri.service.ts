import { Injectable } from '@nestjs/common';
import { MonHocService } from '../../models/mon-hoc/mon-hoc.service';
import { NgayHocService } from '../../models/ngay-hoc/ngay-hoc.service';
import { NguoiDungService } from '../../models/nguoi-dung/nguoi-dung.service';

@Injectable()
export class QuanTriService {
    constructor(
        private ndSer: NguoiDungService,
        private ngaySer: NgayHocService,
        private mhSer: MonHocService,
    ) {}

    async forSelects() {
        return {
            giaoVien: await this.ndSer.forSelect_giaoVien(),
            hocSinh: await this.ndSer.forSelect_hocSinh(),
            monHoc: await this.mhSer.forSelects_monHoc(),
            ngayHoc: await this.ngaySer.forSelects_ngayHoc(),
        };
    }
}
