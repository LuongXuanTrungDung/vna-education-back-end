import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth.guard';
import { HieuTruongService } from './hieu-truong.service';

@Controller('hieu-truong')
@UseGuards(AuthGuard)
@ApiTags('hieu-truong')
export class HieuTruongController {
    constructor(private service: HieuTruongService) {}

    // @Get('danh-gia')
    // @ApiOkResponse({ description: 'Trả về tất cả đánh giá trong CSDL' })
    // async xemDanhGia() {
    //     return await this.service.tatCa_DanhGia();
    // }

    @Get('danh-gia/bo-mon')
    async xemDanhGiaGVBM(@Query('gv') gv: string, @Query('lop') lop: string) {
        return await this.service.danhGiaGVBM(gv, lop);
    }

    // @Get('danh-gia/chu-nhiem')
    // async xemDanhGiaGVCN(@Query('gv') gv: string, @Query('nam') nam: string) {
    //     return await this.service.danhGiaGVCN(gv, nam);
    // }

    @Get('danh-gia/:id')
    async xemMotDG(@Param('id') id: string) {
        return await this.service.danhGia_chiTiet(id);
    }

    @Get('danh-sach/hoc-sinh')
    async xemDS_hocSinh() {
        return await this.service.tatCa_HocSinh();
    }

    @Get('danh-sach/giao-vien')
    async xemDS_giaoVien() {
        return await this.service.tatCa_GiaoVien();
    }
}
