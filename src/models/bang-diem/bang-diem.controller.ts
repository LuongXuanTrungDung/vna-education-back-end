import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BangDiemService } from './bang-diem.service';
import { CreateBangDiemDto } from './dto/create-bang-diem.dto';
import { UpdateBangDiemDto } from './dto/update-bang-diem.dto';

@Controller('bang-diem')
@ApiTags('bang-diem')
export class BangDiemController {
    constructor(private readonly service: BangDiemService) {}

    @Post()
    @ApiCreatedResponse({ description: 'Tạo thành công' })
    async create(@Body() dto: CreateBangDiemDto) {
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
    async update(@Param('id') id: string, @Body() dto: UpdateBangDiemDto) {
        return await this.service.update(id, dto);
    }

    @Delete(':id')
    @ApiOkResponse({ description: 'Xóa thành công' })
    async remove(@Param('id') id: string) {
        return await this.service.remove(id);
    }
}
