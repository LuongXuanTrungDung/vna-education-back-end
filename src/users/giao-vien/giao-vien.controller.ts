import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import {
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../../auth.guard';
import { GiaoVienService } from './giao-vien.service';

@Controller('giao-vien')
@UseGuards(AuthGuard)
@ApiTags('giao-vien')
export class GiaoVienController {
    constructor(private readonly service: GiaoVienService) {}

    @Get('danh-gia')
    async layDanhGia(@Query('gv') gv: string, @Query('tuan') tuan: string) {
        return await this.service.xemHet_danhGia(gv, tuan);
    }

    @Get('danh-gia/:dg')
    async xemDanhGia(@Param('dg') dg: string) {
        return await this.service.xemMot_danhGia(dg);
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

    @Get('chu-nhiem')
    async chuNhiem() {
        return await this.service.laGVCN();
    }
}
