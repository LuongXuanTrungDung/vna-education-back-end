import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Render,
    Session,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiTags('chung')
export class AppController {
    constructor(private service: AppService) {}

    @Get()
    @Render('index')
    index() {
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
    async login(
        @Body() dto: { username: string; password: string },
        @Session()
        session: {
            nguoiDung_id?: string;
            nguoiDung_hoTen?: string;
            nguoiDung_email?: string;
        },
    ) {
        const login = await this.service.checkLogin(dto.username, dto.password);

        if (typeof login !== 'string') {
            session.nguoiDung_id = login.maND;
            session.nguoiDung_hoTen = login.hoTen;
            session.nguoiDung_email = login.emailND;
        }

        console.log(login);
    }

    @Get('hien/:user')
    async show(@Param('user') user: string) {
        return await this.service.traDanhGia_theoNguoiDung(user);
    }
}
