import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth.guard';
import { HSDGDto } from '../../models/danh-gia/dto/HSDG.dto';
import { HocSinhService } from './hoc-sinh.service';

@Controller('hoc-sinh')
@UseGuards(AuthGuard)
@ApiTags('hoc-sinh')
export class HocSinhController {
    constructor(private service: HocSinhService) {}

    @Patch(':hs/vao-lop/:lop')
    async vaoLop(@Param('hs') hs: string, @Param('lop') lop: string) {
        return await this.service.enroll(hs, lop);
    }

    @Get(':hs/diem-so')
    async xemDiem(@Param('hs') hs: string) {
        return await this.service.seeReport(hs);
    }

    @Get('lop/:lop')
    async danhSach_hocSinh(@Param('lop') lop: string) {
        return await this.service.ofClass(lop);
    }

    @Post('danh-gia/:id')
    @ApiParam({
        name: 'id',
        type: 'string',
        description: '',
    })
    @ApiBody({
        type: HSDGDto,
        description: 'Các dữ liệu đã thay đổi khi học sinh làm đánh giá',
    })
    async danhGia(@Param('id') id: string, @Body() dto: HSDGDto) {
        return await this.service.makeReview(id, dto);
    }
}
