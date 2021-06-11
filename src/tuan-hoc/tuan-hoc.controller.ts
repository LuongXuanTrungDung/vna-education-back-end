import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { TuanHocService } from './tuan-hoc.service';
import { CreateTuanHocDto } from './dto/create-tuan-hoc.dto';
import { UpdateTuanHocDto } from './dto/update-tuan-hoc.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('tuan-hoc')
@ApiTags('tuan-hoc')
export class TuanHocController {
    constructor(private readonly service: TuanHocService) {}

    @Post()
	@ApiCreatedResponse({ description: 'Tạo thành công' })
    async create(@Body() dto: CreateTuanHocDto) {
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
    async update(@Param('id') id: string, @Body() dto: UpdateTuanHocDto) {
        return await this.service.update(id, dto);
    }

    @Delete(':id')
	@ApiOkResponse({ description: 'Xóa thành công' })
    async remove(@Param('id') id: string) {
        return await this.service.remove(id);
    }
}
