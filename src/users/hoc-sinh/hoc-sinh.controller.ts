import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Res,
    UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthGuard } from '../../auth.guard';
import { HSDGDto } from '../../models/danh-gia/dto/HSDG.dto';
import { HocSinhService } from './hoc-sinh.service';

@Controller('hoc-sinh')
@UseGuards(AuthGuard)
@ApiTags('hoc-sinh')
export class HocSinhController {
    constructor(private service: HocSinhService) {}

    @Get()
    async hocSinh(@Res() res: Response) {
        const one = await this.service.getOne_danhGia();
        res.render('hoc-sinh', {
            dg: {
                id: one.id,
                ten: one.tenDG,
                giaoVien: one.doiTuongDG,
                ngayDG: one.ngayDG,
                monHoc: one.monHoc,
                tieuChi: one.tieuChi,
            },
        });
    }

    @Post('danh-gia/:id')
    @ApiParam({
        name: 'id',
        type: 'string',
        description: '',
    })
    @ApiBody({
        description: 'Các dữ liệu đã thay đổi khi học sinh làm đánh giá',
    })
    async danhGia(@Param('id') id: string, @Body() dto: HSDGDto) {
        return await this.service.makeReview(id, dto);
    }
}
