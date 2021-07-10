import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth.guard';
import { QuanTriService } from './quan-tri.service';

@Controller('quan-tri')
@UseGuards(AuthGuard)
@ApiTags('quan-tri')
export class QuanTriController {
    constructor(private service: QuanTriService) {}

    @Get('danh-gia')
    async tatCa_danhGia() {
        return await this.service.tatCa_danhGia();
    }
}
