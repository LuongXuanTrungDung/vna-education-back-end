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
import { MauDanhGiaService } from './mau-danh-gia.service';
import { CreateMauDanhGiaDto } from './dto/create-mau-danh-gia.dto';
import { UpdateMauDanhGiaDto } from './dto/update-mau-danh-gia.dto';
import {
    ApiCreatedResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../../auth.guard';

@Controller('mau-danh-gia')
@UseGuards(AuthGuard)
@ApiTags('mau-danh-gia')
export class MauDanhGiaController {
    constructor(private readonly service: MauDanhGiaService) {}

    @Post()
    @ApiCreatedResponse({ description: 'Tạo thành công' })
    async create(@Body() dto: CreateMauDanhGiaDto) {
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
        type: 'string',
        description: '_id của mẫu đánh giá',
    })
    @ApiOkResponse({ description: 'Trả về 1 đối tượng' })
    async findOne(@Param('id') id: string) {
        return await this.service.findOne(id);
    }

    @Patch(':id')
    @ApiParam({
        name: 'id',
        type: 'string',
        description: '_id của mẫu đánh giá',
    })
    @ApiOkResponse({ description: 'Cập nhật thành công' })
    async update(@Param('id') id: string, @Body() dto: UpdateMauDanhGiaDto) {
        return await this.service.update(id, dto);
    }

    @Delete(':id')
    @ApiParam({
        name: 'id',
        type: 'string',
        description: '_id của mẫu đánh giá',
    })
    @ApiOkResponse({ description: 'Xóa thành công' })
    async remove(@Param('id') id: string) {
        return await this.service.remove(id);
    }
}
