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
}
