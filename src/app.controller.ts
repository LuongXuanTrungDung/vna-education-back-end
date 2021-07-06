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
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiParam,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { AppService } from './app.service';
import { AuthGuard } from './auth.guard';
import { DangNhapDTO, KetQua_DangNhap } from './helpers/dangNhap.dto';

@Controller()
@ApiTags('chung')
export class AppController {
    constructor(private service: AppService) {}

    @Post('dang-nhap')
    @ApiBody({
        type: DangNhapDTO,
        description:
            'Dữ liệu từ form đăng nhập, bao gồm mã người dùng (username) và mật khẩu',
    })
    @ApiCreatedResponse({
        type: KetQua_DangNhap,
        description: 'Có kết quả kiểm tra đăng nhập',
    })
    async dangNhap(@Body() dto: DangNhapDTO) {
        return await this.service.kiemTra_dangNhap(dto.username, dto.password);
    }

    @Get('selects')
    @UseGuards(AuthGuard)
    @ApiOkResponse({
        description:
            'Trả về các mảng là các cặp id-ten dùng cho select và option trong các form',
    })
    @ApiForbiddenResponse({
        description: 'Ngăn cản truy cập do chưa đăng nhập vào hệ thống',
    })
    @UseGuards(AuthGuard)
    async laySelects() {
        return await this.service.layGiaTri_choSelects();
    }
}
