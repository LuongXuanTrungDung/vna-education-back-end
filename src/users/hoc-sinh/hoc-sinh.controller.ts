import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth.guard';
import { HSDGDto } from '../../models/danh-gia/dto/HSDG.dto';
import { HocSinhService } from './hoc-sinh.service';

@Controller('hoc-sinh')
@UseGuards(AuthGuard)
@ApiTags('hoc-sinh')
export class HocSinhController {
    constructor(private service: HocSinhService) {}

    @Patch('vao-lop/:lop')
    async vaoLop(@Body() hs: string[], @Param('lop') lop: string) {
        return await this.service.enroll(hs, lop);
    }

    @Get(':hs/diem-so')
    async xemDiem(@Param('hs') hs: string) {
        return await this.service.seeReport(hs);
    }

    @Get('thuoc-lop/:lop')
    async danhSach_hocSinh(@Param('lop') lop: string) {
        return await this.service.ofClass(lop);
    }

    @Get(':hs/danh-gia')
    async hetDG(@Param('hs') hs: string, @Query('tuan') tuan: string) {
        return await this.service.getReviews(hs, tuan);
    }

    @Post('danh-gia/:id')
    async danhGia(@Param('id') id: string, @Body() dto: HSDGDto) {
        return await this.service.makeReview(id, dto);
    }

    @Get('danh-gia/:id')
    async motDG(@Param('id') id: string) {
        return await this.service.getReview(id);
    }

    @Get(':hs/diem-danh')
    async hetDD(@Param('hs') hs: string) {
        return await this.service.getPresented(hs);
    }
}
