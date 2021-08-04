import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Query,
} from '@nestjs/common';
import { ThongBaoService } from './thong-bao.service';
import {
    ApiCreatedResponse,
    ApiOkResponse,
    ApiParam,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../../auth.guard';
import { ThongBaoDto } from './thong-bao.dto';

@Controller('thong-bao')
@UseGuards(AuthGuard)
@ApiTags('thong-bao')
export class ThongBaoController {
    constructor(private readonly service: ThongBaoService) {}

    @Post()
    @ApiCreatedResponse({ description: 'Tạo thành công' })
    async create(@Body() dto: ThongBaoDto) {
        return await this.service.create(dto);
    }

    @Get()
    @ApiOkResponse({ description: 'Trả về tất cả' })
    async findAll() {
        return await this.service.findAll();
    }

    @Get('theo')
    @ApiQuery({
        name: 'muc',
        type: String,
        description: 'Danh mục cần tìm',
    })
    @ApiOkResponse({ description: 'Trả về tất cả, có chọn lọc' })
    async findBy(@Query('muc') muc: string) {
        if (muc && muc != '') {
            switch (muc) {
                case 'hoat-dong':
                    return await this.service.getAll_byCatalog('Hoạt động');
                    break;
                case 'hoc-tap':
                    return await this.service.getAll_byCatalog('Học tập');
                    break;
                case 'hoc-phi':
                    return await this.service.getAll_byCatalog('Học phí');
                    break;
                default:
                    return await this.service.getAll_byCatalog('Khác');
                    break;
            }
        }
    }

    @Get(':id')
    @ApiParam({
        name: 'id',
        type: String,
        description: '_id của thông báo',
    })
    @ApiOkResponse({ description: 'Trả về 1 đối tượng' })
    async findOne(@Param('id') id: string) {
        return await this.service.findOne(id);
    }

    @Patch(':id')
    @ApiParam({
        name: 'id',
        type: String,
        description: '_id của thông báo',
    })
    @ApiOkResponse({ description: 'Cập nhật thành công' })
    async update(@Param('id') id: string, @Body() dto: ThongBaoDto) {
        return await this.service.update(id, dto);
    }

    @Delete(':id')
    @ApiParam({
        name: 'id',
        type: String,
        description: '_id của thông báo',
    })
    @ApiOkResponse({ description: 'Xóa thành công' })
    async remove(@Param('id') id: string) {
        return await this.service.remove(id);
    }
}
