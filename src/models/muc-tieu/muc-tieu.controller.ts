import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { MucTieuService } from './muc-tieu.service';
import { CreateMucTieuDto } from './dto/create-muc-tieu.dto';
import { UpdateMucTieuDto } from './dto/update-muc-tieu.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('muc-tieu')
@ApiTags('muc-tieu')
export class MucTieuController {
    constructor(private readonly service: MucTieuService) {}

    @Post()
    @ApiCreatedResponse({ description: 'Tạo thành công' })
    async create(@Body() dto: CreateMucTieuDto) {
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
    async update(@Param('id') id: string, @Body() dto: UpdateMucTieuDto) {
        return await this.service.update(id, dto);
    }

    @Delete(':id')
    @ApiOkResponse({ description: 'Xóa thành công' })
    async remove(@Param('id') id: string) {
        return await this.service.remove(id);
    }
}
