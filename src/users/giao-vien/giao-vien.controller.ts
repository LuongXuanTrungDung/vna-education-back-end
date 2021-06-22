import { Controller, Get, Render } from '@nestjs/common';

@Controller('giao-vien')
export class GiaoVienController {
    @Get()
    @Render('giao-vien')
    async giaoVien() {
        return '';
    }
}
