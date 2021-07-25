import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBody,
    ApiForbiddenResponse,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../../auth.guard';
import { HSDGDto } from '../../models/danh-gia/dto/HSDG.dto';
import { HocSinhService } from './hoc-sinh.service';

@Controller('hoc-sinh')
@UseGuards(AuthGuard)
@ApiTags('hoc-sinh')
export class HocSinhController {
    constructor(private service: HocSinhService) {}

    @Patch('vao-lop/:lop')
    @ApiBody({
        type: [String],
        description: 'Các _id của học sinh',
    })
    @ApiParam({
		name: 'lop',
        type: String,
        description: '_id của lớp cần thêm học sinh',
    })
    @ApiOkResponse({ description: 'Cập nhật thành công' })
    @ApiForbiddenResponse({
        description: 'Ngăn cản truy cập do chưa đăng nhập vào hệ thống',
    })
    @ApiInternalServerErrorResponse({
        description: 'Lỗi hệ thống',
    })
    async vaoLop(@Body() hs: string[], @Param('lop') lop: string) {
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
