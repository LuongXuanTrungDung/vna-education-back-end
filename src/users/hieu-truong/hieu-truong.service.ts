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
        return await this.ndSer.findHS();
    }

    async tatCa_GiaoVien() {
        return await this.ndSer.findGV();
    }
}
