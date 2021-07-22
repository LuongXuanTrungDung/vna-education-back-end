import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';
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
    async laySelects() {
        return await this.service.layGiaTri_choSelects();
    }

    @Get('lich-hoc')
    @UseGuards(AuthGuard)
    async layLichHoc(@Query('tuan') tuan: string, @Query('lop') lop: string) {
        return await this.service.taoLichHoc(tuan, lop);
    }
}
