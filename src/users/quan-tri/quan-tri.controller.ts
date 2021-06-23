import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { QuanTriService } from './quan-tri.service';

@Controller('quan-tri')
export class QuanTriController {
    constructor(private service: QuanTriService);

    @Get()
    async quanTri(@Res() res: Response) {
        const sels = await this.service.forSelects();
        res.render('quan-tri', {
            ngayHoc: sels.ngayHoc,
            giaoVien: sels.giaoVien,
            hocSinh: sels.hocSinh,
            monHoc: sels.monHoc,
        });
    }
}
