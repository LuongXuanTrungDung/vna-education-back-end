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
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth.guard';
import { DiemDanhDto } from './diem-danh.dto';
import { DiemDanhService } from './diem-danh.service';

@Controller('diem-danh')
@UseGuards(AuthGuard)
@ApiTags('diem-danh')
export class DiemDanhController {
    constructor(private readonly service: DiemDanhService) {}

    @Post()
    @ApiCreatedResponse({ description: 'Tạo thành công' })
    async create(@Body() dto: DiemDanhDto) {
        return await this.service.create(dto);
    }

    @Get()
    @ApiOkResponse({ description: 'Trả về tất cả' })
    async findAll() {
        return await this.service.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ description: 'Trả về 1 đối tượng' })
    async findOne(@Param('id') id: string) {
        return await this.service.findOne(id);
    }

    @Patch(':id')
    @ApiOkResponse({ description: 'Cập nhật thành công' })
    async update(@Param('id') id: string, @Body() dto: DiemDanhDto) {
        return await this.service.update(id, dto);
    }

    @Delete(':id')
    @ApiOkResponse({ description: 'Xóa thành công' })
    async remove(@Param('id') id: string) {
        return await this.service.remove(id);
    }
}
