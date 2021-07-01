import { Injectable } from '@nestjs/common';
import { DanhGiaService } from '../../models/danh-gia/danh-gia.service';
import { HSDGDto } from '../../models/danh-gia/dto/HSDG.dto';

@Injectable()
export class HocSinhService {
	constructor(private dgSer: DanhGiaService) { }

	async getOne_danhGia() {
		return await this.dgSer.findOne('60b745814bddbdc7d2df9b75');
	}

	async makeReview(id: string, dto: HSDGDto) {
		return await this.dgSer.update_fromHS(id,dto)
	}
}
