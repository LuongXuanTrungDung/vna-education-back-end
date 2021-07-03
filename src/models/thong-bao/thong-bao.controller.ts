import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { ThongBaoService } from './thong-bao.service';
import { CreateThongBaoDto } from './dto/create-thong-bao.dto';
import { UpdateThongBaoDto } from './dto/update-thong-bao.dto';
import {
	ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../../auth.guard';

@Controller('thong-bao')
@UseGuards(AuthGuard)
@ApiTags('thong-bao')
export class ThongBaoController {
    constructor(private readonly service: ThongBaoService) {}

    @Post()
	@ApiBody({type: CreateThongBaoDto})
    @ApiCreatedResponse({ description: 'Tạo thành công' })
    async create(@Body() dto: CreateThongBaoDto) {
        return await this.service.create(dto);
    }

    @Get()
    @ApiOkResponse({ description: 'Trả về tất cả' })
    async findAll() {
        return await this.service.findAll();
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
    }) @ApiBody({type: UpdateThongBaoDto})
    @ApiOkResponse({ description: 'Cập nhật thành công' })
    async update(@Param('id') id: string, @Body() dto: UpdateThongBaoDto) {
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
