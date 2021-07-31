import { Injectable } from '@nestjs/common';
import { DanhGiaService } from '../../models/danh-gia/danh-gia.service';

@Injectable()
export class QuanTriService {
    constructor(private readonly dgSer: DanhGiaService) {}

    async tatCa_danhGia() {
        return await this.dgSer.findAll();
    }
}
