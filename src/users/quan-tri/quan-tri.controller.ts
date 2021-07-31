import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth.guard';
import { QuanTriService } from './quan-tri.service';

@Controller('quan-tri')
@UseGuards(AuthGuard)
@ApiTags('quan-tri')
export class QuanTriController {
    constructor(private service: QuanTriService) {}

    @Get('danh-gia')
    async tatCa_danhGia() {
        return await this.service.tatCa_danhGia();
    }

    @Get('chua-danh-gia')
    async layCDG(@Query('hs') hs: string, @Query('tuan') tuan: string) {
        return await this.service.layDG_chuaXong(hs, tuan);
    }

    @Get('lich-hoc')
    async layLichHoc(@Query('lop') lop: string, @Query('tuan') tuan: string) {
        return await this.service.traLichHoc(tuan, lop);
    }
}
