import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
	UseGuards,
} from '@nestjs/common';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiParam,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../../auth.guard';
import { DanhGiaService } from './danh-gia.service';
import { CreateDanhGiaDto } from './dto/create-danh-gia.dto';
import { UpdateDanhGiaDto } from './dto/update-danh-gia.dto';

@Controller('danh-gia')
@UseGuards(AuthGuard)
@ApiTags('danh-gia')
export class DanhGiaController {
    constructor(private readonly service: DanhGiaService) {}

    @Post()
    @ApiBody({
        description: 'DTO chứa dữ liệu để tạo 1 đánh giá mới',
    })
    @ApiCreatedResponse({ description: 'Tạo thành công' })
    async create(@Body() dto: CreateDanhGiaDto) {
        return await this.service.create(dto);
    }

    @Get()
    @ApiOkResponse({ description: 'Trả về tất cả' })
    async findAll() {
        return await this.service.findAll();
    }

    @Get('theo')
    @ApiQuery({
        name: 'user',
        type: 'string',
        description: '_id của người đánh giá',
    })
    @ApiOkResponse({
        description: 'Trả về tất cả đánh giá theo _id của người dùng',
    })
    async findAll_byUser(@Query('user') user: string) {
        return await this.service.findAll_byUser(user);
    }

    @Get(':id')
    @ApiParam({
        name: 'id',
        type: 'string',
        description: '_id của đánh giá',
    })
    @ApiOkResponse({ description: 'Trả về 1 đối tượng' })
    async findOne(@Param('id') id: string) {
        return await this.service.findOne(id);
    }

    @Patch(':id')
    @ApiParam({
        name: 'id',
        type: 'string',
        description: '_id của đánh giá',
    })
    @ApiBody({
        description: 'DTO chứa dữ liệu để cập nhật đánh giá',
    })
    @ApiOkResponse({ description: 'Cập nhật thành công' })
    async update(@Param('id') id: string, @Body() dto: UpdateDanhGiaDto) {
        return await this.service.update(id, dto);
    }

    @Delete(':id')
    @ApiParam({
        name: 'id',
        type: 'string',
        description: '_id của đánh giá',
    })
    @ApiOkResponse({ description: 'Xóa thành công' })
    async remove(@Param('id') id: string) {
        return await this.service.remove(id);
    }
}
