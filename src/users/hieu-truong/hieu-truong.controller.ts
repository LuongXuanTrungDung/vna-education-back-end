import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { HieuTruongService } from './hieu-truong.service';

@Controller('api/hieu-truong')
@ApiTags('hieu-truong')
export class HieuTruongController {
    constructor(private service: HieuTruongService) {}

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
