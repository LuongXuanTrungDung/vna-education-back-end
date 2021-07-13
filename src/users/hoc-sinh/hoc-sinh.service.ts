import { Injectable } from '@nestjs/common';
import { DanhGiaService } from '../../models/danh-gia/danh-gia.service';
import { HSDGDto } from '../../models/danh-gia/dto/HSDG.dto';
import { LopHocService } from '../../models/lop-hoc/lop-hoc.service';

@Injectable()
export class HocSinhService {
    constructor(
        private readonly dgSer: DanhGiaService,
        private readonly lhSer: LopHocService,
    ) {}

    async vaoLop(hs: string, lop: string) {
        return await this.lhSer.addHS(hs, lop);
    }

    async makeReview(id: string, dto: HSDGDto) {
        return await this.dgSer.update_fromHS(id, dto);
    }
}
