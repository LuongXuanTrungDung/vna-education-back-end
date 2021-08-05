import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthGuard } from './auth.guard';
import { DangNhapDTO } from './helpers/dangNhap.dto';

@Controller()
@ApiTags('chung')
export class AppController {
    constructor(private service: AppService) {}

    @Post('dang-nhap')
    async dangNhap(@Body() dto: DangNhapDTO) {
        return await this.service.kiemTra_dangNhap(dto.username, dto.password);
    }

    @Get('lich-hoc')
    @UseGuards(AuthGuard)
    async layLichHoc(@Query('tuan') tuan: string, @Query('lop') lop: string) {
        return await this.service.taoLichHoc(tuan, lop);
    }

    @Get('lich-hoc-v2')
    @UseGuards(AuthGuard)
    async layLichHoc_v2(
        @Query('tuan') tuan: string,
        @Query('lop') lop: string,
    ) {
        return await this.service.taoLichHoc_v2(tuan, lop);
    }

    @Get('thong-tin')
    async thongTin(@Query('user') user: string) {
        if (user && user != '')
            return await this.service.thongTin_nguoiDung(user);
    }
}
