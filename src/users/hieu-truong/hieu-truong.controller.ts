import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth.guard';
import { HieuTruongService } from './hieu-truong.service';

@Controller('hieu-truong')
@UseGuards(AuthGuard)
@ApiTags('hieu-truong')
export class HieuTruongController {
    constructor(private service: HieuTruongService) {}

    @Get()
    @Render('hieu-truong')
    async hieuTruong() {
        return '';
    }

    @Get('danh-gia')
    @ApiOkResponse({ description: 'Trả về tất cả đánh giá trong CSDL' })
    async xemDanhGia() {
        return await this.service.tatCa_DanhGia();
    }

    @Get('danh-sach/hoc-sinh')
    @ApiOkResponse({ description: 'Trả về tất cả người dùng là học sinh' })
    async xemDS_hocSinh() {
        return await this.service.tatCa_HocSinh();
    }

    @Get('danh-sach/giao-vien')
    @ApiOkResponse({ description: 'Trả về tất cả người dùng là giáo viên' })
    async xemDS_giaoVien() {
        return await this.service.tatCa_GiaoVien();
    }
}
