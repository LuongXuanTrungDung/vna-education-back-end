import { Body, Controller, Get, Patch, Res} from '@nestjs/common';
import { Response } from 'express';
import { HocSinhService } from './hoc-sinh.service';

@Controller('hoc-sinh')
export class HocSinhController {
	constructor(private service: HocSinhService) {}

    @Get()
    async hocSinh(@Res() res: Response) {
		const one = await this.service.getOne_danhGia()
        res.render('hoc-sinh',{
			dg: {
				id: one.id,
				ten: one.tenDG,
				giaoVien: one.doiTuongDG,
				ngayDG: one.ngayDG,
				monHoc: one.monHoc,
				tieuChi: one.tieuChi
			}
		})
    }

	@Post('danh-gia')
	async danhGia(@Body() dto: HSDG) {
		return dto
	}
}
