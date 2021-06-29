import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Render,
    Query,
    Res,
    UseGuards,
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
import { AuthGuard } from './auth.guard';

@Controller()
@ApiTags('chung')
export class AppController {
    constructor(private service: AppService) {}

    @Get()
    @Render('chung')
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

    @Get('selects')
    @ApiOkResponse({
        description:
            'Trả về các mảng là các cặp id-ten dùng cho select và option trong các form',
    })
    @UseGuards(AuthGuard)
    async laySelects() {
        return await this.service.layGiaTri_choSelects();
    }
}
