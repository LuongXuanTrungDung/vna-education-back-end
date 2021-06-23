import { Injectable } from '@nestjs/common';
import { DanhGiaService } from '../../models/danh-gia/danh-gia.service';

@Injectable()
export class HocSinhService {
    constructor(private dgSer: DanhGiaService) {}

    async getOne_danhGia() {
        return await this.dgSer.findOne('60b745814bddbdc7d2df9b75');
    }
}
