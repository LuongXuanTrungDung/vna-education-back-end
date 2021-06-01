import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ThongBaoService } from './thong-bao.service';
import { CreateThongBaoDto } from './dto/create-thong-bao.dto';
import { UpdateThongBaoDto } from './dto/update-thong-bao.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('thong-bao')
@ApiTags('thong-bao')
export class ThongBaoController {
	constructor(private readonly service: ThongBaoService) { }

	@Post()
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
	@ApiOkResponse({ description: 'Trả về 1 đối tượng' })
	async findOne(@Param('id') id: string) {
		return this.service.findOne(id);
	}

	@Patch(':id')
	@ApiOkResponse({ description: 'Cập nhật thành công' })
	async update(@Param('id') id: string, @Body() dto: UpdateThongBaoDto) {
		return await this.service.update(id, dto);
	}

	@Delete(':id')
	@ApiOkResponse({ description: 'Xóa thành công' })
	async remove(@Param('id') id: string) {
		return await this.service.remove(id);
	}
}
