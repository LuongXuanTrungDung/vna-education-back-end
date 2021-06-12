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

@Controller('api')
@ApiTags('chung')
export class AppController {
    constructor(private service: AppService) {}

    @Get()
    @Render('index')
    async index() {
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
            'Hiện tất cả đánh giá, tiêu chí và mục tiêu trong ngày dành cho học sinh',
    })
    async traDanhGia_theoNguoiDung_theoNgay(
        @Param('maND') user: string,
        @Query('ngay') ngay: string,
    ) {
        return await this.service.traDanhGia_theoNguoiDung_theoNgay(user, ngay);
    }
}
