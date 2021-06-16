import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Render,
    Query,
    Res,
    Session,
} from '@nestjs/common';
import {
    ApiBody,
    ApiOkResponse,
    ApiParam,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
@ApiTags('chung')
export class AppController {
    constructor(private service: AppService) {}

    @Get()
    @Render('chung')
    async index() {
        return '';
    }

    @Get('hieu-truong')
    @Render('hieu-truong')
    async hieuTruong() {
        return '';
    }

    @Get('quan-tri')
    @Render('quan-tri')
    async quanTri() {
        return '';
    }

    @Get('hoc-sinh')
    @Render('hoc-sinh')
    async hocSinh() {
        return '';
    }

    @Get('giao-vien')
    @Render('giao-vien')
    async giaoVien() {
        return '';
    }

    @Get('phu-huynh')
    @Render('phu-huynh')
    async phuHuynh() {
        return '';
    }

    @Get('api/thong-bao/:loai')
    @ApiParam({
        type: 'string',
        name: 'loai',
        description: 'Loại thông báo',
    })
    @ApiOkResponse({
        description: 'Lấy được các thông báo từ CSDL',
    })
    async traThongBao(@Param('loai') loai: string) {
        return await this.service.traThongBao(loai);
    }

    @Post('dang-nhap')
    @ApiBody({
        description:
            'Dữ liệu từ form đăng nhập, bao gồm mã người dùng (username) và mật khẩu',
    })
    @ApiOkResponse({
        description: 'Có kết quả kiểm tra đăng nhập',
    })
    async dangNhap(@Body() dto: { username: string; password: string }) {
        return await this.service.kiemTra_dangNhap(dto.username, dto.password);
    }

    @Get('danh-gia/:maND')
    @ApiParam({
        type: 'string',
        name: 'maND',
        description: 'Slug, là mã người dùng',
    })
    @ApiQuery({
        type: 'string',
        name: 'ngay',
        description: 'Slug, là ngày-tháng-năm có đánh giá',
    })
    @ApiOkResponse({
        description:
            'Trả về tất cả đánh giá, tiêu chí và mục tiêu trong ngày dành cho học sinh',
    })
    async traDanhGia_theoNguoiDung_theoNgay(
        @Param('maND') user: string,
        @Query('ngay') ngay: string,
    ) {
        return await this.service.traDanhGia_theoNguoiDung_theoNgay(user, ngay);
    }

    @Get('danh-sach/mon-hoc')
    @ApiOkResponse({
        description: 'Trả về tất cả môn học và giáo viên dạy môn đó',
    })
    async traMonHoc_vaGiaoVien() {
        return await this.service.traMonHoc_vaGiaoVien();
    }

    @Get('danh-sach/lop-hoc')
    @ApiOkResponse({
        description: 'Trả về tất cả lớp học, học sinh và GVCN của lớp đó',
    })
    async traLopHoc_HSvaGVCN() {
        return await this.service.traLopHoc_HSvaGV();
    }

    @Get('bang-diem')
    @ApiQuery({
        type: 'string',
        name: 'hocSinh',
        description: 'Slug, là mã người dùng',
    })
    @ApiOkResponse({
        description: 'Trả về tất cả bảng điểm của học sinh tương ứng',
    })
    async traBangDiem_theoHS(@Query('hocSinh') user: string) {
        return await this.service.traBangDiem_theoHS(user);
    }
}
