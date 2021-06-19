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

    @Get('bang-tin')
    @ApiOkResponse({
        description: 'Lấy được các thông báo từ CSDL',
    })
    async traThongBao() {
        return await this.service.traThongBao();
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

    @Get('danh-gia')
    @ApiQuery({
        type: 'string',
        name: 'user',
        description: 'ID của người dùng',
    })
    @ApiOkResponse({
        description: 'Trả về tất cả đánh giá dựa theo id của người dùng',
    })
    async traDanhGia_theoID(@Query('user') id: string) {
        return await this.service.traDanhGia_theoID(id);
    }

	@Get('danh-gia')
	@ApiQuery({
        type: 'string',
        name: 'id',
        description: 'ID của đánh giá',
    })
    @ApiOkResponse({
        description: 'Trả về chi đánh giá dựa theo id của nó, ngoại trừ nguoiDG và doiTuongDG',
    })
    async traDanhGia_chiTiet(@Query('id') id: string) {
        return await this.service.chiTietDG(id)
    }
}
