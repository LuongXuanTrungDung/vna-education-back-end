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
import {
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../../auth.guard';
import { MauDanhGiaDto } from './mau-danh-gia.dto';

@Controller('mau-danh-gia')
@UseGuards(AuthGuard)
@ApiTags('mau-danh-gia')
export class MauDanhGiaController {
    constructor(private readonly service: MauDanhGiaService) {}

    @Post()
    @ApiCreatedResponse({ description: 'Tạo thành công' })
    @ApiForbiddenResponse({
        description: 'Ngăn cản truy cập do chưa đăng nhập vào hệ thống',
    })
    async create(@Body() dto: MauDanhGiaDto) {
        return await this.service.create(dto);
    }

    @Get()
    @ApiOkResponse({ description: 'Trả về tất cả' })
    @ApiForbiddenResponse({
        description: 'Ngăn cản truy cập do chưa đăng nhập vào hệ thống',
    })
    async findAll() {
        return await this.service.findAll();
    }

    @Get(':id')
    @ApiParam({
        name: 'id',
        type: String,
        description: '_id của mẫu đánh giá',
    })
    @ApiOkResponse({ description: 'Trả về 1 đối tượng' })
    @ApiForbiddenResponse({
        description: 'Ngăn cản truy cập do chưa đăng nhập vào hệ thống',
    })
    async findOne(@Param('id') id: string) {
        return await this.service.findOne(id);
    }

    @Patch(':id')
    @ApiParam({
        name: 'id',
        type: String,
        description: '_id của mẫu đánh giá',
    })
    @ApiForbiddenResponse({
        description: 'Ngăn cản truy cập do chưa đăng nhập vào hệ thống',
    })
    @ApiOkResponse({ description: 'Cập nhật thành công' })
    async update(@Param('id') id: string, @Body() dto: MauDanhGiaDto) {
        return await this.service.update(id, dto);
    }

    @Delete(':id')
    @ApiParam({
        name: 'id',
        type: String,
        description: '_id của mẫu đánh giá',
    })
    @ApiOkResponse({ description: 'Xóa thành công' })
    @ApiForbiddenResponse({
        description: 'Ngăn cản truy cập do chưa đăng nhập vào hệ thống',
    })
    async remove(@Param('id') id: string) {
        return await this.service.remove(id);
    }
}
