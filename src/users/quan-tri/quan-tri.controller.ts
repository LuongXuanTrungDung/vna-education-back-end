import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthGuard } from '../../auth.guard';
import { QuanTriService } from './quan-tri.service';

@Controller('quan-tri')
@UseGuards(AuthGuard)
@ApiTags('quan-tri')
export class QuanTriController {
    constructor(private service: QuanTriService) {}

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
