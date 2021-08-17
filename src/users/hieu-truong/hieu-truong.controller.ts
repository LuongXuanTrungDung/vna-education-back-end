import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth.guard';
import { HieuTruongService } from './hieu-truong.service';

@Controller('hieu-truong')
@UseGuards(AuthGuard)
@ApiTags('hieu-truong')
export class HieuTruongController {
    constructor(private service: HieuTruongService) {}

    @Get('danh-gia/theo')
    async xemDanhGia(@Query('tuan') tuan: string, @Query('lop') lop: string) {
        return await this.service.tatCa_DanhGia(tuan, lop);
    }

    @Get('danh-gia/:dg')
    async xemMot_danhGia(@Param('dg') dg: string) {
        return await this.service.motDanhGia(dg);
    }

    @Get('danh-gia/bo-mon')
    async xemDanhGiaGVBM(@Query('gv') gv: string, @Query('lop') lop: string) {
        return await this.service.danhGiaGVBM(gv, lop);
    }

    @Get('danh-gia/chu-nhiem/:dg')
    async xemDanhGiaGVCN(@Param('dg') dg: string) {
        return await this.service.danhGiaGVCN(dg);
    }

    @Get('danh-sach/hoc-sinh')
    async xemDS_hocSinh() {
        return await this.service.tatCa_HocSinh();
    }

    @Get('danh-sach/giao-vien')
    async xemDS_giaoVien() {
        return await this.service.tatCa_GiaoVien();
    }

    @Patch('duyet-danh-gia/:dg')
    async duyetDG(@Param('dg') dg: string, @Body() daDuyet?: boolean) {
        return await this.service.duyetDG(dg, daDuyet);
    }
}
