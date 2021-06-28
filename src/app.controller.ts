import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Render,
	Query,
	Res,
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
	constructor(private service: AppService) { }

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
}
