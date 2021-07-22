import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import {
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../../auth.guard';
import { ImportGVDTO } from '../../models/nguoi-dung/dto/import-gv.dto';
import { GiaoVienService } from './giao-vien.service';

@Controller('giao-vien')
@UseGuards(AuthGuard)
@ApiTags('giao-vien')
export class GiaoVienController {
    constructor(private readonly service: GiaoVienService) {}

    @Post()
    async nhapGV(@Body() dto: ImportGVDTO) {
        return await this.service.importGV(dto);
    }

    @Get('theo')
    @ApiQuery({
        name: 'mon',
        type: String,
        description: '_id của môn học',
    })
    @ApiOkResponse({ description: 'Trả về các đối tượng giáo viên' })
    @ApiForbiddenResponse({
        description: 'Ngăn cản truy cập do chưa đăng nhập vào hệ thống',
    })
    async giaoVien(@Query('mon') mon: string) {
        if (mon && mon != '') return await this.service.giaoVien_theoMon(mon);
    }
}
