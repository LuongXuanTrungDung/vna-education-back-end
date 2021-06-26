import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth.guard';

@Controller('giao-vien')
@UseGuards(AuthGuard)
@ApiTags('giao-vien')
export class GiaoVienController {
    @Get()
    @Render('giao-vien')
    async giaoVien() {
        return '';
    }
}
