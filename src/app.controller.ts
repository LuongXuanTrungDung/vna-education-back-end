import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Res,
    Session,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
@ApiTags('chung')
export class AppController {
    constructor(private service: AppService) {}

    @Get()
    async index(@Res() res: Response) {
        const tatCa = await this.service.traThongBao();
        return res.render('index', {
            tbc: tatCa.chung,
            tkb: tatCa.hocTap,
            hp: tatCa.hocPhi,
        });
    }

    @Post('dang-nhap')
    @ApiBody({
        description:
            'Dữ liệu từ form đăng nhập, bao gồm mã người dùng (username) và mật khẩu',
    })
    @ApiOkResponse({
        description: 'Có kết quả kiểm tra đăng nhập',
    })
    async dangNhap(
        @Body() dto: { username: string; password: string },
        @Session()
        session: {
            nguoiDung_id?: string;
            nguoiDung_hoTen?: string;
            nguoiDung_email?: string;
        },
    ) {
        const login = await this.service.kiemTra_dangNhap(
            dto.username,
            dto.password,
        );

        if (typeof login !== 'string') {
            session.nguoiDung_id = login.maND;
            session.nguoiDung_hoTen = login.hoTen;
            session.nguoiDung_email = login.emailND;
        }

        return login;
    }

    @Get('hien/:user')
    @ApiOkResponse({
        description: 'Hiện đánh giá dành cho người dùng',
    })
    async hienDanhGia_theoNguoiDung(@Param('user') user: string) {
        return await this.service.traDanhGia_theoNguoiDung(user);
    }
}
