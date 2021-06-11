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
import { CreateNgayHocDto } from './dto/create-ngay-hoc.dto';
import { UpdateNgayHocDto } from './dto/update-ngay-hoc.dto';
import { NgayHocService } from './ngay-hoc.service';

@Controller('ngay-hoc')
@ApiTags('ngay-hoc')
export class NgayHocController {
    constructor(private readonly service: NgayHocService) {}

    @Post()
	@ApiCreatedResponse({ description: 'Tạo thành công' })
    async create(@Body() dto: CreateNgayHocDto) {
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
    async update(@Param('id') id: string, @Body() dto: UpdateNgayHocDto) {
        return await this.service.update(id, dto);
    }

    @Delete(':id')
	@ApiOkResponse({ description: 'Xóa thành công' })
    async remove(@Param('id') id: string) {
        return await this.service.remove(id);
    }
}
