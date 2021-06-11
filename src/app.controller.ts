import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Render,
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
    @Render('main')
    async index() {
        return '';
    }

    @Get('quan-tri/:id')
    @ApiOkResponse({
        description: 'Hiện trang chủ dành cho quản trị',
    })
    async indexAdmin(@Res() res: Response, @Param('id') ma: string) {
        const news = await this.service.traThongBao();
        res.render('quan-tri/index', {
            tbc: news.chung,
            ht: news.hocTap,
            hp: news.hocPhi,
        });
    }

    @Get('giao-vien/:id')
    @ApiOkResponse({
        description: 'Hiện trang chủ dành cho giáo viên',
    })
    async indexTeacher(@Res() res: Response, @Param('id') ma: string) {
        const news = await this.service.traThongBao();
        res.render('giao-vien/index', {
            tbc: news.chung,
            ht: news.hocTap,
            hp: news.hocPhi,
        });
    }

    @Get('phu-huynh/:id')
    @ApiOkResponse({
        description: 'Hiện trang chủ dành cho phụ huynh',
    })
    async indexParent(@Res() res: Response, @Param('id') ma: string) {
        const news = await this.service.traThongBao();
        res.render('phu-huynh/index', {
            tbc: news.chung,
            ht: news.hocTap,
            hp: news.hocPhi,
        });
    }

    @Get('hoc-sinh/:id')
    @ApiOkResponse({
        description: 'Hiện trang chủ dành cho học sinh',
    })
    async indexStudent(@Res() res: Response, @Param('id') ma: string) {
        const news = await this.service.traThongBao();
        res.render('hoc-sinh/index', {
            tbc: news.chung,
            ht: news.hocTap,
            hp: news.hocPhi,
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
        @Res() res: Response,
    ) {
        const login = await this.service.kiemTra_dangNhap(
            dto.username,
            dto.password,
        );

        if (login.id && login.ma) {
		console.log(login.id);
            const role = login.ma.substring(0, 2);
            switch (role) {
                case 'QT':
                    res.redirect(`quan-tri/${login.ma}`);
                    break;
                case 'PH':
                    res.redirect(`phu-huynh/${login.ma}`);
                    break;
                case 'GV':
                    res.redirect(`giao-vien/${login.ma}`);
                    break;
                case 'HS':
                    res.redirect(`hoc-sinh/${login.ma}`);
                    break;
                default:
                    break;
            }
        }
        else return login.message
    }
}
