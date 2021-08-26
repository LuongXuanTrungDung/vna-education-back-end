import {
    Body,
    Controller,
    Get,
    Post,
    Query,
    Render,
    UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthGuard } from './auth.guard';
import { ChangePassDTO, SetPassDTO } from './helpers/changePass.dto';
import { DangNhapDTO } from './helpers/dangNhap.dto';
import { sendMailDTO } from './helpers/sendMail.dto';

@Controller()
@ApiTags('chung')
export class AppController {
    constructor(private service: AppService) {}

    @Get()
    @Render('index')
    index() {
        return null;
    }

    @Post('dang-nhap')
    async dangNhap(@Body() dto: DangNhapDTO) {
        return await this.service.kiemTra_dangNhap(dto.username, dto.password);
    }

    @Get('lich-hoc')
    @UseGuards(AuthGuard)
    async layLichHoc(@Query('tuan') tuan: string, @Query('lop') lop: string) {
        return await this.service.taoLichHoc(tuan, lop);
    }

    @Get('lich-day')
    @UseGuards(AuthGuard)
    async layLichDay(@Query('tuan') tuan: string, @Query('gv') gv: string) {
        return await this.service.taoLichDay(tuan, gv);
    }

    @Get('thong-tin')
    async thongTin(@Query('user') user: string) {
        if (user && user != '')
            return await this.service.thongTin_nguoiDung(user);
    }

    @Post('doi-mat-khau')
    async doiMatKhau(@Body() dto: ChangePassDTO) {
        return await this.service.doiMatKhau(dto);
    }

    @Post('dat-mat-khau')
    async datMatKhau(@Body() dto: SetPassDTO) {
        return await this.service.datMoi_matKhau(dto);
    }

    @Post('gui-mail')
    async guiEmail(@Body() toSend: sendMailDTO) {
        return await this.service.guiMail_quenMatKhau(toSend.receiver);
    }

    @Get('thong-ke')
    async thongKe() {
        return await this.service.thongKe();
    }
}
